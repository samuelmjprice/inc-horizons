const state = {
  data: null,
  activeDay: "",
  activeCallSheetDay: "",
  activeDepartment: "All",
  activeContactCategory: "All",
  activeDocumentCategory: "All",
  activeSwagSchedule: "",
  activeContentDay: "",
  filters: { query: "", status: "", day: "", owner: "", location: "", department: "" },
  taskFilters: { department: "", owner: "", day: "", status: "", location: "" },
  travelFilters: { person: "", arrivalDay: "", departureDay: "", team: "", status: "" },
  podcastFilters: { day: "", guest: "", status: "", location: "" },
  contentFilters: { owner: "", day: "", department: "", location: "", priority: "", status: "" },
  captureSuggestions: [],
  updates: {}
};

const APP_VERSION = "20260528-round2";
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const text = (value, fallback = "") => value === null || value === undefined || String(value).trim() === "" ? fallback : String(value).trim();
const slug = (value) => text(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const escapeHtml = (value) => text(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[char]));
const includes = (item, query) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase());
const unique = (values) => [...new Set(values.map((value) => text(value)).filter(Boolean))].sort((a, b) => a.localeCompare(b));
const getUpdates = (id) => state.updates[id] || [];
const latestUpdate = (id) => getUpdates(id).at(-1);
const normalizeLabel = (value = "") => {
  const raw = text(value);
  const normalized = raw.toLowerCase();
  if (!raw) return "";
  if (normalized.includes("yellow") || normalized === "needs confirmation if timings remain unclear") return "Needs Confirmation";
  if (normalized.includes("red") || normalized.includes("problem")) return "Problem";
  if (normalized.includes("working source") || normalized === "reference" || normalized === "in progress") return "On Track";
  if (normalized.includes("at risk")) return "Watch";
  return raw;
};
const normalizePriority = (value = "") => {
  const raw = text(value);
  const normalized = raw.toLowerCase();
  if (!raw) return "";
  if (normalized.includes("red")) return "Critical";
  if (normalized.includes("yellow")) return "Watch";
  return raw;
};

const updateStore = {
  key: "horizons-card-updates-v1",
  load() {
    try { return JSON.parse(localStorage.getItem(this.key) || "{}"); }
    catch { return {}; }
  },
  save(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
};

const suggestionStore = {
  key: "horizons-capture-suggestions-v1",
  load() {
    try { return JSON.parse(localStorage.getItem(this.key) || "[]"); }
    catch { return []; }
  },
  save(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
};

const statusClass = (value = "") => {
  const normalized = slug(normalizeLabel(value));
  if (normalized.includes("problem") || normalized.includes("urgent") || normalized.includes("risk") || normalized.includes("critical")) return "tag-critical";
  if (normalized.includes("decision") || normalized.includes("still-to-be-resolved")) return "tag-decision-needed";
  if (normalized.includes("confirmation") || normalized.includes("confirm") || normalized.includes("watch")) return "tag-needs-confirmation";
  if (normalized.includes("resolved") || normalized.includes("track") || normalized.includes("complete") || normalized.includes("confirmed")) return "tag-on-track";
  if (normalized.includes("sent") || normalized.includes("waiting") || normalized.includes("file-needed")) return "tag-waiting";
  return "";
};

const tag = (value, extraClass = "") => value ? `<span class="tag ${statusClass(value)} ${extraClass}">${escapeHtml(normalizeLabel(value))}</span>` : "";
const departmentTag = (value) => value ? tag(value, `department-tag department-${slug(value)}`) : "";
const meta = (label, value) => value ? `<div><span>${escapeHtml(label)}:</span> ${escapeHtml(value)}</div>` : "";
const list = (items = []) => items.filter(Boolean).length ? `<ul>${items.filter(Boolean).slice(0, 8).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : "";
const empty = (message = "No matching items.") => `<div class="empty-state">${escapeHtml(message)}</div>`;
const setHtml = (selector, html) => { const element = $(selector); if (element) element.innerHTML = html; };
const detailRows = (rows = []) => rows.filter(([, value]) => text(value)).map(([label, value]) => meta(label, value)).join("");
const detailsBlock = (summary, rows = [], extra = "") => {
  const content = `${detailRows(rows)}${extra}`;
  if (!content.trim()) return "";
  return `<details class="details"><summary><span>${escapeHtml(summary)}</span></summary><div class="details-content">${content}</div></details>`;
};
const firstMeaningful = (...values) => values.map((value) => text(value)).find(Boolean) || "";

const buildOptions = (select, values, label) => {
  if (!select) return;
  select.innerHTML = `<option value="">All ${label}</option>${values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
};

const options = () => state.data?.meta?.statusOptions || ["Still To Be Resolved", "Resolved", "Problem", "Needs Confirmation", "Waiting", "On Track"];

const topicOptions = (topics = []) => topics.length ? `
  <label><span>Update topic</span><select name="topic">
    ${topics.map((topic) => `<option>${escapeHtml(topic)}</option>`).join("")}
  </select></label>` : "";

const updateModule = (id, topics = []) => {
  if (!id) return "";
  const updates = getUpdates(id);
  const latest = updates.at(-1);
  const topicLabel = latest?.topic ? ` · ${latest.topic}` : "";
  const summary = latest ? `${updates.length} update${updates.length === 1 ? "" : "s"} · Latest: ${latest.status}${topicLabel}` : "Add update";
  return `
    <details class="updates-module" data-update-module="${escapeHtml(id)}">
      <summary><span>${escapeHtml(summary)}</span>${latest ? tag(latest.status) : ""}</summary>
      <div class="updates-list">
        ${updates.length ? updates.map((item) => `
          <article class="update-item">
            <div class="update-meta">
              <strong>${escapeHtml(item.name)}</strong>
              <time>${escapeHtml(item.timestamp)}</time>
              ${item.topic ? `<span class="tag">${escapeHtml(item.topic)}</span>` : ""}
              ${tag(item.status)}
            </div>
            <p>${escapeHtml(item.comment)}</p>
          </article>
        `).join("") : `<p class="summary-hint">Updates are currently saved on this device/browser only.</p>`}
      </div>
      <form class="update-form" data-update-form="${escapeHtml(id)}">
        <label><span>Name</span><input required name="name" placeholder="Your name"></label>
        ${topicOptions(topics)}
        <label><span>Status</span><select name="status">${options().map((status) => `<option>${escapeHtml(status)}</option>`).join("")}</select></label>
        <label><span>Comment/update</span><textarea required name="comment" placeholder="Add a concise update"></textarea></label>
        <button class="button button-secondary" type="submit">Save update</button>
      </form>
    </details>
  `;
};

const card = ({ title, status, department, body = "", metadata = "", footer = "", className = "", updateId = "", updateTopics = [] }) => {
  const latest = latestUpdate(updateId);
  return `
    <article class="card ${className}">
      <div class="card-header">
        <h3 class="card-title">${escapeHtml(title)}</h3>
        <div class="tag-stack">${departmentTag(department)}${tag(latest?.status || status)}</div>
      </div>
      ${latest ? `<p><strong>Latest update:</strong> ${escapeHtml(latest.comment)}</p>` : ""}
      ${body}
      ${metadata ? `<div class="meta-list">${metadata}</div>` : ""}
      ${footer}
      ${updateModule(updateId, updateTopics)}
    </article>
  `;
};

const passesGlobal = (item, fields = {}) => {
  const { query, status, day, owner, location, department } = state.filters;
  if (query && !includes(item, query) && !includes(getUpdates(fields.updateId || item.updateId || item.id), query)) return false;
  if (status && !text(fields.status || item.status).toLowerCase().includes(status.toLowerCase())) return false;
  if (day && !text(fields.day || item.day || item.date || item.dayLabel).toLowerCase().includes(day.toLowerCase())) return false;
  if (owner && !text(fields.owner || item.owner || item.person || item.internalOwner || item.lead).toLowerCase().includes(owner.toLowerCase())) return false;
  if (location && !text(fields.location || item.location || item.locationName).toLowerCase().includes(location.toLowerCase())) return false;
  if (department && !text(fields.department || item.department).toLowerCase().includes(department.toLowerCase())) return false;
  return true;
};

const passesLocal = (item, filters, fieldMap) => Object.entries(filters).every(([key, value]) => {
  if (!value) return true;
  const field = fieldMap[key] || key;
  return text(typeof field === "function" ? field(item) : item[field]).toLowerCase().includes(value.toLowerCase());
});

async function init() {
  const response = await fetch(`content.json?v=${APP_VERSION}`);
  state.data = await response.json();
  state.updates = updateStore.load();
  state.captureSuggestions = suggestionStore.load();
  state.activeDay = state.data.today.date || state.data.dailyRunSheets?.[0]?.day || "";
  state.activeCallSheetDay = state.activeDay;
  state.activeContentDay = state.activeDay;
  state.activeSwagSchedule = state.data.swagQueensSchedule?.[0]?.day || "";
  renderEvent();
  renderFilters();
  renderAll();
  bindEvents();
  startCountdown();
  startNowNext();
  setupSectionNavigation();
}

function renderEvent() {
  const { event, quickActions } = state.data;
  $("[data-event-title]").textContent = event.name;
  $("[data-event-subtitle]").textContent = event.subtitle;
  $("[data-event-description]").textContent = event.description;
  $("[data-event-location]").textContent = event.location;
  $("[data-event-dates]").textContent = event.dates;
  $("[data-event-updated]").textContent = event.lastUpdated;
  $("[data-footer-updated]").textContent = event.lastUpdated;
  if (event.updatedBy) {
    $("[data-event-updated]").setAttribute("title", `Updated by ${event.updatedBy}`);
    $("[data-footer-updated]").setAttribute("title", `Updated by ${event.updatedBy}`);
  }
  $$("[data-event-logo]").forEach((img) => img.src = event.logo);
  setHtml("[data-quick-actions]", quickActions.map((action, index) => `<a class="button ${index === 0 ? "button-primary" : "button-secondary"}" href="${action.target}">${escapeHtml(action.label)}</a>`).join(""));
  const startCards = [
    ["What matters now...", state.data.today?.focus || "Current event-day priorities", "#today"],
    ["Top red flag", state.data.redFlags?.[0]?.issue || "No critical red flag listed", "#red-flags"],
    ["Next schedule moment", state.data.schedule?.find((item) => (item.dayLabel || item.date) === state.activeDay)?.title || "Open the run sheet", "#schedule"],
    ["Key decision", state.data.decisions?.[0]?.decisionNeeded || "No open decision listed", "#decisions"],
    ["Quick contacts", state.data.contacts?.filter((c) => c.category === "Leadership").slice(0, 3).map((c) => c.name).join(", ") || "Open team contacts", "#contacts"],
    ["Documents", "Menus, maps, room layouts, runbooks, and brand files", "#documents"]
  ];
  setHtml("[data-start-grid]", startCards.map(([title, detail, href]) => `<a class="start-card" href="${href}"><strong>${title}</strong><span>${detail}</span></a>`).join(""));
}

function renderFilters() {
  const d = state.data;
  const statusValues = unique([...d.schedule, ...d.tasks, ...d.suppliers, ...d.contentCapture, ...d.decisions, ...(d.travel || [])].map((x) => x.status));
  const dayValues = unique([...d.dailyRunSheets.map((x) => x.day), ...d.schedule.map((x) => x.dayLabel || x.date), ...d.tasks.map((x) => x.day), ...d.suppliers.map((x) => x.day), ...d.contentCapture.map((x) => x.day), ...(d.travel || []).map((x) => x.arrivalDate || x.departureDate)]);
  const ownerValues = unique([...d.schedule.map((x) => x.owner), ...d.tasks.map((x) => x.person), ...d.suppliers.map((x) => x.internalOwner), ...d.contentCapture.map((x) => x.lead), ...d.contacts.map((x) => x.name), ...(d.travel || []).map((x) => x.person)]).slice(0, 160);
  const locationValues = unique([...d.schedule.map((x) => x.location), ...d.tasks.map((x) => x.location), ...d.suppliers.map((x) => x.location), ...d.locations.map((x) => x.locationName), ...d.contentCapture.map((x) => x.location), ...(d.travel || []).map((x) => x.arrivalAirport), ...(d.travel || []).map((x) => x.departureAirport)]);
  const departmentValues = unique(d.meta.departments || [...d.schedule, ...d.tasks, ...d.suppliers, ...d.contentCapture].map((x) => x.department));
  buildOptions($('[data-filter="status"]'), statusValues, "statuses");
  buildOptions($('[data-filter="day"]'), dayValues, "days");
  buildOptions($('[data-filter="owner"]'), ownerValues, "owners");
  buildOptions($('[data-filter="location"]'), locationValues, "locations");
  buildOptions($('[data-filter="department"]'), departmentValues, "departments");
  buildOptions($('[data-task-filter="department"]'), departmentValues, "departments");
  buildOptions($('[data-task-filter="owner"]'), unique(d.tasks.map((x) => x.person)), "names");
  buildOptions($('[data-task-filter="day"]'), dayValues, "days");
  buildOptions($('[data-task-filter="status"]'), statusValues, "statuses");
  buildOptions($('[data-task-filter="location"]'), locationValues, "locations");
  buildOptions($('[data-travel-filter="person"]'), unique((d.travel || []).map((x) => x.person)), "people");
  buildOptions($('[data-travel-filter="arrivalDay"]'), unique((d.travel || []).map((x) => x.arrivalDate)), "arrival days");
  buildOptions($('[data-travel-filter="departureDay"]'), unique((d.travel || []).map((x) => x.departureDate)), "departure days");
  buildOptions($('[data-travel-filter="team"]'), unique((d.travel || []).map((x) => x.team)), "teams");
  buildOptions($('[data-travel-filter="status"]'), unique((d.travel || []).map((x) => x.status)), "statuses");
  buildOptions($('[data-podcast-filter="day"]'), unique(d.podcast.map((x) => x.day || x.date)), "days");
  buildOptions($('[data-podcast-filter="guest"]'), unique(d.podcast.map((x) => x.guest || x.guestSubject)), "guests");
  buildOptions($('[data-podcast-filter="status"]'), unique(d.podcast.map((x) => x.status)), "statuses");
  buildOptions($('[data-podcast-filter="location"]'), unique(d.podcast.map((x) => x.location)), "locations");
  buildOptions($('[data-content-filter="owner"]'), unique(d.contentCapture.map((x) => x.lead)), "people");
  buildOptions($('[data-content-filter="day"]'), unique(d.contentCapture.map((x) => x.day)), "days");
  buildOptions($('[data-content-filter="department"]'), departmentValues, "departments");
  buildOptions($('[data-content-filter="location"]'), unique(d.contentCapture.map((x) => x.location)), "locations");
  buildOptions($('[data-content-filter="priority"]'), unique(d.contentCapture.map((x) => x.priority)), "priorities");
  buildOptions($('[data-content-filter="status"]'), unique(d.contentCapture.map((x) => x.status)), "statuses");
}

function renderAll() {
  renderToday();
  renderRedFlags();
  renderScheduleTabs();
  renderSchedule();
  renderNowNext();
  renderCallSheetTabs();
  renderCallSheet();
  renderTravel();
  renderDepartmentTabs();
  renderDepartmentFocus();
  renderDailyRuns();
  renderTasks();
  renderContactTabs();
  renderContacts();
  renderLocations();
  renderSuppliers();
  renderPodcast();
  renderContentDayTabs();
  renderContentCapture();
  renderCaptureSuggestions();
  renderWorkstreams();
  renderHorizonsHouse();
  renderRoomDrops();
  renderSwagSchedule();
  renderSwag();
  renderStudio();
  renderDecisions();
  renderDocumentTabs();
  renderDocuments();
  renderCompleted();
}

function renderToday() {
  const { today } = state.data;
  const blocks = [
    ["Today", today.date, "On Track", [today.focus]],
    ["Top priorities", "Highest signal only", "", today.priorities],
    ["Critical items", "Needs attention", "Watch", today.criticalItems],
    ["Key meetings", "Team moments", "", today.meetings],
    ["Deadlines", "Confirm before moving", "Needs Confirmation", today.deadlines],
    ["Lead today", today.lead, "", today.notes]
  ];
  setHtml("[data-today]", blocks.map(([title, intro, status, bullets], index) => card({
    title,
    status,
    body: `<p>${escapeHtml(intro)}</p>${list(bullets)}`,
    updateId: `today:${index}-${slug(title)}`
  })).join(""));
}

function renderRedFlags() {
  const items = state.data.redFlags.filter((item) => passesGlobal(item, { status: item.status, owner: item.owner, updateId: item.updateId }));
  setHtml("[data-red-flags]", items.map((item) => card({
    title: item.issue,
    status: item.status || item.priority,
    body: `<p>${escapeHtml(item.whyItMatters)}</p>`,
    metadata: meta("Priority", item.priority) + meta("Owner", item.owner) + meta("Decision needed", item.decisionNeeded) + meta("Notes", item.notes),
    updateId: item.updateId
  })).join("") || empty("No red flags match the current filters."));
}

function renderScheduleTabs() {
  setHtml("[data-schedule-tabs]", state.data.dailyRunSheets.map((day, index) => {
    const label = day.day.split(" ")[0] || `Day ${index + 1}`;
    const current = getCurrentEventDay() === day.day;
    return `<button class="tab-button ${current ? "is-current-day" : ""}" type="button" role="tab" aria-selected="${day.day === state.activeDay}" data-day-tab="${escapeHtml(day.day)}">${escapeHtml(label)}${current ? `<span>Today</span>` : ""}</button>`;
  }).join(""));
}

const dayDateMap = {
  "Sunday 7 June": "2026-06-07",
  "Monday 8 June": "2026-06-08",
  "Tuesday 9 June": "2026-06-09",
  "Wednesday 10 June": "2026-06-10",
  "Thursday 11 June": "2026-06-11",
  "Friday 12 June": "2026-06-12"
};

const madridNow = () => new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" }));
const parseTimeMinutes = (value = "") => {
  const match = text(value).match(/(\d{1,2})(?::(\d{2}))?/);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2] || 0);
};
const getCurrentEventDay = () => {
  const now = madridNow();
  const iso = now.toISOString().slice(0, 10);
  return Object.entries(dayDateMap).find(([, date]) => date === iso)?.[0] || "";
};
const schedulePosition = (day = state.activeDay) => {
  const now = madridNow();
  const today = getCurrentEventDay();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const items = state.data.schedule
    .filter((item) => (item.dayLabel || item.date) === day)
    .map((item) => ({ ...item, startMinutes: parseTimeMinutes(item.timeDisplay || item.timeStart) }))
    .filter((item) => item.startMinutes !== null)
    .sort((a, b) => a.startMinutes - b.startMinutes);
  if (day !== today) return { today, now, current: null, next: items[0], nextItems: items.slice(0, 3), eventLive: Boolean(today) };
  let current = null;
  let next = null;
  for (const item of items) {
    if (item.startMinutes <= nowMinutes) current = item;
    if (item.startMinutes > nowMinutes) { next = item; break; }
  }
  return { today, now, current, next, nextItems: items.filter((item) => item.startMinutes > nowMinutes).slice(0, 3), eventLive: Boolean(today) };
};

function renderNowNext() {
  const position = schedulePosition(state.activeDay);
  const nowLabel = position.now.toLocaleString("en-GB", { weekday: "long", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" });
  const fallback = !position.eventLive ? "Event has not started yet. Showing the selected event day." : "Showing selected day.";
  setHtml("[data-now-next]", `
    <div>
      <span class="eyebrow">Ibiza time</span>
      <strong>${escapeHtml(nowLabel)}</strong>
      <p>${position.eventLive ? `Current event day: ${escapeHtml(position.today)}` : fallback}</p>
    </div>
    <div>
      <span class="eyebrow">Now</span>
      <strong>${escapeHtml(position.current?.title || (position.eventLive ? "Between scheduled moments" : "Event countdown active"))}</strong>
      <p>${escapeHtml(position.current ? `${position.current.timeDisplay || position.current.timeStart} · ${position.current.location || "Location TBC"}` : "Use the day tabs to review the full run sheet.")}</p>
    </div>
    <div>
      <span class="eyebrow">Coming up next</span>
      <strong>${escapeHtml(position.next?.title || "No later items listed")}</strong>
      ${position.nextItems?.length ? `<ul class="mini-list">${position.nextItems.map((item) => `<li>${escapeHtml(item.timeDisplay || item.timeStart || "TBC")} · ${escapeHtml(item.title)}${item.location ? ` · ${escapeHtml(item.location)}` : ""}</li>`).join("")}</ul>` : `<p>Check the next day tab.</p>`}
    </div>
  `);
  setHtml("[data-call-sheet-now-next]", `
    <div>
      <span class="eyebrow">Ibiza time</span>
      <strong>${escapeHtml(nowLabel)}</strong>
      <p>${position.eventLive ? `Current event day: ${escapeHtml(position.today)}` : fallback}</p>
    </div>
    <div>
      <span class="eyebrow">Now</span>
      <strong>${escapeHtml(position.current?.title || (position.eventLive ? "Between scheduled moments" : "Event countdown active"))}</strong>
      <p>${escapeHtml(position.current ? `${position.current.timeDisplay || position.current.timeStart} · ${position.current.location || "Location TBC"}` : "Use the call sheet day tabs to review the rundown.")}</p>
    </div>
    <div>
      <span class="eyebrow">Next</span>
      <strong>${escapeHtml(position.next?.title || "No later items listed")}</strong>
      ${position.nextItems?.length ? `<ul class="mini-list">${position.nextItems.map((item) => `<li>${escapeHtml(item.timeDisplay || item.timeStart || "TBC")} · ${escapeHtml(item.title)}${item.location ? ` · ${escapeHtml(item.location)}` : ""}</li>`).join("")}</ul>` : `<p>Check the next event day.</p>`}
    </div>
  `);
}

function renderSchedule() {
  const items = state.data.schedule
    .filter((item) => (item.dayLabel || item.date) === state.activeDay)
    .filter((item) => passesGlobal(item, { status: item.status, day: item.dayLabel || item.date, owner: item.owner, location: item.location, department: item.department, updateId: item.updateId }))
    .slice(0, 80);
  setHtml("[data-schedule]", items.map((item) => `
    <article class="timeline-item ${item.updateId === schedulePosition(state.activeDay).current?.updateId ? "is-now" : ""} ${item.updateId === schedulePosition(state.activeDay).next?.updateId ? "is-next" : ""}">
      <div class="timeline-time">${escapeHtml(item.timeDisplay || item.timeStart || "TBC")}</div>
      <div>
        <div class="card-header"><h3>${escapeHtml(item.title)}</h3><div class="tag-stack">${tag(latestUpdate(item.updateId)?.status || item.status)}${item.priority ? tag(normalizePriority(item.priority), "priority-tag") : ""}</div></div>
        ${latestUpdate(item.updateId) ? `<p><strong>Latest update:</strong> ${escapeHtml(latestUpdate(item.updateId).comment)}</p>` : ""}
        <p>${escapeHtml(firstMeaningful(item.shortDescription, item.notes, item.category))}</p>
        <div class="meta-list">${meta("Location", item.location)}${meta("Owner", item.owner)}${meta("Person involved", item.personInvolved)}</div>
        ${detailsBlock("More details", [["Category", item.category], ["Support", item.support], ["Department", item.department], ["Priority", normalizePriority(item.priority)], ["Workstream", item.workstream], ["Source", item.source]], item.notes && item.notes !== item.shortDescription ? `<p>${escapeHtml(item.notes)}</p>` : "")}
        ${updateModule(item.updateId)}
      </div>
    </article>
  `).join("") || empty("No schedule items match the current filters for this day."));
}

function renderCallSheetTabs() {
  setHtml("[data-call-sheet-tabs]", state.data.dailyRunSheets.map((day, index) => {
    const label = day.day.split(" ")[0] || `Day ${index + 1}`;
    const current = getCurrentEventDay() === day.day;
    return `<button class="tab-button ${current ? "is-current-day" : ""}" type="button" role="tab" aria-selected="${day.day === state.activeCallSheetDay}" data-call-sheet-tab="${escapeHtml(day.day)}">${escapeHtml(label)}${current ? `<span>Today</span>` : ""}</button>`;
  }).join(""));
}

function renderCallSheet() {
  const position = schedulePosition(state.activeCallSheetDay);
  const nowMinutes = position.now.getHours() * 60 + position.now.getMinutes();
  const isToday = position.today === state.activeCallSheetDay;
  const items = state.data.schedule
    .filter((item) => (item.dayLabel || item.date) === state.activeCallSheetDay)
    .filter((item) => passesGlobal(item, { status: item.status, day: item.dayLabel || item.date, owner: item.owner, location: item.location, department: item.department, updateId: item.updateId }))
    .map((item) => ({ ...item, startMinutes: parseTimeMinutes(item.timeDisplay || item.timeStart) }))
    .sort((a, b) => (a.startMinutes ?? 9999) - (b.startMinutes ?? 9999))
    .slice(0, 120);
  setHtml("[data-call-sheet]", items.map((item) => {
    const past = isToday && item.startMinutes !== null && item.startMinutes < nowMinutes && item.updateId !== position.current?.updateId;
    const current = item.updateId === position.current?.updateId;
    const next = item.updateId === position.next?.updateId;
    return `
      <article class="call-sheet-item ${past ? "is-past" : ""} ${current ? "is-now" : ""} ${next ? "is-next" : ""}">
        <div class="timeline-time">${escapeHtml(item.timeDisplay || item.timeStart || "TBC")}</div>
        <div>
          <div class="card-header">
            <h3>${escapeHtml(item.title)}</h3>
            <div class="tag-stack">${current ? tag("Now") : ""}${next ? tag("Next") : ""}${tag(item.status)}${item.priority ? tag(normalizePriority(item.priority), "priority-tag") : ""}</div>
          </div>
          <div class="meta-list compact-meta">${meta("Location", item.location)}${meta("Owner", item.owner)}${meta("Department", item.department || item.category)}</div>
          ${detailsBlock("Call sheet details", [["Support/team", item.support], ["Category", item.category], ["Supplier", item.relatedSupplier], ["Content capture", item.relatedContentCapture], ["Status", normalizeLabel(item.status)], ["Notes", item.notes]])}
          ${updateModule(item.updateId)}
        </div>
      </article>
    `;
  }).join("") || empty("No call sheet items match the current filters for this day."));
}

function renderContentDayTabs() {
  const days = ["All", ...unique(state.data.contentCapture.map((item) => item.day))];
  if (!days.includes(state.activeContentDay)) state.activeContentDay = "All";
  setHtml("[data-content-day-tabs]", days.map((day) => {
    const label = day === "All" ? "All" : day.split(" ")[0];
    return `<button class="tab-button" type="button" role="tab" aria-selected="${day === state.activeContentDay}" data-content-day-tab="${escapeHtml(day)}">${escapeHtml(label)}</button>`;
  }).join(""));
}

function renderDepartmentTabs() {
  const departments = ["All", ...(state.data.meta.departments || [])];
  setHtml("[data-department-tabs]", departments.map((department) => `<button class="tab-button" type="button" role="tab" aria-selected="${department === state.activeDepartment}" data-department-tab="${escapeHtml(department)}">${escapeHtml(department)}</button>`).join(""));
}

function renderDepartmentFocus() {
  const day = state.activeDay;
  const department = state.activeDepartment;
  const sameDept = (item) => department === "All" || item.department === department;
  const schedule = state.data.schedule.filter((item) => (item.dayLabel || item.date) === day && sameDept(item)).slice(0, 4);
  const tasks = state.data.tasks.filter((item) => item.day === day && sameDept(item)).slice(0, 4);
  const people = unique([...schedule.map((x) => x.owner), ...tasks.map((x) => x.person)]).slice(0, 6).join(", ");
  const locations = unique([...schedule.map((x) => x.location), ...tasks.map((x) => x.location)]).slice(0, 6).join(", ");
  setHtml("[data-department-focus]", card({
    title: department === "All" ? `${day} focus` : `${department} focus`,
    status: schedule.some((x) => /risk|problem/i.test(x.status || x.priority)) ? "Problem" : "Needs Confirmation",
    department: department === "All" ? "" : department,
    body: `<p>${schedule[0]?.shortDescription || schedule[0]?.title || "Select a department to narrow the day-specific view."}</p>${list(schedule.map((x) => `${x.timeDisplay || "TBC"} · ${x.title}`))}`,
    metadata: meta("Responsible people", people) + meta("Location", locations) + meta("Tasks", tasks.map((x) => x.action).join("; ")),
    updateId: `department-focus:${slug(day)}:${slug(department)}`
  }));
}

function renderDailyRuns() {
  setHtml("[data-daily-runs]", state.data.dailyRunSheets.map((day) => `
    <details class="accordion" ${day.day === state.activeDay ? "open" : ""}>
      <summary><span><strong>${escapeHtml(day.day)}</strong><br><span class="summary-hint">${escapeHtml(day.summary)}</span></span>${tag(day.watchOut ? "Watch" : "")}</summary>
      <div class="accordion-body">
        ${card({ title: "Focus", body: `<p>${escapeHtml(day.summary)}</p>`, metadata: meta("Locations", day.mainLocations) + meta("Watch-out", day.watchOut), updateId: `${day.updateId}:focus` })}
        ${card({ title: "Team responsibilities", body: list(day.teamResponsibilities) || "<p>No team responsibility notes listed yet.</p>", updateId: `${day.updateId}:team` })}
        ${card({ title: "Critical notes", status: day.criticalNotes.length ? "Watch" : "", body: list(day.criticalNotes) || "<p>No critical notes listed.</p>", updateId: `${day.updateId}:critical` })}
        ${card({ title: "Supplier moments", body: list(day.supplierMoments) || "<p>No supplier moments listed.</p>", updateId: `${day.updateId}:supplier` })}
        ${card({ title: "Content capture", body: list(day.contentCaptureMoments) || "<p>No content moments listed.</p>", updateId: `${day.updateId}:content` })}
        ${card({ title: "Podcast", status: day.podcastItems.length ? "Needs Confirmation" : "", body: list(day.podcastItems) || "<p>No podcast items listed.</p>", updateId: `${day.updateId}:podcast` })}
      </div>
    </details>
  `).join(""));
}

function renderTasks() {
  const items = state.data.tasks
    .filter((item) => passesGlobal(item, { status: item.status, day: item.day, owner: item.person, location: item.location, department: item.department, updateId: item.updateId }))
    .filter((item) => passesLocal(item, state.taskFilters, { owner: "person" }))
    .slice(0, 48);
  $("[data-task-count]").textContent = `${items.length} showing`;
  setHtml("[data-tasks]", items.map((item) => card({
    title: item.action,
    status: item.status,
    department: item.department,
    metadata: meta("Person", item.person) + meta("Person involved", item.personInvolved) + meta("Day", item.day) + meta("Time", item.time) + meta("Location", item.location) + meta("Status", normalizeLabel(item.status)) + meta("Priority", normalizePriority(item.priority)) + meta("Support", item.support) + meta("Notes", item.notes),
    updateId: item.updateId
  })).join("") || empty("No tasks match the current filters."));
}

function renderTravel() {
  const items = (state.data.travel || [])
    .filter((item) => passesGlobal(item, { status: item.status, day: item.arrivalDate || item.departureDate, owner: item.person, location: item.arrivalAirport || item.departureAirport, updateId: item.updateId }))
    .filter((item) => passesLocal(item, state.travelFilters, {
      person: "person",
      arrivalDay: "arrivalDate",
      departureDay: "departureDate",
      team: "team",
      status: "status"
    }))
    .slice(0, 60);
  const count = $("[data-travel-count]");
  if (count) count.textContent = `${items.length} showing`;
  setHtml("[data-travel]", items.map((item) => card({
    title: item.person,
    status: item.status,
    department: item.team,
    body: `<p>${escapeHtml(firstMeaningful(item.arrivalDate, item.departureDate, "Travel date needed"))} · ${escapeHtml(firstMeaningful(item.arrivalAirport, item.departureAirport, "Airport needed"))}</p>
      ${detailsBlock("Travel details", [["Team/company", item.team], ["Arrival date", item.arrivalDate || "Arrival date needed"], ["Arrival time", item.arrivalTime || "Arrival time needed"], ["Arrival airport", item.arrivalAirport || "Arrival airport needed"], ["Arrival flight", item.arrivalFlight || "Flight info needed"], ["Departure date", item.departureDate || "Departure date needed"], ["Departure time", item.departureTime || "Departure time needed"], ["Departure airport", item.departureAirport || "Departure airport needed"], ["Departure flight", item.departureFlight || "Flight info needed"], ["Transfer notes", item.hotelTransferNotes], ["Transport owner", item.transportOwner], ["Notes", item.notes]])}`,
    metadata: meta("Team/company", item.team),
    updateId: item.updateId
  })).join("") || empty("No travel items match the filters."));
}

function renderContactTabs() {
  const categories = ["All", "Leadership", "Production", "Content", "Hotel", "Suppliers", "I.N.C", "Clownfish", "B Good", "Remote"];
  setHtml("[data-contact-tabs]", categories.map((category) => `<button class="tab-button" type="button" role="tab" aria-selected="${category === state.activeContactCategory}" data-contact-tab="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join(""));
}

function renderContacts() {
  const items = state.data.contacts
    .filter((item) => state.activeContactCategory === "All" || item.category === state.activeContactCategory || item.group === state.activeContactCategory || (state.activeContactCategory === "I.N.C" && /I\\.N\\.C|International Collective/.test(`${item.category} ${item.group}`)))
    .filter((item) => passesGlobal(item, { owner: item.name, department: item.category, updateId: item.updateId }));
  setHtml("[data-contacts]", items.map((item) => {
    const phoneHref = item.phone ? `tel:${item.phone.replace(/[^+0-9]/g, "")}` : "";
    return card({
      title: item.name,
      status: item.category || item.group,
      body: `<p>${escapeHtml(item.role || item.responsibility)}</p>`,
      metadata: meta("Category", item.category || item.group) + meta("Phone", item.phone) + meta("Email", item.email || (item.notes === "Email needed" ? "Email needed" : "")) + meta("Notes", item.notes && item.notes !== "Email needed" ? item.notes : ""),
      footer: `<div class="contact-actions">${phoneHref ? `<a href="${phoneHref}">Call</a>` : ""}${item.whatsappLink ? `<a href="${item.whatsappLink}" target="_blank" rel="noreferrer">WhatsApp</a>` : ""}${item.email ? `<a href="mailto:${item.email}">Email</a>` : ""}</div>`,
      updateId: item.updateId
    });
  }).join("") || empty("No contacts match the current filters."));
}

function renderLocations() {
  const items = state.data.locations.filter((item) => passesGlobal(item, { status: item.status, owner: item.keyOwner, location: item.locationName, updateId: item.updateId }));
  setHtml("[data-locations]", items.map((item) => card({
    title: item.locationName,
    status: item.status,
    body: `<p>${escapeHtml(item.primaryUse)}</p>`,
    metadata: meta("Type", item.locationType) + meta("Key days", item.mainDays) + meta("Owner", item.keyOwner) + meta("Watch-out", item.watchOut) + meta("Notes", item.notes),
    updateId: item.updateId
  })).join("") || empty("No locations match the current filters."));
}

function renderSuppliers() {
  const items = state.data.suppliers.filter((item) => passesGlobal(item, { status: item.status, day: item.day, owner: item.internalOwner, location: item.location, department: item.department, updateId: item.updateId })).slice(0, 48);
  $("[data-supplier-count]").textContent = `${items.length} showing`;
  setHtml("[data-suppliers]", items.map((item) => card({
    title: item.supplierName,
    status: item.status,
    department: item.department,
    body: `<p>${escapeHtml(firstMeaningful(item.responsibility, item.supplierType, "Supplier responsibility needed"))}</p>
      <div class="meta-list compact-meta">${meta("Key day/location", [item.day, item.location].filter(Boolean).join(" · "))}${meta("Internal owner", item.internalOwner)}${meta("Open items", item.openItems?.length ? `${item.openItems.length}` : "")}</div>
      ${detailsBlock("Supplier details", [["Supplier type", item.supplierType], ["Contact", item.contactPerson], ["Phone", item.phone], ["Email", item.email], ["Responsibility", item.responsibility], ["Day(s)", item.day], ["Location", item.location], ["Arrival", item.arrivalTime], ["Setup", item.setupTime], ["Active", item.activeTime], ["Notes", item.notes]], `${supplierTimeline(item)}${item.openItems?.length ? `<h3>Open items</h3>${item.openItems.slice(0, 8).map((open, index) => `<p>${tag(open.status)} <strong>${index + 1}.</strong> ${escapeHtml(open.item)}</p>${meta("Owner", open.owner)}${open.latestUpdate ? meta("Latest update", open.latestUpdate) : ""}`).join("")}` : ""}`)}`,
    metadata: "",
    updateId: item.updateId,
    updateTopics: state.data.meta?.supplierUpdateTopics || []
  })).join("") || empty("No suppliers match the current filters."));
}

function supplierTimeline(item) {
  const blocks = item.timelineBlocks || [];
  if (!blocks.length) {
    return `<div class="supplier-timeline">${meta("Day(s)", item.day)}${meta("Arrival/setup", [item.arrivalTime, item.setupTime].filter(Boolean).join(" / "))}${meta("Active", item.activeTime)}${meta("Location", item.location)}</div>`;
  }
  return `<div class="supplier-timeline">
    ${blocks.slice(0, 8).map((block) => `
      <div class="supplier-time-block">
        <strong>${escapeHtml(block.day || "Day needed")}</strong>
        <p>${escapeHtml(block.summary || "Supplier moment")}</p>
        <div class="meta-list">
          ${meta("Arrival", block.arrival)}
          ${meta("Setup", block.setup)}
          ${meta("Active", block.active)}
          ${meta("Location", block.location)}
          ${meta("Status", normalizeLabel(block.status))}
        </div>
      </div>
    `).join("")}
  </div>`;
}

function renderPodcast() {
  const items = state.data.podcast
    .filter((item) => passesGlobal(item, { status: item.status, day: item.day || item.date, owner: item.productionLead, location: item.location, department: "Podcast", updateId: item.updateId }))
    .filter((item) => passesLocal(item, state.podcastFilters, { guest: (x) => x.guest || x.guestSubject }));
  setHtml("[data-podcast]", items.map((item) => card({
    title: item.slot,
    status: item.status,
    department: "Podcast",
    body: `<p>${escapeHtml(item.guest || item.guestSubject || "Guest TBC")}</p>`,
    metadata: meta("Date/day", item.day || item.date) + meta("Time", item.time) + meta("Host", item.presenter) + meta("Production lead", item.productionLead) + meta("Crew", item.technicalTeam) + meta("Location", item.location) + meta("Production needs", item.productionNeeds) + meta("Notes", item.notes),
    updateId: item.updateId
  })).join("") || empty("No podcast slots match the filters."));
}

function renderContentCapture() {
  const items = state.data.contentCapture
    .filter((item) => passesGlobal(item, { status: item.status, day: item.day, owner: item.lead, location: item.location, department: item.department, updateId: item.updateId }))
    .filter((item) => state.activeContentDay === "All" || item.day === state.activeContentDay)
    .filter((item) => passesLocal(item, state.contentFilters, { owner: "lead" }))
    .slice(0, 48);
  $("[data-content-count]").textContent = `${items.length} showing`;
  setHtml("[data-content-capture]", items.map((item) => card({
    title: item.moment,
    status: item.status,
    department: item.department,
    body: `<p>${escapeHtml([item.day, item.time].filter(Boolean).join(" · ") || "Time needed")}</p>
      <div class="meta-list compact-meta">${meta("Type", item.contentType)}${meta("Lead", item.lead)}${meta("Location", item.location)}</div>
      ${detailsBlock("Capture details", [["Support", item.support], ["Department", item.department], ["Priority", item.priority], ["Status", normalizeLabel(item.status)], ["Notes", item.notes], ["Related schedule", item.relatedSchedule], ["Suggested shots", item.suggestedShots]])}`,
    metadata: "",
    updateId: item.updateId,
    updateTopics: state.data.meta?.contentUpdateTopics || []
  })).join("") || empty("No content moments match the filters."));
}

function renderCaptureSuggestions() {
  const base = state.data.captureSuggestions || [];
  const local = state.captureSuggestions || [];
  const items = [...base, ...local].slice(-12);
  setHtml("[data-capture-suggestions]", items.map((item) => card({
    title: item.idea,
    status: item.status || item.priority,
    department: "Content",
    metadata: meta("Added by", item.name) + meta("Suggested day/time", item.suggestedTime) + meta("Location", item.location) + meta("Priority", item.priority) + meta("Assigned to", item.assignedTo) + meta("Notes", item.notes),
    updateId: item.updateId,
    updateTopics: state.data.meta?.contentUpdateTopics || []
  })).join("") || empty("No live capture suggestions yet."));
}

function renderWorkstreams() {
  setHtml("[data-workstreams]", state.data.workstreams.map((item) => {
    const relatedPeople = unique(state.data.contacts.filter((c) => includes(c, item.name.split(" ")[0])).map((c) => c.name)).slice(0, 5).join(", ");
    const relatedTasks = state.data.tasks.filter((task) => item.name.includes(task.department) || task.department === item.name.split(" ")[0]).slice(0, 3).map((task) => task.action);
    return card({
      title: item.name,
      status: item.status,
      body: `<p>${escapeHtml(item.description)}</p>${list(item.topOpenItems)}${relatedTasks.length ? `<h3>Related tasks</h3>${list(relatedTasks)}` : ""}`,
      metadata: meta("Owner", item.owner) + meta("Related people", relatedPeople),
      footer: item.link ? `<a class="button button-secondary" href="${item.link}">Open section</a>` : "",
      updateId: item.updateId
    });
  }).join(""));
}

function renderHorizonsHouse() {
  setHtml("[data-horizons-house]", state.data.horizonsHouse.map((item) => `
    <div class="visual-block">
      ${card({ title: item.title, status: item.status, body: `<p>${escapeHtml(item.notes)}</p><h3>Setup instructions</h3>${list(item.setupInstructions)}<h3>Checklist</h3>${list(item.checklist)}`, metadata: meta("Owner", item.owner), updateId: item.updateId })}
      <div class="reference-grid">
        ${item.referenceImages.map((image) => `<figure class="reference-card"><img src="${image.src}" alt="${escapeHtml(image.alt)}" loading="lazy"><figcaption>${escapeHtml(image.caption)}</figcaption></figure>`).join("")}
        ${item.referenceImages?.length ? "" : `<div class="image-placeholder"><strong>Image needed</strong><span>HORIZONS test reception display, reception display, and display cabinet reference images.</span></div>`}
      </div>
    </div>
  `).join(""));
}

function renderRoomDrops() {
  setHtml("[data-room-drops]", state.data.roomDrops.map((item) => `
    <div class="visual-block">
      ${card({ title: item.title, status: item.status, body: `<p>${escapeHtml(item.deliveryNotes)}</p><p><strong>${escapeHtml(item.handling)}</strong></p><h3>What is being dropped</h3>${list(item.items)}<h3>Quality control</h3>${list(item.qualityChecklist)}`, metadata: meta("Owner", item.owner) + meta("Responsible teams", item.responsibleTeams.join(", ")), updateId: item.updateId })}
      <div class="reference-grid">
        ${(item.referenceImages || []).map((image) => `<figure class="reference-card"><img src="${image.src}" alt="${escapeHtml(image.alt)}" loading="lazy"><figcaption>${escapeHtml(image.caption)}</figcaption></figure>`).join("")}
        ${(item.referenceImages || []).length ? "" : `<div class="image-placeholder"><strong>Image needed</strong><span>Room-drop and guest-gift reference images.</span></div>`}
      </div>
    </div>
  `).join(""));
}

function renderSwagSchedule() {
  const items = state.data.swagQueensSchedule || [];
  setHtml("[data-swag-schedule-tabs]", items.map((item) => `<button class="tab-button" type="button" role="tab" aria-selected="${item.day === state.activeSwagSchedule}" data-swag-tab="${escapeHtml(item.day)}">${escapeHtml(item.label || item.day)}</button>`).join(""));
  const selected = items.filter((item) => item.day === state.activeSwagSchedule);
  setHtml("[data-swag-queens]", selected.map((item) => card({
    title: `Swag / Queens schedule · ${item.day}`,
    status: item.status,
    body: list(item.schedule),
    metadata: meta("Guests", item.guests) + meta("Owner", item.owner) + meta("Notes", item.notes),
    updateId: item.updateId
  })).join(""));
}

function renderSwag() {
  setHtml("[data-swag]", state.data.swag.map((item) => card({
    title: item.itemName,
    status: item.status,
    body: item.image ? `<figure class="reference-card"><img src="${item.image}" alt="${escapeHtml(item.alt)}" loading="lazy"><figcaption>${escapeHtml(item.imageCaption || "Reference image")}</figcaption></figure>` : `<div class="image-placeholder"><strong>Image needed</strong><span>Reference image needed.</span></div>`,
    metadata: meta("Location", item.location) + meta("Owner", item.owner) + meta("Quantity", item.quantity) + meta("Delivery/setup", item.deliverySetupNotes),
    updateId: item.updateId
  })).join(""));
}

function renderStudio() {
  setHtml("[data-horizons-studio]", state.data.horizonsStudio.map((item) => card({
    title: "HORIZONS Studio",
    status: item.status,
    body: `<p>${escapeHtml(item.purpose)}</p>
      <div class="studio-logo-card">
        ${(item.referenceImages || []).map((image) => `
          <figure class="reference-card">
            <img src="${image.src}" alt="${escapeHtml(image.alt)}" loading="lazy">
            <figcaption>${escapeHtml(image.caption)}</figcaption>
          </figure>
        `).join("")}
        <div class="image-placeholder"><strong>File needed</strong><span>HORIZONS Studio setup/reference images.</span></div>
      </div>`,
    metadata: meta("Location", item.location) + meta("Owner", item.owner) + meta("Setup notes", item.setupNotes) + meta("Production notes", item.productionNotes),
    updateId: item.updateId
  })).join(""));
}

function renderDecisions() {
  setHtml("[data-decisions]", state.data.decisions.map((item) => card({
    title: item.decisionNeeded,
    status: item.status,
    body: `<p>${escapeHtml(item.whyItMatters)}</p><h3>Options</h3>${list(item.options)}<h3>Recommendation</h3><p>${escapeHtml(item.recommendation)}</p>`,
    metadata: meta("Owner", item.owner) + meta("Approver", item.approver) + meta("Deadline", item.deadline) + meta("Latest update", item.latestUpdate) + meta("Workstream", item.relatedWorkstream),
    updateId: item.updateId
  })).join(""));
}

function renderDocumentTabs() {
  const categories = ["All", "Menus", "Maps", "Site Map", "Seating Plans", "Room Layouts", "Brand Files", "Supplier Documents", "Runbooks", "Production Documents", "Guest Experience", "HORIZONS House", "Room Drops", "Swag", "Podcast", "Content Capture", "Presentations / Speeches", "Event Content Documents", "Other"];
  setHtml("[data-document-tabs]", categories.map((category) => `<button class="tab-button" type="button" role="tab" aria-selected="${category === state.activeDocumentCategory}" data-document-tab="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join(""));
}

function renderDocuments() {
  const docs = state.data.documents.filter((doc) => state.activeDocumentCategory === "All" || doc.category === state.activeDocumentCategory);
  setHtml("[data-site-maps]", state.activeDocumentCategory === "All" || ["Maps", "Seating Plans", "Room Layouts"].includes(state.activeDocumentCategory)
    ? state.data.siteMaps.map((item) => card({ title: item.title, status: item.status, body: `<p>${escapeHtml(item.description)}</p>`, metadata: meta("Category", item.category) + meta("Owner", item.owner), updateId: item.updateId })).join("")
    : "");
  setHtml("[data-documents]", docs.map((item) => card({
    title: item.title,
    status: item.status,
    body: `<p>${escapeHtml(item.description)}</p>`,
    metadata: meta("Category", item.category) + meta("Day", item.day) + meta("Type", item.type) + meta("Owner", item.owner),
    footer: item.link ? `<a class="button button-secondary" href="${item.link}">Open reference</a>` : `<span class="tag tag-waiting">File needed</span>`,
    updateId: item.updateId
  })).join("") || empty("No documents in this category yet."));
}

function renderCompleted() {
  setHtml("[data-completed]", state.data.completed.map((item, index) => card({
    title: item.title,
    status: item.status,
    metadata: meta("Source", item.source) + meta("Owner", item.owner) + meta("Notes", item.notes),
    updateId: `completed:${index}`
  })).join("") || empty("No completed items listed yet."));
}

function startCountdown() {
  const target = new Date(state.data.event.countdownTarget || "2026-06-08T00:00:00+02:00").getTime();
  const update = () => {
    const diff = Math.max(0, target - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    $("[data-countdown-days]").textContent = days;
    $("[data-countdown-hours]").textContent = String(hours).padStart(2, "0");
    $("[data-countdown-minutes]").textContent = String(minutes).padStart(2, "0");
    $("[data-countdown-seconds]").textContent = String(seconds).padStart(2, "0");
  };
  update();
  setInterval(update, 1000);
}

function startNowNext() {
  renderNowNext();
  setInterval(() => {
    renderNowNext();
    renderScheduleTabs();
    renderSchedule();
    renderCallSheet();
  }, 60000);
}

function setupSectionNavigation() {
  const sections = [
    ["overview", "Overview"],
    ["today", "Today"],
    ["red-flags", "Red Flags"],
    ["schedule", "Schedule"],
    ["call-sheet", "Call Sheet"],
    ["flights", "Flights"],
    ["tasks", "Tasks"],
    ["contacts", "Contacts"],
    ["locations", "Locations"],
    ["suppliers", "Suppliers"],
    ["podcast", "Podcast"],
    ["content", "Content"],
    ["workstreams", "Workstreams"],
    ["horizons-house", "HORIZONS House"],
    ["room-drops", "Room Drops"],
    ["swag", "Swag"],
    ["horizons-studio", "HORIZONS Studio"],
    ["decisions", "Decisions"],
    ["documents", "Documents"]
  ].filter(([id]) => document.getElementById(id));
  const progress = $("[data-section-progress]");
  if (progress) {
    progress.innerHTML = sections.map(([id, label]) => `<a href="#${id}" data-progress-link="${id}"><span></span><em>${escapeHtml(label)}</em></a>`).join("");
  }
  const navLinks = $$("[data-nav] a");
  let ticking = false;
  const setActive = (id) => {
    navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`));
    $$("[data-progress-link]").forEach((link) => link.classList.toggle("is-active", link.dataset.progressLink === id));
  };
  const updateActive = () => {
    ticking = false;
    const headerOffset = ($("[data-header]")?.offsetHeight || 72) + 16;
    const probeLine = headerOffset + window.innerHeight * 0.28;
    let active = sections[0]?.[0] || "";
    sections.forEach(([id]) => {
      const element = document.getElementById(id);
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (rect.top <= probeLine && rect.bottom > headerOffset) active = id;
    });
    if (active) setActive(active);
  };
  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateActive);
  };
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  requestUpdate();
}

function bindEvents() {
  $("[data-menu-toggle]").addEventListener("click", (event) => {
    const open = !document.body.classList.contains("nav-open");
    document.body.classList.toggle("nav-open", open);
    event.currentTarget.setAttribute("aria-expanded", String(open));
  });
  $$("[data-nav] a").forEach((link) => link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    $("[data-menu-toggle]").setAttribute("aria-expanded", "false");
  }));
  $("[data-global-search]").addEventListener("input", (event) => { state.filters.query = event.target.value.trim(); renderAll(); });
  $$("[data-filter]").forEach((select) => select.addEventListener("change", (event) => { state.filters[event.target.dataset.filter] = event.target.value; renderAll(); }));
  $$("[data-task-filter]").forEach((select) => select.addEventListener("change", (event) => { state.taskFilters[event.target.dataset.taskFilter] = event.target.value; renderTasks(); }));
  $$("[data-travel-filter]").forEach((select) => select.addEventListener("change", (event) => { state.travelFilters[event.target.dataset.travelFilter] = event.target.value; renderTravel(); }));
  $$("[data-podcast-filter]").forEach((select) => select.addEventListener("change", (event) => { state.podcastFilters[event.target.dataset.podcastFilter] = event.target.value; renderPodcast(); }));
  $$("[data-content-filter]").forEach((select) => select.addEventListener("change", (event) => { state.contentFilters[event.target.dataset.contentFilter] = event.target.value; renderContentCapture(); }));
  $("[data-reset-filters]").addEventListener("click", () => {
    state.filters = { query: "", status: "", day: "", owner: "", location: "", department: "" };
    state.taskFilters = { department: "", owner: "", day: "", status: "", location: "" };
    state.travelFilters = { person: "", arrivalDay: "", departureDay: "", team: "", status: "" };
    state.podcastFilters = { day: "", guest: "", status: "", location: "" };
    state.contentFilters = { owner: "", day: "", department: "", location: "", priority: "", status: "" };
    $("[data-global-search]").value = "";
    $$("[data-filter], [data-task-filter], [data-travel-filter], [data-podcast-filter], [data-content-filter]").forEach((select) => select.value = "");
    renderAll();
  });
  document.addEventListener("click", (event) => {
    const dayTab = event.target.closest("[data-day-tab]");
    if (dayTab) { state.activeDay = dayTab.dataset.dayTab; renderScheduleTabs(); renderNowNext(); renderSchedule(); renderDepartmentFocus(); renderDailyRuns(); return; }
    const callSheetTab = event.target.closest("[data-call-sheet-tab]");
    if (callSheetTab) { state.activeCallSheetDay = callSheetTab.dataset.callSheetTab; renderCallSheetTabs(); renderNowNext(); renderCallSheet(); return; }
    const contentDayTab = event.target.closest("[data-content-day-tab]");
    if (contentDayTab) { state.activeContentDay = contentDayTab.dataset.contentDayTab; renderContentDayTabs(); renderContentCapture(); return; }
    const openToday = event.target.closest("[data-open-today]");
    if (openToday) {
      const today = getCurrentEventDay() || state.data.today?.date || state.activeDay;
      state.activeDay = today;
      state.activeCallSheetDay = today;
      renderScheduleTabs();
      renderCallSheetTabs();
      renderNowNext();
      renderSchedule();
      renderCallSheet();
      renderDepartmentFocus();
      renderDailyRuns();
      document.getElementById("daily")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const collapseDays = event.target.closest("[data-collapse-days]");
    if (collapseDays) { $$("[data-daily-runs] details").forEach((detail) => { detail.open = false; }); return; }
    const departmentTab = event.target.closest("[data-department-tab]");
    if (departmentTab) { state.activeDepartment = departmentTab.dataset.departmentTab; renderDepartmentTabs(); renderDepartmentFocus(); return; }
    const contactTab = event.target.closest("[data-contact-tab]");
    if (contactTab) { state.activeContactCategory = contactTab.dataset.contactTab; renderContactTabs(); renderContacts(); return; }
    const documentTab = event.target.closest("[data-document-tab]");
    if (documentTab) { state.activeDocumentCategory = documentTab.dataset.documentTab; renderDocumentTabs(); renderDocuments(); return; }
    const swagTab = event.target.closest("[data-swag-tab]");
    if (swagTab) { state.activeSwagSchedule = swagTab.dataset.swagTab; renderSwagSchedule(); }
  });
  document.addEventListener("submit", (event) => {
    const suggestionForm = event.target.closest("[data-capture-suggestion-form]");
    if (suggestionForm) {
      event.preventDefault();
      const data = new FormData(suggestionForm);
      const item = {
        id: `local-capture-${Date.now()}`,
        updateId: `capture-suggestion:local-${Date.now()}`,
        name: text(data.get("name"), "Anonymous"),
        idea: text(data.get("idea")),
        suggestedTime: text(data.get("time"), "Time needed"),
        location: text(data.get("location"), "Location needed"),
        priority: text(data.get("priority"), "Suggested"),
        status: text(data.get("priority"), "Suggested"),
        assignedTo: text(data.get("assignedTo"), "Assignment needed"),
        notes: text(data.get("notes")),
        timestamp: new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
      };
      if (!item.idea) return;
      state.captureSuggestions = [...state.captureSuggestions, item];
      suggestionStore.save(state.captureSuggestions);
      suggestionForm.reset();
      renderCaptureSuggestions();
      return;
    }
    const form = event.target.closest("[data-update-form]");
    if (!form) return;
    event.preventDefault();
    const id = form.dataset.updateForm;
    const data = new FormData(form);
    const update = {
      name: text(data.get("name"), "Anonymous"),
      topic: text(data.get("topic")),
      status: text(data.get("status"), "Still To Be Resolved"),
      comment: text(data.get("comment")),
      timestamp: new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
    };
    if (!update.comment) return;
    state.updates[id] = [...getUpdates(id), update];
    updateStore.save(state.updates);
    renderAll();
  });
}

init().catch((error) => {
  console.error(error);
  document.body.insertAdjacentHTML("afterbegin", `<div class="empty-state">The command centre could not load the latest event data. Please refresh or contact the site owner.</div>`);
});
