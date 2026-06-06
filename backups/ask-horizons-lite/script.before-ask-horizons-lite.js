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
  guestFilters: { query: "", company: "", status: "", missing: "", quick: "all" },
  attendeeFilters: { query: "", category: "", company: "" },
  searchQuery: "",
  menuFilters: { query: "", date: "", location: "", meal: "", needs: false },
  roundTablePlan: null,
  roundTableStorageWarning: "",
  activeHallTab: "overview",
  activeRoundTableNumber: 1,
  roundTableEditMode: false,
  hallControlCentreOpen: false,
  activeSeatEditor: "",
  captureSuggestions: [],
  captureLog: [],
  dismissedCaptureSuggestions: [],
  updates: {}
};

const APP_VERSION = "20260605-cleanup1";
const APP_GROUPS = [
  { id: "overview", label: "Overview", target: "overview", sections: ["overview", "app-search"] },
  { id: "today", label: "Today", target: "today", sections: ["today", "red-flags", "decisions"] },
  { id: "call-sheet", label: "Call Sheet", target: "call-sheet", sections: ["call-sheet"] },
  { id: "schedule", label: "Schedule", target: "schedule", sections: ["schedule", "flights", "daily", "tasks"] },
  { id: "locations", label: "Locations", target: "locations", sections: ["locations", "location-schedules", "restaurants", "menus"] },
  { id: "people", label: "People", target: "contacts", sections: ["contacts", "who-do-i-call", "staff", "guests", "attendee-directory", "suppliers"] },
  { id: "programme", label: "Programme", target: "podcast", sections: ["podcast", "speakers", "entertainment", "playlists", "rehearsals", "content", "workstreams"] },
  { id: "assets", label: "Assets", target: "menus", sections: ["menus", "swag", "room-drops", "horizons-house", "artwork", "documents", "completed"] },
  { id: "admin", label: "Admin", target: "admin-data", sections: ["admin-data", "cvent", "missing-files", "asset-review", "slack", "data-health", "duplicate-review", "site-audit"] }
];
const groupBySection = APP_GROUPS.reduce((acc, group) => {
  group.sections.forEach((id) => { acc[id] = group.id; });
  return acc;
}, {});
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const text = (value, fallback = "") => value === null || value === undefined || String(value).trim() === "" ? fallback : String(value).trim();
const slug = (value) => text(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const escapeHtml = (value) => text(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[char]));
const includes = (item, query) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase());
const unique = (values) => [...new Set(values.map((value) => text(value)).filter(Boolean))].sort((a, b) => a.localeCompare(b));
const displayName = (value = "") => text(value).replace(/\bB Good\b/g, "BeGood").replace(/\bBe Good\b/g, "BeGood");
const getUpdates = (id) => state.updates[id] || [];
const latestUpdate = (id) => getUpdates(id).at(-1);
const hallScrollTop = () => $("[data-hall-scroll]")?.scrollTop || 0;
function rerenderHallCentre({ preserveScroll = true, scrollTop = hallScrollTop() } = {}) {
  renderLocations();
  document.body.classList.add("hall-centre-open");
  if (!preserveScroll) return;
  requestAnimationFrame(() => {
    const body = $("[data-hall-scroll]");
    if (body) body.scrollTop = scrollTop;
  });
}
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

const weatherStore = {
  key: "horizons-weather-cache-v2",
  load() {
    try { return JSON.parse(localStorage.getItem(this.key) || "null"); }
    catch { return null; }
  },
  save(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
};

const slackActivityStore = {
  key: "horizons-slack-activity-v1",
  load() {
    try { return JSON.parse(localStorage.getItem(this.key) || "[]"); }
    catch { return []; }
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

const dismissedSuggestionStore = {
  key: "horizons-dismissed-capture-suggestions-v1",
  load() {
    try { return JSON.parse(localStorage.getItem(this.key) || "[]"); }
    catch { return []; }
  },
  save(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
};

const captureLogStore = {
  key: "horizons-capture-log-v1",
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
const asList = (value) => Array.isArray(value) ? value : text(value) ? [value] : [];
const list = (items = []) => asList(items).filter(Boolean).length ? `<ul>${asList(items).filter(Boolean).slice(0, 8).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : "";
const empty = (message = "No matching items.") => `<div class="empty-state">${escapeHtml(message)}</div>`;
const setHtml = (selector, html) => { const element = $(selector); if (element) element.innerHTML = html; };
const detailRows = (rows = []) => rows.filter(([, value]) => text(value)).map(([label, value]) => meta(label, value)).join("");
const detailsBlock = (summary, rows = [], extra = "") => {
  const content = `${detailRows(rows)}${extra}`;
  if (!content.trim()) return "";
  return `<details class="details"><summary><span>${escapeHtml(summary)}</span></summary><div class="details-content">${content}</div></details>`;
};
const referenceGallery = (images = []) => `
  <div class="reference-grid compact-reference-grid">
    ${asList(images).map((image) => image?.src
      ? `<figure class="reference-card"><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt || image.caption || "Reference image")}" loading="lazy"><figcaption>${escapeHtml(image.caption || "Reference image")}</figcaption></figure>`
      : `<div class="image-placeholder"><strong>${escapeHtml(image?.alt || "Image needed")}</strong><span>${escapeHtml(image?.caption || "Reference image needed.")}</span></div>`).join("")}
  </div>
`;
const allocationTable = (rows = []) => asList(rows).length ? `
  <div class="allocation-table">
    ${rows.map((row) => `<div><span>${escapeHtml(row.label || row.title || "Item")}</span><strong>${escapeHtml(row.quantity || row.value || "Needed")}</strong></div>`).join("")}
  </div>
` : "";
const lanyardMeaning = (item = {}) => {
  const colour = text(item.colour || item.label).toLowerCase();
  if (colour.includes("black")) return "Aream & Co";
  if (colour.includes("brown") || colour.includes("ochre")) return "Crew";
  if (colour.includes("blue")) return "PC & console";
  if (colour.includes("green") || colour.includes("sage")) return "mobile consumer";
  if (colour.includes("oatmeal")) return "other";
  return text(item.groupMeaning || item.meaning || item.group, "Meaning pending");
};
const firstMeaningful = (...values) => values.map((value) => text(value)).find(Boolean) || "";
const isLiveRecord = (item = {}) => !item.hiddenFromLive && !item.archived && !/not needed|archived|moved/i.test(text(item.status));
const liveItems = (items = []) => items.filter(isLiveRecord);
const groupBy = (items = [], keyFn = (item) => item.day || "Unscheduled") => items.reduce((acc, item) => {
  const key = text(keyFn(item), "Unscheduled");
  acc[key] = [...(acc[key] || []), item];
  return acc;
}, {});

const dayLabelShort = (value = "") => {
  const raw = text(value);
  const match = raw.match(/^(Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday)\s+(\d+)\s+(\w+)/i);
  return match ? `${match[1]} ${match[2]} ${match[3]}` : raw;
};

const buildOptions = (select, values, label) => {
  if (!select) return;
  select.innerHTML = `<option value="">All ${label}</option>${values.map((value) => `<option value="${escapeHtml(displayName(value))}">${escapeHtml(displayName(value))}</option>`).join("")}`;
};

const optionStopWords = new Set(["lead", "team", "monitor", "support", "owner", "tbc", "n/a", "na", "needs confirmation"]);
const splitOptionValues = (values = []) => unique(values.flatMap((value) => displayName(value)
  .split(/\s*\/\s*|\s*,\s*|\s+\+\s+/)
  .map((part) => displayName(part))
  .filter((part) => part && !optionStopWords.has(part.toLowerCase()) && part.length > 1)));
const ownerOptionValues = (values = []) => splitOptionValues(values).slice(0, 160);
const ownerMatches = (candidate, selected) => {
  if (!selected) return true;
  const tokens = splitOptionValues([candidate]);
  const normalized = displayName(candidate).toLowerCase();
  const choice = displayName(selected).toLowerCase();
  return tokens.some((token) => token.toLowerCase() === choice) || normalized.includes(choice);
};

const options = () => state.data?.meta?.statusOptions || ["Still To Be Resolved", "Resolved", "Problem", "Needs Confirmation", "Waiting", "On Track"];
const slackChannelFor = (id = "") => {
  const routing = state.data?.meta?.slackCommentRouting || {};
  const prefix = text(id).split(":")[0] || "default";
  return routing[prefix] || routing.default || "#horizons-main";
};
const slackChannelsForSelect = (suggested = "#horizons-main") => unique([suggested, ...(state.data?.meta?.slackChannels || []).map((item) => item.channel)]).filter(Boolean);
const slackUrgencyLabel = (update = {}) => /urgent|critical|at risk|problem|decision/i.test(`${update.priority} ${update.status}`) ? "URGENT / AT RISK" : "Normal update";

const backendApiBase = () => text(state.data?.meta?.backendApiBase || window.HORIZONS_API_BASE || "").replace(/\/$/, "");
const parentTypeFor = (id = "") => {
  const prefix = text(id).split(":")[0] || "default";
  return {
    redflag: "red_flag",
    schedule: "schedule_item",
    callSheet: "call_sheet_item",
    call: "call_sheet_item",
    location: "location",
    restaurant: "restaurant",
    podcast: "podcast",
    supplier: "supplier",
    entertainment: "entertainment",
    content: "content_capture",
    document: "document",
    doc: "document",
    missing: "missing_file",
    decision: "decision",
    speaker: "speaker_content",
    rehearsal: "rehearsal",
    signage: "signage",
    material: "guest_material",
    cvent: "cvent_comparison"
  }[prefix] || prefix || "default";
};

const frontendUpdateFromRecord = (record = {}) => ({
  id: record.id,
  name: record.author_name || "Team update",
  topic: record.title || "",
  status: record.status || "Still To Be Resolved",
  priority: record.priority || "Normal",
  visibility: record.visibility || "Team",
  comment: record.body || "",
  notifySlack: Boolean(record.notify_slack),
  slackChannel: record.slack_channel || (record.notify_slack ? slackChannelFor(record.parent_id) : ""),
  slackStatus: record.slack_sent_at ? "Sent" : record.slack_error ? "Slack failed" : record.notify_slack ? "Queued" : "",
  timestamp: record.created_at ? new Date(record.created_at).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "",
  source: "backend"
});

async function loadSharedUpdates() {
  const base = backendApiBase();
  if (!base) return false;
  try {
    const response = await fetch(`${base}/api/updates`);
    if (!response.ok) throw new Error(`Updates API returned ${response.status}`);
    const result = await response.json();
    if (!result.ok || !Array.isArray(result.updates)) return false;
    const grouped = result.updates.reduce((acc, record) => {
      const id = record.parent_id;
      if (!id) return acc;
      acc[id] = [...(acc[id] || []), frontendUpdateFromRecord(record)];
      return acc;
    }, {});
    state.updates = { ...state.updates, ...grouped };
    updateStore.save(state.updates);
    return true;
  } catch (error) {
    console.warn("Shared updates are not available yet.", error);
    return false;
  }
}

async function saveSharedUpdate(parentId, update) {
  const base = backendApiBase();
  if (!base) throw new Error("Shared backend pending setup");
  const payload = {
    parent_type: parentTypeFor(parentId),
    parent_id: parentId,
    title: update.topic,
    body: update.comment,
    author_name: update.name,
    status: update.status,
    visibility: update.visibility,
    priority: update.priority,
    notify_slack: update.notifySlack,
    slack_channel: update.slackChannel,
    force_test_channel: Boolean(state.data?.meta?.slackTestMode),
    website_link: `${location.origin}${location.pathname}#${parentId}`
  };
  const response = await fetch(`${base}/api/updates`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) throw new Error(result.error || `Updates API returned ${response.status}`);
  return result;
}

const roundTableConfig = () => state.data?.roundTableSeatingPlan || {};
const seatingAssignmentsFromTables = (tables = []) => tables.flatMap((table) => (table.seats || []).map((seat) => ({ ...seat, table_number: Number(table.table_number), seat_number: Number(seat.seat_number) })));
const safeGuestLabel = (guest = {}) => [guest.name, guest.company_display_name || guest.company].filter(Boolean).join(" · ");

function roundTableSeedPlan() {
  const config = roundTableConfig();
  const assignments = asList(config.seedAssignments).map((seat) => ({
    table_number: Number(seat.table_number),
    seat_number: Number(seat.seat_number),
    guest_id: seat.guest_id || "",
    guest_name: seat.guest_name || "",
    guest_company: seat.guest_company || "",
    guest_category: seat.guest_category || "",
    dietary_flag: seat.dietary_flag || "",
    assignment_status: seat.assignment_status || "Guest Needed",
    notes: seat.notes || "",
    updated_by: seat.updated_by || "",
    updated_at: seat.updated_at || "",
    created_at: seat.created_at || ""
  }));
  return normalizeRoundTablePlan({
    event_id: "horizons_2026",
    source: "seed",
    shared: false,
    config: {
      layout_name: config.title || "HORIZONS Hall Round Table Layout",
      source_file: config.sourceFile || "Horizons - Farmers Market x80 V5.pdf",
      source_capacity: config.sourceLayoutCapacity || 80,
      working_table_count: config.tableCount || 10,
      working_seats_per_table: config.guestSlotsPerTable || 9,
      status: config.status || "Needs Assignment",
      seat_count_confirmation_status: config.seatCountStatus || "Needs Confirmation",
      notes: config.sourceNote || ""
    },
    assignments
  });
}

function normalizeRoundTablePlan(plan = {}) {
  const config = {
    layout_name: plan.config?.layout_name || roundTableConfig().title || "HORIZONS Hall Round Table Layout",
    source_file: plan.config?.source_file || roundTableConfig().sourceFile || "Horizons - Farmers Market x80 V5.pdf",
    source_capacity: Number(plan.config?.source_capacity || roundTableConfig().sourceLayoutCapacity || 80),
    working_table_count: Number(plan.config?.working_table_count || roundTableConfig().tableCount || 10),
    working_seats_per_table: Number(plan.config?.working_seats_per_table || roundTableConfig().guestSlotsPerTable || 9),
    status: plan.config?.status || roundTableConfig().status || "Needs Assignment",
    seat_count_confirmation_status: plan.config?.seat_count_confirmation_status || roundTableConfig().seatCountStatus || "Needs Confirmation",
    notes: plan.config?.notes || roundTableConfig().sourceNote || ""
  };
  const seed = asList(roundTableConfig().seedAssignments);
  const assignments = (plan.assignments?.length ? plan.assignments : seed).map((seat) => ({
    table_number: Number(seat.table_number || seat.tableNumber),
    seat_number: Number(seat.seat_number || seat.seatNumber),
    guest_id: seat.guest_id || seat.guestId || "",
    guest_name: seat.guest_name || seat.guestName || "",
    guest_company: seat.guest_company || seat.guestCompany || "",
    guest_category: seat.guest_category || seat.guestCategory || "",
    dietary_flag: seat.dietary_flag || seat.dietaryFlag || "",
    assignment_status: seat.assignment_status || seat.assignmentStatus || "Guest Needed",
    notes: seat.notes || "",
    updated_by: seat.updated_by || seat.updatedBy || "",
    updated_at: seat.updated_at || seat.updatedAt || "",
    created_at: seat.created_at || seat.createdAt || ""
  }));
  const byKey = new Map(assignments.map((seat) => [`${seat.table_number}-${seat.seat_number}`, seat]));
  const mergedAssignments = [];
  for (let tableNumber = 1; tableNumber <= config.working_table_count; tableNumber += 1) {
    for (let seatNumber = 1; seatNumber <= config.working_seats_per_table; seatNumber += 1) {
      mergedAssignments.push(byKey.get(`${tableNumber}-${seatNumber}`) || {
        table_number: tableNumber,
        seat_number: seatNumber,
        guest_id: "",
        guest_name: "",
        guest_company: "",
        guest_category: "",
        dietary_flag: "",
        assignment_status: "Guest Needed",
        notes: "",
        updated_by: "",
        updated_at: "",
        created_at: ""
      });
    }
  }
  const tables = Array.from({ length: config.working_table_count }, (_, index) => {
    const tableNumber = index + 1;
    const seats = mergedAssignments.filter((seat) => seat.table_number === tableNumber).sort((a, b) => a.seat_number - b.seat_number);
    const assigned = seats.filter((seat) => seat.guest_name && /assigned|reserved|confirmation/i.test(seat.assignment_status || "")).length;
    const latest = seats.map((seat) => seat.updated_at).filter(Boolean).sort().at(-1) || "";
    return {
      table_number: tableNumber,
      status: assigned ? assigned >= config.working_seats_per_table ? "Fully Assigned" : "In Progress" : "Needs Assignment",
      assigned_count: assigned,
      remaining_slots: Math.max(0, config.working_seats_per_table - assigned),
      notes: "",
      updated_at: latest,
      updated_by: seats.find((seat) => seat.updated_at === latest)?.updated_by || "",
      seats
    };
  });
  const latest = mergedAssignments.map((seat) => seat.updated_at).filter(Boolean).sort().at(-1) || "";
  return {
    ...plan,
    ok: plan.ok !== false,
    config,
    assignments: mergedAssignments,
    tables,
    summary: {
      table_count: config.working_table_count,
      seats_per_table: config.working_seats_per_table,
      working_slots: config.working_table_count * config.working_seats_per_table,
      source_capacity: config.source_capacity,
      assigned_count: mergedAssignments.filter((seat) => seat.guest_name && /assigned|reserved|confirmation/i.test(seat.assignment_status || "")).length,
      last_updated: latest
    }
  };
}

async function loadSharedSeatingPlan() {
  state.roundTablePlan = roundTableSeedPlan();
  state.roundTableStorageWarning = "";
  const base = backendApiBase();
  if (!base) {
    state.roundTableStorageWarning = "Shared seating storage unavailable. Changes are not saved yet.";
    return false;
  }
  try {
    const response = await fetch(`${base}/api/seating-plan`);
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok === false) throw new Error(result.error || `Seating API returned ${response.status}`);
    state.roundTablePlan = normalizeRoundTablePlan(result);
    state.roundTableStorageWarning = result.storage_warning || "";
    return true;
  } catch (error) {
    state.roundTableStorageWarning = `Shared seating storage unavailable. Changes are not saved yet. ${error.message}`;
    console.warn("Shared seating plan is not available yet.", error);
    return false;
  }
}

async function saveSharedSeatingPlan(plan, updatedBy = "Website") {
  const base = backendApiBase();
  if (!base) throw new Error("Shared seating storage unavailable. Changes are not saved yet.");
  const response = await fetch(`${base}/api/seating-plan`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      config: plan.config,
      assignments: plan.assignments,
      updated_by: updatedBy,
      action: "save_round_table_assignments"
    })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.ok === false) throw new Error(result.error || `Seating API returned ${response.status}`);
  state.roundTablePlan = normalizeRoundTablePlan(result);
  state.roundTableStorageWarning = result.storage_warning || "";
  return state.roundTablePlan;
}

const shouldAutoNotifySlack = (update = {}, id = "") => {
  const status = `${update.status} ${update.priority} ${id}`.toLowerCase();
  return /redflag|urgent|at risk|decision needed|critical|schedule timing|podcast timing|supplier timing|entertainment timing|cvent|weather warning|call sheet/.test(status);
};

const topicOptions = (topics = []) => topics.length ? `
  <label><span>Update topic</span><select name="topic">
    ${topics.map((topic) => `<option>${escapeHtml(topic)}</option>`).join("")}
  </select></label>` : "";

const updateModule = (id, topics = []) => {
  if (!id) return "";
  const updates = getUpdates(id);
  const activeUpdates = updates.filter((item) => !/resolved|archived|complete/i.test(item.status || ""));
  const archivedUpdates = updates.filter((item) => /resolved|archived|complete/i.test(item.status || ""));
  const latest = activeUpdates.at(-1) || updates.at(-1);
  const topicLabel = latest?.topic ? ` · ${latest.topic}` : "";
  const summary = latest ? `${activeUpdates.length || updates.length} active update${(activeUpdates.length || updates.length) === 1 ? "" : "s"} · Latest: ${latest.status}${topicLabel}` : "Add Team Update";
  const suggestedChannel = slackChannelFor(id);
  const channelOptions = slackChannelsForSelect(suggestedChannel).map((channel) => `<option value="${escapeHtml(channel)}" ${channel === suggestedChannel ? "selected" : ""}>${escapeHtml(channel)}</option>`).join("");
  const renderUpdate = (item, archived = false) => `
    <article class="update-item ${archived ? "is-archived" : ""}">
      <div class="update-meta">
        <strong>${escapeHtml(item.name)}</strong>
        <time>${escapeHtml(item.timestamp)}</time>
        ${item.topic ? `<span class="tag">${escapeHtml(item.topic)}</span>` : ""}
        ${tag(item.status)}
        ${item.slackChannel ? `<span class="tag">${escapeHtml(item.slackStatus || "Slack pending")}: ${escapeHtml(item.slackChannel)}</span>` : ""}
      </div>
      <p>${escapeHtml(item.comment)}</p>
      ${item.id ? `<div class="contact-actions update-actions">
        ${archived ? `<button type="button" data-update-action="reopen" data-update-id="${escapeHtml(item.id)}" data-parent-id="${escapeHtml(id)}">Reopen</button>` : `<button type="button" data-update-action="resolve" data-update-id="${escapeHtml(item.id)}" data-parent-id="${escapeHtml(id)}">Mark Resolved</button><button type="button" data-update-action="archive" data-update-id="${escapeHtml(item.id)}" data-parent-id="${escapeHtml(id)}">Archive</button>`}
      </div>` : ""}
    </article>
  `;
  return `
    <details class="updates-module" data-update-module="${escapeHtml(id)}">
      <summary><span>${escapeHtml(summary)}</span>${latest ? tag(latest.status) : ""}</summary>
      <div class="updates-list">
        ${activeUpdates.length ? activeUpdates.map((item) => renderUpdate(item)).join("") : `<p class="summary-hint">No active updates. Add a team update or open resolved history.</p>`}
        ${archivedUpdates.length ? `<details class="archive-block mini-archive"><summary><span>Resolved / archived history</span><span class="summary-hint">${archivedUpdates.length}</span></summary>${archivedUpdates.map((item) => renderUpdate(item, true)).join("")}</details>` : ""}
      </div>
      <form class="update-form" data-update-form="${escapeHtml(id)}">
        <label><span>Name</span><input required name="name" placeholder="Your name"></label>
        ${topicOptions(topics)}
        <label><span>Status</span><select name="status">${options().map((status) => `<option>${escapeHtml(status)}</option>`).join("")}</select></label>
        <label><span>Priority</span><select name="priority"><option>Normal</option><option>Important</option><option>Urgent</option><option>Critical</option></select></label>
        <label><span>Visibility</span><select name="visibility"><option>Team</option><option>Leadership</option><option>Private</option><option>Admin</option></select></label>
        <label><span>Comment/update</span><textarea required name="comment" placeholder="Add a concise update"></textarea></label>
        <label><span>Notify Slack channel</span><select name="slackChannel">${channelOptions}</select></label>
        <label class="checkbox-row"><input type="checkbox" name="notifySlack" value="true"><span>Notify Slack <em>${state.data?.meta?.slackTestMode ? `Send to ${escapeHtml(suggestedChannel)}. Production Slack channels remain pending setup.` : `Suggested channel: ${escapeHtml(suggestedChannel)}. You can change this before sending.`}</em></span></label>
        <button class="button button-secondary" type="submit">Save Team Update</button>
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
  const { status, day, owner, location, department } = state.filters;
  if (status && !text(fields.status || item.status).toLowerCase().includes(status.toLowerCase())) return false;
  if (day && !text(fields.day || item.day || item.date || item.dayLabel).toLowerCase().includes(day.toLowerCase())) return false;
  if (owner && !ownerMatches(fields.owner || item.owner || item.person || item.internalOwner || item.lead, owner)) return false;
  if (location && !text(fields.location || item.location || item.locationName).toLowerCase().includes(location.toLowerCase())) return false;
  if (department && !text(fields.department || item.department).toLowerCase().includes(department.toLowerCase())) return false;
  return true;
};

const passesLocal = (item, filters, fieldMap) => Object.entries(filters).every(([key, value]) => {
  if (!value) return true;
  const field = fieldMap[key] || key;
  const candidate = typeof field === "function" ? field(item) : item[field];
  if (/owner|person|lead|contact/i.test(key)) return ownerMatches(candidate, value);
  return displayName(candidate).toLowerCase().includes(displayName(value).toLowerCase());
});

async function init() {
  const response = await fetch(`content.json?v=${APP_VERSION}`);
  state.data = await response.json();
  state.updates = updateStore.load();
  await loadSharedUpdates();
  await loadSharedSeatingPlan();
  state.captureSuggestions = suggestionStore.load();
  state.captureLog = [...(state.data.captureLog || []), ...captureLogStore.load()];
  state.dismissedCaptureSuggestions = dismissedSuggestionStore.load();
  state.activeDay = state.data.today.date || state.data.dailyRunSheets?.[0]?.day || "";
  state.activeCallSheetDay = state.activeDay;
  state.activeContentDay = state.activeDay;
  state.activeSwagSchedule = state.data.swagQueensSchedule?.[0]?.day || "";
  setupAppGroups();
  renderEvent();
  renderFilters();
  renderAll();
  bindEvents();
  loadLiveWeather();
  startCountdown();
  startNowNext();
  setupSectionNavigation();
  setupBackToTopAndAdmin();
  const restoreHashTarget = () => {
    const targetId = (location.hash || "").replace("#", "");
    setActiveGroupForTarget(targetId || "overview");
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView();
    window.HORIZONS_UPDATE_SECTION_NAV?.();
  };
  requestAnimationFrame(restoreHashTarget);
  setTimeout(restoreHashTarget, 350);
  setTimeout(restoreHashTarget, 1000);
}

function setupAppGroups() {
  const main = $("#main");
  if (!main) return;
  APP_GROUPS.forEach((group) => {
    group.sections.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      section.dataset.appGroup = group.id;
      section.dataset.appGroupLabel = group.label;
      main.appendChild(section);
    });
  });
  APP_GROUPS.forEach((group) => {
    const lead = document.getElementById(group.target);
    const container = lead?.querySelector(".container");
    if (!container || container.querySelector("[data-app-subnav]")) return;
    const links = group.sections
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .map((section) => {
        const label = section.querySelector("h2")?.textContent || section.dataset.appGroupLabel || section.id;
        return `<a href="#${escapeHtml(section.id)}">${escapeHtml(label)}</a>`;
      }).join("");
    if (links) container.insertAdjacentHTML("afterbegin", `<nav class="app-subnav" data-app-subnav aria-label="${escapeHtml(group.label)} shortcuts">${links}</nav>`);
  });
  setActiveGroupForTarget((location.hash || "#overview").replace("#", ""));
  document.body.classList.add("app-compressed");
}

function setActiveGroupForTarget(targetId = "overview") {
  const targetGroup = groupBySection[targetId] || APP_GROUPS.find((group) => group.id === targetId)?.id || "overview";
  document.body.dataset.activeGroup = targetGroup;
  document.body.classList.toggle("admin-view", targetGroup === "admin" || ["cvent", "missing-files", "asset-review", "slack", "data-health", "duplicate-review", "site-audit"].includes(targetId));
  $$("[data-app-nav]").forEach((link) => link.classList.toggle("is-active", link.dataset.appNav === targetGroup));
  $$("[data-app-subnav] a").forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${targetId}`));
}

function renderEvent() {
  const { event, quickActions } = state.data;
  const eventTitle = $("[data-event-title]");
  if (eventTitle) eventTitle.textContent = event.name;
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
    ["Open Today", state.data.today?.focus || "Current event-day priorities", "#today"],
    ["Open Call Sheet", state.activeCallSheetDay || "Daily production view", "#call-sheet"],
    ["Who Do I Call", "Escalation guide by problem", "#who-do-i-call"],
    ["Locations", "Open maps and venue pins", "#locations"],
    ["Red Flags", state.data.redFlags?.[0]?.issue || "No critical red flag listed", "#red-flags"],
    ["Guests", `${(state.data.guests || []).length} safe guest records`, "#guests"],
    ["Menus", `${(state.data.menus || []).length} final menu cards`, "#menus"],
    ["Assets", "Swag, room drops, signage, documents", "#menus"]
  ];
  setHtml("[data-start-grid]", startCards.map(([title, detail, href]) => `<a class="start-card" href="${href}"><strong>${title}</strong><span>${detail}</span></a>`).join(""));
  $("[data-capture-storage-copy]") && ($("[data-capture-storage-copy]").textContent = backendApiBase()
    ? "Quick live ideas for the content team. Capture suggestions are saved to the shared event system."
    : "Quick live ideas for the content team. Capture suggestions are saved on this device until shared capture storage is enabled.");
}

function renderFilters() {
  const d = state.data;
  const statusValues = unique([...d.schedule, ...d.tasks, ...d.suppliers, ...d.contentCapture, ...d.decisions, ...(d.travel || [])].map((x) => x.status));
  const dayValues = unique([...d.dailyRunSheets.map((x) => x.day), ...d.schedule.map((x) => x.dayLabel || x.date), ...d.tasks.map((x) => x.day), ...d.suppliers.map((x) => x.day), ...d.contentCapture.map((x) => x.day), ...(d.travel || []).map((x) => x.arrivalDate || x.departureDate)]);
  const ownerValues = ownerOptionValues([...d.schedule.map((x) => x.owner), ...d.tasks.map((x) => x.person), ...d.suppliers.map((x) => x.internalOwner), ...d.contentCapture.map((x) => x.lead), ...d.contacts.map((x) => x.name), ...(d.travel || []).map((x) => x.person)]);
  const locationValues = unique([...d.schedule.map((x) => x.location), ...d.tasks.map((x) => x.location), ...d.suppliers.map((x) => x.location), ...d.locations.map((x) => x.locationName), ...d.contentCapture.map((x) => x.location), ...(d.travel || []).map((x) => x.arrivalAirport), ...(d.travel || []).map((x) => x.departureAirport)]);
  const departmentValues = unique(d.meta.departments || [...d.schedule, ...d.tasks, ...d.suppliers, ...d.contentCapture].map((x) => x.department));
  buildOptions($('[data-filter="status"]'), statusValues, "statuses");
  buildOptions($('[data-filter="day"]'), dayValues, "days");
  buildOptions($('[data-filter="owner"]'), ownerValues, "owners");
  buildOptions($('[data-filter="location"]'), locationValues, "locations");
  buildOptions($('[data-filter="department"]'), departmentValues, "departments");
  buildOptions($('[data-task-filter="department"]'), departmentValues, "departments");
  buildOptions($('[data-task-filter="owner"]'), ownerOptionValues(d.tasks.map((x) => x.person)), "names");
  buildOptions($('[data-task-filter="day"]'), dayValues, "days");
  buildOptions($('[data-task-filter="status"]'), statusValues, "statuses");
  buildOptions($('[data-task-filter="location"]'), locationValues, "locations");
  buildOptions($('[data-travel-filter="person"]'), unique((d.travel || []).map((x) => x.person)), "people");
  buildOptions($('[data-travel-filter="arrivalDay"]'), unique((d.travel || []).map((x) => x.arrivalDate)), "arrival days");
  buildOptions($('[data-travel-filter="departureDay"]'), unique((d.travel || []).map((x) => x.departureDate)), "departure days");
  buildOptions($('[data-travel-filter="team"]'), unique((d.travel || []).map((x) => x.team)), "teams");
  buildOptions($('[data-travel-filter="status"]'), unique((d.travel || []).map((x) => x.status)), "statuses");
  const podcastFilterItems = liveItems(d.podcast || []);
  buildOptions($('[data-podcast-filter="day"]'), unique(podcastFilterItems.map((x) => x.day || x.date)), "days");
  buildOptions($('[data-podcast-filter="guest"]'), unique(podcastFilterItems.flatMap((x) => [x.guest, x.guestSubject, x.guest_1, x.guest_2])), "guests");
  buildOptions($('[data-podcast-filter="status"]'), unique(podcastFilterItems.map((x) => x.status)), "statuses");
  buildOptions($('[data-podcast-filter="location"]'), unique(podcastFilterItems.map((x) => x.location)), "locations");
  buildOptions($('[data-content-filter="owner"]'), ownerOptionValues(d.contentCapture.map((x) => x.lead)), "people");
  buildOptions($('[data-content-filter="day"]'), unique(d.contentCapture.map((x) => x.day)), "days");
  buildOptions($('[data-content-filter="department"]'), departmentValues, "departments");
  buildOptions($('[data-content-filter="location"]'), unique(d.contentCapture.map((x) => x.location)), "locations");
  buildOptions($('[data-content-filter="priority"]'), unique(d.contentCapture.map((x) => x.priority)), "priorities");
  buildOptions($('[data-content-filter="status"]'), unique(d.contentCapture.map((x) => x.status)), "statuses");
  const guests = d.guests || [];
  buildOptions($('[data-guest-filter="company"]'), unique(guests.map((x) => x.company_display_name || x.company)), "companies");
  buildOptions($('[data-guest-filter="status"]'), unique(guests.map((x) => x.status)), "statuses");
  buildOptions($('[data-guest-filter="missing"]'), unique(guests.flatMap((x) => x.missing_fields || [])), "missing fields");
  const attendees = d.attendeeDirectory?.records || [];
  buildOptions($('[data-attendee-filter="category"]'), unique(attendees.map((x) => x.category)), "categories");
  buildOptions($('[data-attendee-filter="company"]'), unique(attendees.map((x) => x.company)), "companies");
  const menus = d.menus || [];
  buildOptions($('[data-menu-filter="date"]'), unique(menus.map((x) => x.date)), "dates");
  buildOptions($('[data-menu-filter="location"]'), unique(menus.map((x) => x.location)), "locations");
  buildOptions($('[data-menu-filter="meal"]'), unique(menus.map((x) => x.meal_type)), "meal types");
}

function searchResultGroups() {
  const d = state.data || {};
  return [
    ["Schedule", "#schedule", d.schedule || [], (item) => [item.timeDisplay || item.timeStart, item.title].filter(Boolean).join(" · "), (item) => [item.dayLabel || item.date, item.location, item.owner].filter(Boolean).join(" · ")],
    ["Call Sheet", "#call-sheet", d.schedule || [], (item) => [item.timeDisplay || item.timeStart, item.title].filter(Boolean).join(" · "), (item) => [item.dayLabel || item.date, item.location, item.department].filter(Boolean).join(" · ")],
    ["Contacts", "#contacts", d.contacts || [], (item) => item.name, (item) => [item.company, item.role || item.responsibility].filter(Boolean).join(" · ")],
    ["Who Do I Call", "#who-do-i-call", d.whoDoICall || [], (item) => item.situation, (item) => [item.primaryContact, item.notes].filter(Boolean).join(" · ")],
    ["Locations", "#locations", d.locations || [], (item) => item.locationName, (item) => [item.type, item.keyOwner, item.status].filter(Boolean).join(" · ")],
    ["Guests", "#guests", d.guests || [], (item) => item.name || item.namecard_display_name, (item) => [item.company_display_name || item.company, item.lanyard_colour, item.status].filter(Boolean).join(" · ")],
    ["Attendee Directory", "#attendee-directory", d.attendeeDirectory?.records || [], (item) => item.name, (item) => [item.company, item.category, item.status].filter(Boolean).join(" · ")],
    ["Menus", "#menus", d.menus || [], (item) => item.title || item.menu_type, (item) => [item.date, item.location, item.meal_type].filter(Boolean).join(" · ")],
    ["Podcast", "#podcast", d.podcast || [], (item) => item.session || item.title, (item) => [item.date || item.day, item.recording_time || item.time, item.guest_1 || item.guest].filter(Boolean).join(" · ")],
    ["Suppliers", "#suppliers", d.suppliers || [], (item) => item.supplierName || item.name, (item) => [item.company, item.internalOwner, item.location].filter(Boolean).join(" · ")],
    ["Documents", "#documents", d.documents || [], (item) => item.title, (item) => [item.category, item.owner, item.status].filter(Boolean).join(" · ")],
    ["Assets", "#swag", d.swag || [], (item) => item.itemName || item.title, (item) => [item.category, item.location, item.owner].filter(Boolean).join(" · ")]
  ];
}

function renderSearchResults() {
  const panel = $("[data-search-results]");
  if (!panel) return;
  const query = text(state.searchQuery);
  if (!query) {
    panel.hidden = true;
    panel.innerHTML = "";
    return;
  }
  const results = searchResultGroups().flatMap(([section, href, items, titleFn, summaryFn]) => liveItems(items)
    .filter((item) => includes(item, query))
    .slice(0, 4)
    .map((item) => ({
      section,
      href,
      title: firstMeaningful(titleFn(item), section),
      summary: firstMeaningful(summaryFn(item), "Open matching section"),
      status: item.status || item.priority || item.category || ""
    }))).slice(0, 24);
  panel.hidden = false;
  panel.innerHTML = `
    <div class="search-results-head">
      <strong>Search results</strong>
      <span>${escapeHtml(results.length ? `${results.length} quick match${results.length === 1 ? "" : "es"}` : "No quick matches")}</span>
    </div>
    ${results.length ? `<div class="search-results-grid">${results.map((result) => `
      <a class="search-result-card" href="${escapeHtml(result.href)}">
        <span>${escapeHtml(result.section)}</span>
        <strong>${escapeHtml(displayName(result.title))}</strong>
        <em>${escapeHtml(displayName(result.summary))}</em>
        ${result.status ? tag(result.status) : ""}
      </a>
    `).join("")}</div>` : `<div class="empty-state">No results for “${escapeHtml(query)}”. Try a person, company, location, menu, guest, or task.</div>`}
  `;
}

function renderAll() {
  renderSearchResults();
  renderToday();
  renderRedFlags();
  renderScheduleTabs();
  renderSchedule();
  renderNowNext();
  renderWeather();
  renderCallSheetTabs();
  renderCallSheet();
  renderLocationSchedules();
  renderRestaurants();
  renderMenus();
  renderTravel();
  renderDepartmentTabs();
  renderDepartmentFocus();
  renderDailyRuns();
  renderTasks();
  renderContactTabs();
  renderContacts();
  renderGuests();
  renderAttendeeDirectory();
  renderWhoDoICall();
  renderLocations();
  renderSuppliers();
  renderPodcast();
  renderEntertainment();
  renderPlaylists();
  renderContentDayTabs();
  renderContentCapture();
  renderCaptureSuggestions();
  renderCaptureLog();
  renderWorkstreams();
  renderHorizonsHouse();
  renderRoomDrops();
  renderSwagDelivery();
  renderSwagSchedule();
  renderSwag();
  renderSpeakers();
  renderRehearsals();
  renderArtwork();
  renderStaffLists();
  renderCventComparison();
  renderMissingFiles();
  renderSlackIntegration();
  renderDataHealth();
  renderDuplicateReview();
  renderSiteAudit();
  renderDecisions();
  renderDocumentTabs();
  renderDocuments();
  renderCompleted();
}

function renderToday() {
  const { today } = state.data;
  const eventDay = getCurrentEventDay();
  const selectedDay = eventDay || getNextEventDay() || state.activeDay || today.date;
  const now = madridNow();
  const hour = now.getHours();
  const currentPeriod = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : hour < 22 ? "Evening" : "Late Night";
  const dayItems = liveItems(state.data.schedule)
    .filter((item) => (item.dayLabel || item.date) === selectedDay)
    .map((item) => ({ ...item, startMinutes: parseTimeMinutes(item.timeStart || item.timeDisplay) }))
    .sort((a, b) => (a.startMinutes ?? 9999) - (b.startMinutes ?? 9999));
  const nowMinutes = hour * 60 + now.getMinutes();
  const nextItems = (eventDay === selectedDay
    ? dayItems.filter((item) => (item.startMinutes ?? 9999) >= nowMinutes)
    : dayItems
  ).slice(0, 5);
  const topRedFlag = liveItems(state.data.redFlags).find((item) => /risk|problem|confirmation|needed/i.test(`${item.status} ${item.priority}`));
  const mainLocation = unique(nextItems.map((item) => item.location)).slice(0, 2).join(", ");
  const blocks = [
    ["Today", selectedDay || today.date, eventDay ? "On Track" : "Needs Confirmation", [eventDay ? `${currentPeriod} operating view` : "Event has not started yet. Showing the next event day."]],
    ["Next up", "Next 3-5 key actions", "", nextItems.map((item) => `${item.timeDisplay || "Time needed"} · ${item.title}`)],
    ["Main location", mainLocation || "Location needed", "", nextItems.slice(0, 3).map((item) => item.location).filter(Boolean)],
    ["Watch-out", topRedFlag?.issue || "No active red flag listed", topRedFlag?.status || "Watch", [topRedFlag?.whyItMatters || today.criticalItems?.[0]].filter(Boolean)],
    ["Full run sheet", "Open the detailed daily view", "", [`${selectedDay} schedule and call sheet are available below.`]]
  ];
  setHtml("[data-today]", blocks.map(([title, intro, status, bullets], index) => card({
    title,
    status,
    body: `<p>${escapeHtml(intro)}</p>${list(bullets)}`,
    updateId: `today:${index}-${slug(title)}`
  })).join(""));
}

function renderRedFlags() {
  const items = liveItems(state.data.redFlags).filter((item) => passesGlobal(item, { status: item.status, owner: item.owner, updateId: item.updateId }));
  setHtml("[data-red-flags]", items.map((item) => card({
    title: item.issue,
    status: item.status || item.priority,
    body: `<p>${escapeHtml(item.whyItMatters)}</p>`,
    metadata: meta("Priority", item.priority) + meta("Owner", item.owner) + meta("Decision needed", item.decisionNeeded) + meta("Notes", item.notes),
    footer: `<div class="contact-actions"><button type="button" data-copy-slack-summary="${escapeHtml(item.updateId || item.issue)}">Copy Slack Update</button><a href="#slack">Slack setup</a></div>`,
    updateId: item.updateId
  })).join("") || empty("No red flags match the current filters."));
}

function renderScheduleTabs() {
  setHtml("[data-schedule-tabs]", state.data.dailyRunSheets.map((day, index) => {
    const label = dayLabelShort(day.day) || `Day ${index + 1}`;
    const current = getCurrentEventDay() === day.day;
    return `<button class="tab-button ${current ? "is-current-day" : ""}" type="button" role="tab" aria-selected="${day.day === state.activeDay}" data-day-tab="${escapeHtml(day.day)}">${escapeHtml(label)}${current ? `<span>Today</span>` : ""}</button>`;
  }).join(""));
}

const dayDateMap = {
  "Saturday 6 June": "2026-06-06",
  "Sunday 7 June": "2026-06-07",
  "Monday 8 June": "2026-06-08",
  "Tuesday 9 June": "2026-06-09",
  "Wednesday 10 June": "2026-06-10",
  "Thursday 11 June": "2026-06-11",
  "Friday 12 June": "2026-06-12"
};

const madridNow = () => new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" }));
const parseTimeMinutes = (value = "") => {
  const match = text(value).match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const meridiem = text(match[3]).toUpperCase();
  if (meridiem === "PM" && hour < 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return hour * 60 + Number(match[2] || 0);
};
const getCurrentEventDay = () => {
  const now = madridNow();
  const iso = now.toISOString().slice(0, 10);
  return Object.entries(dayDateMap).find(([, date]) => date === iso)?.[0] || "";
};
const getNextEventDay = () => {
  const now = madridNow();
  const todayIso = now.toISOString().slice(0, 10);
  return Object.entries(dayDateMap).find(([, date]) => date >= todayIso)?.[0] || Object.keys(dayDateMap)[0] || "";
};
const schedulePosition = (day = state.activeDay) => {
  const now = madridNow();
  const today = getCurrentEventDay();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const items = liveItems(state.data.schedule)
    .filter((item) => (item.dayLabel || item.date) === day)
    .map((item) => ({ ...item, startMinutes: parseTimeMinutes(item.timeStart || item.timeDisplay) }))
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

const weatherCodeLabel = (code) => {
  const value = Number(code);
  if (value === 0) return "Clear sky";
  if ([1, 2, 3].includes(value)) return "Mainly clear / partly cloudy";
  if ([45, 48].includes(value)) return "Fog";
  if ([51, 53, 55].includes(value)) return "Drizzle";
  if ([61, 63, 65].includes(value)) return "Rain";
  if ([71, 73, 75].includes(value)) return "Snow";
  if ([80, 81, 82].includes(value)) return "Rain showers";
  if (value === 95) return "Thunderstorm";
  return "Weather update";
};

function formatWeatherTime(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" });
  } catch {
    return value;
  }
}

function renderWeather(live = null) {
  const weather = live || state.data.weather || {};
  const current = live?.current;
  const daily = live?.daily;
  const dayIndex = 0;
  const temperature = current ? `${Math.round(current.temperature_2m)}°C` : weather.temperature;
  const condition = current ? weatherCodeLabel(current.weather_code) : weather.status;
  const wind = current ? `${Math.round(current.wind_speed_10m)} km/h` : weather.wind;
  const rain = daily?.precipitation_probability_max ? `${daily.precipitation_probability_max[dayIndex]}%` : weather.rainChance;
  const highLow = daily?.temperature_2m_max ? `${Math.round(daily.temperature_2m_max[dayIndex])}°C / ${Math.round(daily.temperature_2m_min[dayIndex])}°C` : "";
  const sunrise = daily?.sunrise ? formatWeatherTime(daily.sunrise[dayIndex]) : weather.sunrise;
  const sunset = daily?.sunset ? formatWeatherTime(daily.sunset[dayIndex]) : weather.sunset;
  const updated = live?.fetchedAt ? new Date(live.fetchedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Madrid" }) : "";
  setHtml("[data-weather]", `
    <div>
      <span class="eyebrow">Weather</span>
      <strong>${escapeHtml(weather.location || "Six Senses Ibiza / Ibiza")}</strong>
      <p>${escapeHtml([temperature, condition].filter(Boolean).join(" · ") || "Loading live weather")}</p>
    </div>
    <div class="meta-list compact-meta">
      ${meta("High / low", highLow)}
      ${meta("Wind", wind)}
      ${meta("Chance of rain", rain)}
      ${meta("Sunrise", sunrise)}
      ${meta("Sunset", sunset)}
      ${meta("Last updated", updated)}
    </div>
    <p>${escapeHtml(live ? "Good for operational planning. Drone/sunset capture remains subject to venue and drone approval." : (weather.operationalNote || "Weather currently unavailable. Please check closer to the event."))}</p>
  `);
}

async function loadLiveWeather() {
  const weather = state.data.weather || {};
  const latitude = weather.latitude;
  const longitude = weather.longitude;
  if (!latitude || !longitude) return;
  const cached = weatherStore.load();
  const ttl = Number(weather.cacheMinutes || 45) * 60 * 1000;
  if (cached?.fetchedAt && Date.now() - cached.fetchedAt < ttl) {
    renderWeather(cached);
    return;
  }
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: "temperature_2m,weather_code,wind_speed_10m",
    daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset",
    timezone: weather.timezone || "Europe/Madrid"
  });
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
    if (!response.ok) throw new Error(`Weather API returned ${response.status}`);
    const live = await response.json();
    live.location = weather.location || "Six Senses Ibiza / Ibiza";
    live.fetchedAt = Date.now();
    weatherStore.save(live);
    renderWeather(live);
  } catch (error) {
    console.warn("Weather currently unavailable", error);
    setHtml("[data-weather]", `
      <div>
        <span class="eyebrow">Weather</span>
        <strong>${escapeHtml(weather.location || "Six Senses Ibiza / Ibiza")}</strong>
        <p>Weather currently unavailable. Please check closer to the event.</p>
      </div>
    `);
  }
}

function renderSchedule() {
  const items = liveItems(state.data.schedule)
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
        <div class="meta-list">${meta("Location", item.location)}${meta("Owner", item.owner)}${meta("Person involved", item.personInvolved)}${meta("Seating layout", item.seatingLayout)}${meta("Layout status", item.layoutStatus)}</div>
        ${detailsBlock("More details", [["Category", item.category], ["Support", item.support], ["Department", item.department], ["Priority", normalizePriority(item.priority)], ["Workstream", item.workstream], ["Source", item.source]], `${item.notes && item.notes !== item.shortDescription ? `<p>${escapeHtml(item.notes)}</p>` : ""}${layoutLinks(item.relatedLayoutIds)}${item.roundTableSeatingPlanId ? `<div class="contact-actions"><a href="#locations">Open round table seating plan</a></div>` : ""}`)}
        ${updateModule(item.updateId)}
      </div>
    </article>
  `).join("") || empty("No schedule items match the current filters for this day."));
}

function renderCallSheetTabs() {
  const today = getCurrentEventDay() || getNextEventDay() || state.activeCallSheetDay;
  const todayButton = `<button class="tab-button call-sheet-today" type="button" role="tab" aria-selected="${today === state.activeCallSheetDay}" data-call-sheet-tab="${escapeHtml(today)}">Today <span>${escapeHtml(today.split(" ")[0] || "")}</span></button>`;
  setHtml("[data-call-sheet-tabs]", todayButton + state.data.dailyRunSheets.map((day, index) => {
    const label = dayLabelShort(day.day) || `Day ${index + 1}`;
    const current = getCurrentEventDay() === day.day;
    return `<button class="tab-button ${current ? "is-current-day" : ""}" type="button" role="tab" aria-selected="${day.day === state.activeCallSheetDay}" data-call-sheet-tab="${escapeHtml(day.day)}">${escapeHtml(label)}${current ? `<span>Today</span>` : ""}</button>`;
  }).join(""));
}

function mapLink(item = {}) {
  const url = text(item.googleMapsUrl);
  if (!url || url === "Google Maps Link Needed") return `<span class="tag tag-waiting">Google Maps Link Needed</span>`;
  return `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">Open in Google Maps</a>`;
}

function renderCallSheet() {
  const sheet = (state.data.callSheets || []).find((item) => item.day === state.activeCallSheetDay) || {};
  const emergency = (state.data.locations || []).find((item) => item.id === sheet.hospitalLocationId) || (state.data.locations || []).find((item) => item.emergencyRelevance);
  const position = schedulePosition(state.activeCallSheetDay);
  const nowMinutes = position.now.getHours() * 60 + position.now.getMinutes();
  const isToday = position.today === state.activeCallSheetDay;
  const items = liveItems(state.data.schedule)
    .filter((item) => (item.dayLabel || item.date) === state.activeCallSheetDay)
    .filter((item) => passesGlobal(item, { status: item.status, day: item.dayLabel || item.date, owner: item.owner, location: item.location, department: item.department, updateId: item.updateId }))
    .map((item) => ({ ...item, startMinutes: parseTimeMinutes(item.timeStart || item.timeDisplay) }))
    .sort((a, b) => (a.startMinutes ?? 9999) - (b.startMinutes ?? 9999))
    .slice(0, 120);
  setHtml("[data-call-sheet-summary]", card({
    title: sheet.title || `${state.activeCallSheetDay} Call Sheet`,
    status: sheet.status || "Needs Confirmation",
    body: `<p>${escapeHtml(sheet.dailyFocus || "Daily focus needed")}</p>`,
    metadata: meta("Crew call", sheet.crewCallTime) + meta("Main location", sheet.mainLocation) + meta("Key contacts", sheet.keyContacts),
    footer: `<div class="contact-actions"><button type="button" data-print-call-sheet>Print Call Sheet</button><button type="button" data-copy-call-sheet>Copy Slack Summary</button>${sheet.roundTableSeatingPlanId ? `<a href="#locations">Open round table seating plan</a><button type="button" data-round-table-print>Print seating plan</button>` : ""}<a href="#who-do-i-call">Who Do I Call</a></div>`,
    updateId: sheet.id || `call-sheet:${slug(state.activeCallSheetDay)}`
  }));
  setHtml("[data-call-sheet-emergency]", card({
    title: "Emergency / Medical",
    status: emergency?.status || "Needs Confirmation",
    body: `<p>${escapeHtml(sheet.emergencyNotes || "Emergency medical information needs confirmation.")}</p>`,
    metadata: meta("Nearest medical location", emergency?.locationName) + meta("Address", emergency?.address) + meta("Travel time", emergency?.travelTimeFromVenue) + meta("Emergency number", "112 / venue protocol TBC") + meta("Key onsite contact", "Dawn Ramsden / Pili Lopez"),
    footer: `<div class="contact-actions">${mapLink(emergency)}<a href="#locations">Open Locations</a><a href="#who-do-i-call">Emergency contacts</a></div>`,
    updateId: emergency?.updateId || "location:emergency-medical"
  }));
  setHtml("[data-call-sheet-notes]", [
    ["Production notes", sheet.productionNotes],
    ["Supplier notes", sheet.supplierNotes],
    ["Entertainment notes", sheet.entertainmentNotes],
    ["Podcast notes", sheet.podcastNotes],
    ["Transport notes", sheet.transportNotes],
    ["Food / meal notes", sheet.mealNotes],
    ["Location notes", sheet.locationNotes]
  ].map(([title, value]) => `<details class="details note-detail"><summary><span>${escapeHtml(title)}</span>${tag(/needed|confirmation|tbc/i.test(value || "") ? "Needs Confirmation" : "Reference")}</summary><div class="details-content"><p>${escapeHtml(value || "Notes needed")}</p>${updateModule(`call-sheet-note:${slug(state.activeCallSheetDay)}:${slug(title)}`)}</div></details>`).join(""));
  setHtml("[data-call-sheet-links]", [
    card({ title: "Documents / links", status: sheet.documents?.length ? "Reference" : "File Needed", body: list(sheet.documents) || "<p>Call sheet documents still need linking.</p>", updateId: `call-sheet-docs:${slug(state.activeCallSheetDay)}` }),
    card({ title: "Linked final menus", status: sheet.linkedMenuIds?.length ? "Final" : "Needs Confirmation", body: sheet.linkedMenuIds?.length ? `<p>${escapeHtml(sheet.linkedMenuIds.length)} final menu${sheet.linkedMenuIds.length === 1 ? "" : "s"} linked for this day.</p>` : "<p>No final menus linked to this call sheet day yet.</p>", footer: sheet.linkedMenuIds?.length ? `<div class="contact-actions"><a href="#menus">Open Menus</a></div>` : "", updateId: `call-sheet-menus:${slug(state.activeCallSheetDay)}` }),
    card({ title: "Red flags for this day", status: sheet.redFlags?.length ? "Watch" : "On Track", body: list(sheet.redFlags) || "<p>No day-specific red flags listed.</p>", updateId: `call-sheet-redflags:${slug(state.activeCallSheetDay)}` }),
    card({ title: "Missing files for this day", status: sheet.missingFiles?.length ? "File Needed" : "On Track", body: list(sheet.missingFiles) || "<p>No day-specific missing files listed.</p>", updateId: `call-sheet-missing:${slug(state.activeCallSheetDay)}` })
  ].join(""));
  let nowLineRendered = false;
  setHtml("[data-call-sheet]", `${items.map((item) => {
    const past = isToday && item.startMinutes !== null && item.startMinutes < nowMinutes && item.updateId !== position.current?.updateId;
    const current = item.updateId === position.current?.updateId;
    const next = item.updateId === position.next?.updateId;
    const showNowLine = isToday && !nowLineRendered && (current || next);
    if (showNowLine) nowLineRendered = true;
    return `${showNowLine ? `<div class="now-line"><span>Now · ${escapeHtml(position.now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" }))}</span></div>` : ""}
      <article class="call-sheet-item ${past ? "is-past" : ""} ${current ? "is-now" : ""} ${next ? "is-next" : ""}">
        <div class="timeline-time">${escapeHtml(item.timeDisplay || item.timeStart || "TBC")}</div>
        <div>
          <div class="card-header">
            <h3>${escapeHtml(item.title)}</h3>
            <div class="tag-stack">${current ? tag("Now") : ""}${next ? tag("Next") : ""}${tag(item.status)}${item.priority ? tag(normalizePriority(item.priority), "priority-tag") : ""}</div>
          </div>
          <div class="meta-list compact-meta">${meta("Location", item.location)}${meta("Owner", item.owner)}${meta("Department", item.department || item.category)}</div>
          ${detailsBlock("Call sheet details", [["Support/team", item.support], ["Category", item.category], ["Supplier", item.relatedSupplier], ["Content capture", item.relatedContentCapture], ["Status", normalizeLabel(item.status)], ["Notes", item.notes]], `${layoutLinks(item.relatedLayoutIds)}${item.roundTableSeatingPlanId ? `<div class="contact-actions"><a href="#locations">Open round table seating plan</a></div>` : ""}`)}
          ${updateModule(item.updateId)}
        </div>
      </article>
    `;
  }).join("") || empty("No call sheet items match the current filters for this day.")}`);
}

function renderLocationSchedules() {
  const schedules = state.data.locationSchedules || [];
  setHtml("[data-location-schedules]", (state.data.locations || []).map((location) => {
    const items = schedules
      .filter((item) => item.locationId === location.id || item.locationName === location.locationName || includes(item, location.locationName))
      .slice(0, 36);
    const grouped = groupBy(items, (item) => item.day);
    const details = items.length ? `<div class="location-schedule grouped-schedule">${Object.entries(grouped).map(([day, rows]) => `
      <details class="details schedule-day-group">
        <summary><span>${escapeHtml(dayLabelShort(day))}</span><span class="summary-hint">${rows.length} item${rows.length === 1 ? "" : "s"}</span></summary>
        <div class="details-content">
          ${rows.map((item) => `
            <div class="supplier-time-block">
              <strong>${escapeHtml(item.timeDisplay || item.timeStart || "Time needed")}</strong>
              <p>${escapeHtml(item.activity)}</p>
              <div class="meta-list compact-meta">
                ${meta("Who is present", item.whoIsPresent)}
                ${meta("Owner", item.owner)}
                ${meta("Clownfish show operatives", item.showOperatives)}
                ${meta("Content / topic", item.contentTopic)}
                ${meta("Setup", item.setupRequirements)}
                ${meta("Status", item.status)}
              </div>
              ${item.notes ? `<p>${escapeHtml(item.notes)}</p>` : ""}
              ${updateModule(item.updateId)}
            </div>
          `).join("")}
        </div>
      </details>
    `).join("")}</div>` : `<div class="image-placeholder"><strong>Schedule needed</strong><span>No location-specific schedule items have been confirmed for this space yet.</span></div>`;
    return card({
      title: location.locationName,
      status: location.status,
      body: `<p>${escapeHtml(location.primaryUse)}</p>`,
      metadata: meta("Main day(s)", location.mainDays) + meta("Key owner", location.keyOwner) + meta("Watch-out", location.watchOut),
      footer: `<div class="contact-actions">${mapLink(location)}</div>${detailsBlock("Open location schedule", [], details)}`,
      updateId: location.updateId || `location:${slug(location.locationName)}`
    });
  }).join("") || empty("No location schedules available yet."));
}

function renderRestaurants() {
  const schedules = state.data.restaurantSchedules || [];
  setHtml("[data-restaurants]", (state.data.restaurants || []).map((restaurant) => {
    const items = schedules.filter((item) => item.restaurantName === restaurant.restaurantName || includes(item, restaurant.restaurantName)).slice(0, 32);
    const grouped = groupBy(items, (item) => item.day);
    const detail = items.length ? `<div class="location-schedule grouped-schedule">${Object.entries(grouped).map(([day, rows]) => `
      <details class="details schedule-day-group">
        <summary><span>${escapeHtml(dayLabelShort(day))}</span><span class="summary-hint">${rows.length} meal moment${rows.length === 1 ? "" : "s"}</span></summary>
        <div class="details-content">
          ${rows.map((item) => `
            <div class="supplier-time-block">
              <strong>${escapeHtml([item.timeDisplay || item.timeStart, item.meal].filter(Boolean).join(" · ") || "Time needed")}</strong>
              <p>${escapeHtml(item.groupAttending || "Group attending TBC")}</p>
              <div class="meta-list compact-meta">
                ${meta("Entertainment", item.entertainment)}
                ${meta("Owner", item.owner)}
                ${meta("Content capture", item.contentCapture)}
                ${meta("Menu", item.menuFile)}
                ${meta("Status", item.status)}
              </div>
              ${(item.linkedMenuIds || []).length ? `<div class="contact-actions menu-links">${item.linkedMenuIds.map((id) => `<a href="#menus" data-menu-open="${escapeHtml(id)}">Open final menu</a>`).join("")}</div>` : ""}
              ${item.notes ? `<p>${escapeHtml(item.notes)}</p>` : ""}
              ${updateModule(item.updateId)}
            </div>
          `).join("")}
        </div>
      </details>
    `).join("")}</div>` : `<div class="image-placeholder"><strong>Restaurant schedule needed</strong><span>Add meal, menu, group, entertainment, and owner details.</span></div>`;
    return card({
      title: restaurant.restaurantName,
      status: items.some((item) => /Needs|Risk|File/.test(item.status)) ? "Needs Confirmation" : "On Track",
      body: `<p>${escapeHtml(restaurant.primaryUse)}</p>`,
      metadata: meta("Main days", restaurant.mainDays) + meta("Owner", restaurant.owner),
      footer: detailsBlock("Open restaurant schedule", [], detail),
      updateId: `restaurant:${slug(restaurant.restaurantName)}`
    });
  }).join("") || empty("No restaurant schedules available yet."));
}

function renderMenus() {
  const filters = state.menuFilters;
  const menus = liveItems(state.data.menus || [])
    .filter((item) => !filters.query || includes(item, filters.query))
    .filter((item) => !filters.date || item.date === filters.date)
    .filter((item) => !filters.location || item.location === filters.location)
    .filter((item) => !filters.meal || item.meal_type === filters.meal)
    .filter((item) => !filters.needs || (item.needs_confirmation || []).length || /needs confirmation/i.test(item.location))
    .sort((a, b) => `${a.date} ${a.title}`.localeCompare(`${b.date} ${b.title}`));
  setHtml("[data-menu-count]", `${menus.length} menu${menus.length === 1 ? "" : "s"}`);
  const grouped = groupBy(menus, (item) => item.date || "Date Needs Confirmation");
  const html = Object.entries(grouped).map(([date, rows]) => `
    <section class="menu-date-group" aria-label="Menus for ${escapeHtml(date)}">
      <div class="subsection-heading">
        <h3>${escapeHtml(date)}</h3>
        <span>${rows.length} menu${rows.length === 1 ? "" : "s"}</span>
      </div>
      <div class="cards-grid menu-card-grid">
        ${rows.map((item) => {
          const relatedRestaurantCount = (item.related_restaurant_schedule_ids || []).length;
          const relatedCallSheetCount = (item.related_call_sheet_ids || []).length;
          const detail = `
            <div class="menu-detail-grid">
              ${(item.sections || []).map((section) => `
                <div class="menu-section-block">
                  <strong>${escapeHtml(section.heading)}</strong>
                  ${list(section.items || [])}
                </div>
              `).join("")}
            </div>
            ${item.allergen_key ? `<p class="fine-print">${escapeHtml(item.allergen_key)}</p>` : ""}
            <div class="contact-actions">
              <a href="${escapeHtml(item.source_url || item.source_asset)}" target="_blank" rel="noreferrer">View source PDF page</a>
              ${relatedRestaurantCount ? `<a href="#restaurants">Open restaurant schedule</a>` : ""}
              ${relatedCallSheetCount ? `<a href="#call-sheet">Open call sheet</a>` : ""}
            </div>
          `;
          return `
            <article class="card menu-card" data-menu-card="${escapeHtml(item.id)}">
              <div class="card-header">
                <div>
                  <p class="eyebrow">${escapeHtml(item.date)}</p>
                  <h3>${escapeHtml(item.title)}</h3>
                </div>
                <div class="tag-stack">${tag(item.status)}${(item.needs_confirmation || []).length ? tag("Needs Confirmation") : ""}</div>
              </div>
              <p>${escapeHtml((item.contains || []).slice(0, 4).join(" / "))}</p>
              <div class="meta-list compact-meta">
                ${meta("Meal / session", item.meal_type)}
                ${meta("Location", item.location)}
                ${meta("Location status", item.location_status || (/needs confirmation/i.test(item.location || "") ? "Needs Confirmation" : "Confirmed"))}
                ${meta("Source page", (item.source_pages || []).join(", "))}
                ${meta("Restaurant links", relatedRestaurantCount ? `${relatedRestaurantCount} linked` : "Needs Confirmation")}
                ${meta("Call sheet", relatedCallSheetCount ? "Linked" : "Needs Confirmation")}
              </div>
              <details class="details menu-details">
                <summary><span data-menu-summary-label>Open menu</span><span class="summary-hint">PDF page ${(item.source_pages || []).join(", ")}</span></summary>
                <div class="details-content">${detail}${updateModule(item.updateId)}</div>
              </details>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `).join("");
  setHtml("[data-menus]", html || empty("No menus match the current filters."));
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
    <details class="accordion">
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
  const unclearTravel = /test check|check in$|on site$|subject\s*(to|\d)|\?|needed|tbc|missing|unclear/i;
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
    title: item.person || "Person Needed",
    status: unclearTravel.test(`${item.person} ${item.arrivalAirport} ${item.arrivalFlight} ${item.departureAirport} ${item.departureFlight} ${item.hotelTransferNotes} ${item.notes}`) ? "Needs Confirmation" : item.status,
    department: item.team,
    body: `<p>${escapeHtml(firstMeaningful(item.arrivalDate, item.departureDate, "Travel date needed"))} · ${escapeHtml(firstMeaningful(item.arrivalAirport, item.departureAirport, "Airport needed"))}</p>
      ${detailsBlock("Travel details", [["Team/company", item.team], ["Arrival date", item.arrivalDate || "Arrival date needed"], ["Arrival time", item.arrivalTime || "Arrival time needed"], ["Arrival airport", item.arrivalAirport || "Arrival airport needed"], ["Arrival flight", item.arrivalFlight || "Flight info needed"], ["Departure date", item.departureDate || "Departure date needed"], ["Departure time", item.departureTime || "Departure time needed"], ["Departure airport", item.departureAirport || "Departure airport needed"], ["Departure flight", item.departureFlight || "Flight info needed"], ["Transfer notes", item.hotelTransferNotes], ["Transport owner", item.transportOwner], ["Notes", item.notes]])}`,
    metadata: meta("Team/company", item.team),
    updateId: item.updateId
  })).join("") || empty("No travel items match the filters."));
}

function renderContactTabs() {
  const categories = ["All", "Leadership", "Production / Content", "Operations / Logistics", "International Collective / I.N.C", "Clownfish", "Aream & Co.", "BeGood", "Performers", "Hotel / Venue", "Remote"];
  setHtml("[data-contact-tabs]", categories.map((category) => `<button class="tab-button" type="button" role="tab" aria-selected="${category === state.activeContactCategory}" data-contact-tab="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join(""));
}

function renderContacts() {
  const items = state.data.contacts
    .filter((item) => state.activeContactCategory === "All" || item.category === state.activeContactCategory || item.group === state.activeContactCategory || item.company === state.activeContactCategory || (state.activeContactCategory === "International Collective / I.N.C" && /I\\.N\\.C|International Collective/.test(`${item.company} ${item.category} ${item.group}`)))
    .filter((item) => passesGlobal(item, { owner: item.name, department: item.category, updateId: item.updateId }));
  setHtml("[data-contacts]", items.map((item) => {
    const phoneHref = item.phone ? `tel:${item.phone.replace(/[^+0-9]/g, "")}` : "";
    return card({
      title: item.name,
      status: item.category || item.group,
      body: `<p>${escapeHtml(item.role || item.responsibility)}</p>`,
      metadata: meta("Company", item.company) + meta("Responsibility", item.responsibility) + meta("Category", item.category || item.group) + meta("Phone", item.phone) + meta("Email", item.email || item.emailStatus || (item.notes === "Email needed" ? "Email needed" : "")) + meta("Location responsibility", item.locationAssignment || item.showOperativeFor) + meta("Notes", item.notes && item.notes !== "Email needed" ? item.notes : ""),
      footer: `<div class="contact-actions">${phoneHref ? `<a href="${phoneHref}">Call</a>` : ""}${item.whatsappLink ? `<a href="${item.whatsappLink}" target="_blank" rel="noreferrer">WhatsApp</a>` : ""}${item.email ? `<a href="mailto:${item.email}">Email</a>` : ""}</div>`,
      updateId: item.updateId
    });
  }).join("") || empty("No contacts match the current filters."));
}

function renderGuests() {
  const allGuests = state.data.guests || [];
  const lanyardGuide = state.data.swagDelivery?.lanyards || {};
  const assignmentByGuest = new Map((state.roundTablePlan?.assignments || [])
    .filter((seat) => seat.guest_name)
    .map((seat) => [seat.guest_id || slug(seat.guest_name), seat]));
  const filters = state.guestFilters;
  const query = text(filters.query).toLowerCase();
  const missingFields = (item) => item.missing_fields || [];
  const visibleGuestValue = (value) => {
    const raw = text(value);
    return raw && !/^(not provided|role not provided)$/i.test(raw) ? raw : "";
  };
  const matchesQuickFilter = (item) => {
    if (filters.quick === "needs") return /needs confirmation/i.test(item.status || "");
    if (filters.quick === "missing") return missingFields(item).length > 0;
    if (filters.quick === "duplicate") return missingFields(item).some((field) => /duplicate/i.test(field));
    return true;
  };
  const items = allGuests
    .filter((item) => !query || `${item.name} ${item.namecard_display_name} ${item.company} ${item.company_display_name} ${item.lanyard_colour} ${item.lanyard_colour_group}`.toLowerCase().includes(query))
    .filter((item) => !filters.company || (item.company_display_name || item.company) === filters.company)
    .filter((item) => !filters.status || item.status === filters.status)
    .filter((item) => !filters.missing || missingFields(item).includes(filters.missing))
    .filter(matchesQuickFilter);
  const ready = allGuests.filter((item) => item.namecard_status === "Ready" && item.lanyard_status === "Ready").length;
  const missing = allGuests.filter((item) => missingFields(item).length).length;
  const needs = allGuests.filter((item) => /needs confirmation/i.test(item.status || "")).length;
  const duplicateCount = allGuests.filter((item) => missingFields(item).some((field) => /duplicate/i.test(field))).length;
  setHtml("[data-guest-summary]", [
    ["Total guests", allGuests.length, "Approved lanyards workbook"],
    ["Namecards ready", ready, "Safe display records"],
    ["Missing info", missing, "Needs follow-up"],
    ["Needs confirmation", needs, duplicateCount ? `${duplicateCount} duplicate-name records` : "No duplicate-name flags"],
    ["Lanyard colours", "5 refs", "Black = Aream & Co; Brown = Crew; Blue = PC & console; Green = mobile consumer; Oatmeal = other."]
  ].map(([label, value, note]) => `
    <div class="guest-summary-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <em>${escapeHtml(note)}</em>
    </div>
  `).join(""));
  setHtml("[data-lanyard-guide]", renderLanyardGuide(lanyardGuide));
  const quickFilters = [
    ["all", "All"],
    ["needs", "Needs Confirmation"],
    ["missing", "Missing Info"],
    ...(duplicateCount ? [["duplicate", "Duplicates"]] : [])
  ];
  setHtml("[data-guest-quick-filters]", quickFilters.map(([key, label]) => `
    <button type="button" class="${filters.quick === key ? "is-active" : ""}" data-guest-quick="${key}">${escapeHtml(label)}</button>
  `).join(""));
  const initialLimit = 72;
  const limited = items.slice(0, initialLimit);
  const count = $("[data-guest-count]");
  if (count) {
    count.textContent = items.length > initialLimit
      ? `${limited.length} of ${items.length} showing`
      : `${items.length} showing`;
  }
  const cards = limited.map((item) => {
    const missingLabel = missingFields(item).join(", ");
    const source = [item.source_workbook, item.source_sheet, item.source_row ? `row ${item.source_row}` : ""].filter(Boolean).join(" · ");
    const updateId = item.id || `guest:${slug(item.name)}`;
    const latest = latestUpdate(updateId);
    const panelId = `guest-panel-${slug(updateId)}`;
    const role = visibleGuestValue(item.role);
    const guestType = visibleGuestValue(item.guest_type);
    const category = visibleGuestValue(item.category);
    const tableAssignment = assignmentByGuest.get(item.id) || assignmentByGuest.get(slug(item.name));
    const tableAssignmentLabel = tableAssignment ? `Assigned to Table ${tableAssignment.table_number}, Seat ${tableAssignment.seat_number}` : "";
    const relatedItems = [
      ["Related schedule", (item.related_schedule_items || []).join(", ")],
      ["Related podcast", (item.related_podcast_items || []).join(", ")],
      ["Related speaker/session", (item.related_speaker_sessions || []).join(", ")],
      ["Related restaurant", (item.related_restaurant_items || []).join(", ")]
    ];
    return `
      <article class="card guest-card" data-guest-card>
        <div class="card-header">
          <h3 class="card-title">${escapeHtml(item.name || "Guest Name Needed")}</h3>
          <div class="tag-stack">${departmentTag(item.company_display_name || item.company)}${tag(latest?.status || item.status || "Confirmed")}</div>
        </div>
        <p class="guest-card-company">${escapeHtml(item.company_display_name || item.company || "Company Needed")}</p>
        ${(role || guestType || category) ? `<div class="guest-summary-line">${[role, guestType, category].filter(Boolean).map((value) => `<span>${escapeHtml(value)}</span>`).join("")}</div>` : ""}
        <div class="tag-stack guest-status-tags">${item.lanyard_colour ? tag(item.lanyard_colour) : ""}${tag(item.lanyard_status)}${tag(item.namecard_status)}${tableAssignmentLabel ? tag(tableAssignmentLabel) : ""}${missingFields(item).map((field) => tag(field)).join("")}</div>
        <button class="guest-detail-toggle" type="button" data-guest-toggle aria-expanded="false" aria-controls="${escapeHtml(panelId)}">View details</button>
        <div class="guest-detail-panel" id="${escapeHtml(panelId)}" hidden>
          ${latest ? `<p><strong>Latest update:</strong> ${escapeHtml(latest.comment)}</p>` : ""}
          <div class="meta-list">
            ${meta("Namecard display", item.namecard_display_name)}
            ${meta("Company display", item.company_display_name)}
            ${meta("Full role/title", item.role)}
            ${meta("Guest type", item.guest_type)}
            ${meta("Category", item.category)}
            ${meta("Lanyard colour", item.lanyard_colour)}
            ${meta("Lanyard colour group", item.lanyard_colour_group)}
            ${meta("Lanyard colour note", item.lanyard_colour_note)}
            ${meta("Lanyard status", item.lanyard_status)}
            ${meta("Namecard status", item.namecard_status)}
            ${meta("Table assignment", tableAssignmentLabel)}
            ${detailRows(relatedItems)}
            ${meta("Safe operational notes", item.safe_notes)}
            ${meta("Missing data details", missingLabel)}
            ${meta("Source", source)}
            ${meta("Visibility", item.visibility)}
          </div>
          <div class="contact-actions"><a href="#locations">Open HORIZONS Hall Round Table Plan</a></div>
          ${updateModule(updateId)}
        </div>
      </article>
    `;
  }).join("");
  const more = items.length > initialLimit
    ? `<div class="empty-state">Showing the first ${initialLimit} guest records. Use search or filters to narrow the full approved list.</div>`
    : "";
  setHtml("[data-guests]", cards ? `${cards}${more}` : empty("No guests match the current search or filters."));
}

function renderAttendeeDirectory() {
  const directory = state.data.attendeeDirectory || {};
  const filters = state.attendeeFilters;
  const query = text(filters.query).toLowerCase();
  const records = liveItems(directory.records || [])
    .filter((item) => !query || `${item.name} ${item.company} ${item.category}`.toLowerCase().includes(query))
    .filter((item) => !filters.category || item.category === filters.category)
    .filter((item) => !filters.company || item.company === filters.company)
    .sort((a, b) => `${a.category} ${a.name}`.localeCompare(`${b.category} ${b.name}`));
  setHtml("[data-attendee-count]", `${records.length} of ${(directory.records || []).length} safe attendee records`);
  const limit = query || filters.category || filters.company ? 80 : 36;
  const cards = records.slice(0, limit).map((item) => {
    const panelId = `attendee-${escapeHtml(item.id || slug(item.name))}`;
    return `
      <article class="card attendee-card">
        <div class="card-header">
          <h3 class="card-title">${escapeHtml(item.name || "Attendee Name Needed")}</h3>
          <div class="tag-stack">${tag(item.category)}${tag("Internal only")}</div>
        </div>
        <p class="guest-card-company">${escapeHtml(item.company || "Company Needed")}</p>
        <button class="guest-detail-toggle" type="button" data-attendee-toggle aria-expanded="false" aria-controls="${panelId}">View profile</button>
        <div class="guest-detail-panel" id="${panelId}" hidden>
          <div class="meta-list">
            ${meta("Category", item.category)}
            ${meta("Source page", item.source_page)}
            ${meta("Directory page", item.directory_page)}
            ${meta("Status", item.status)}
            ${meta("Visibility", item.visibility)}
          </div>
          ${item.profile_summary ? `<p>${escapeHtml(item.profile_summary)}</p>` : `<p>Profile summary needs review from source page ${escapeHtml(item.source_page)}.</p>`}
          <div class="contact-actions"><a href="${escapeHtml(directory.sourceFile || item.source_file)}" target="_blank" rel="noopener noreferrer">Open confidential source PDF</a></div>
        </div>
      </article>
    `;
  }).join("");
  const more = records.length > limit ? `<div class="empty-state">Showing ${limit} records. Use search, category, or company filters to narrow the confidential directory.</div>` : "";
  const ambiguous = directory.ambiguousCount ? `<div class="empty-state">Source import note: ${escapeHtml(directory.ambiguousCount)} profile pages need manual review and are listed in the import report.</div>` : "";
  setHtml("[data-attendee-directory]", cards ? `${ambiguous}${cards}${more}` : empty("No attendee directory records match the current filters."));
}

function renderLanyardGuide(lanyardGuide = {}) {
  const colours = asList(lanyardGuide.colours);
  if (!colours.length) return "";
  const cards = colours.map((item) => `
    <figure class="lanyard-colour-card">
      <div class="lanyard-colour-image">
        ${item.image ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(`Lanyard - ${item.colour}`)}" loading="lazy">` : `<div class="image-placeholder"><strong>Image Needed</strong><span>${escapeHtml(item.colour || "Lanyard colour")}</span></div>`}
      </div>
      <figcaption>
        <strong>${escapeHtml(item.colour || "Colour Needed")}</strong>
        <span>${escapeHtml(lanyardMeaning(item))}</span>
      </figcaption>
    </figure>
  `).join("");
  return `
    <details class="details lanyard-guide-details">
      <summary><span>Lanyard Colour Guide</span>${tag(lanyardGuide.status || "Needs Confirmation")}</summary>
      <div class="details-content">
        <p class="section-note">Final live guide uses five colour cards linked to Guests / Namecards, with confirmed group meanings.</p>
        <div class="lanyard-colour-grid">${cards}</div>
        ${list(lanyardGuide.notes)}
      </div>
    </details>
  `;
}

function setGuestDetailState(card, expanded) {
  const button = card?.querySelector("[data-guest-toggle]");
  const panel = card?.querySelector(".guest-detail-panel");
  if (!button || !panel) return;
  button.setAttribute("aria-expanded", String(expanded));
  button.textContent = expanded ? "Hide details" : "View details";
  panel.hidden = !expanded;
  card.classList.toggle("is-expanded", expanded);
}

function renderWhoDoICall() {
  const items = state.data.whoDoICall || [];
  setHtml("[data-who-do-i-call]", items.map((item) => card({
    title: item.situation,
    status: item.slackChannel,
    body: `<p>${escapeHtml(item.notes)}</p>`,
    metadata: meta("Primary", item.primaryContact) + meta("Backup", item.backupContact) + meta("Phone", item.phone),
    footer: `<div class="contact-actions">${item.phone ? `<a href="tel:${escapeHtml(item.phone.replace(/[^+0-9]/g, ""))}">Call</a>` : ""}${item.whatsapp ? `<a href="${escapeHtml(item.whatsapp)}" target="_blank" rel="noreferrer">WhatsApp</a>` : ""}<a href="#slack">${escapeHtml(item.slackChannel || "Slack")}</a></div>`,
    updateId: `who:${slug(item.situation)}`
  })).join("") || empty("No escalation contacts listed yet."));
}

function renderLocations() {
  const items = state.data.locations.filter((item) => passesGlobal(item, { status: item.status, owner: item.keyOwner, location: item.locationName, updateId: item.updateId }));
  const locationCards = items.map((item) => card({
    title: item.locationName,
    status: item.status,
    body: `<p>${escapeHtml(item.primaryUse)}</p>`,
    metadata: meta("Type", item.locationType) + meta("Key days", item.mainDays) + meta("Owner", item.keyOwner) + meta("Clownfish show operatives", item.clownfishShowOperatives || (item.showOperatives || []).join(" + ")) + meta("Latitude", item.latitude) + meta("Longitude", item.longitude) + meta("Address", item.address) + meta("Travel time", item.travelTimeFromVenue) + meta("Aliases", (item.aliases || []).join(", ")) + meta("Watch-out", item.watchOut),
    footer: `<div class="contact-actions">${mapLink(item)}${item.emergencyRelevance ? `<a href="#call-sheet">Open emergency call sheet</a>` : `<a href="#location-schedules">Open location schedule</a>`}${text(item.locationName).toLowerCase() === "horizons hall" ? `<button type="button" data-open-hall-centre>Open Hall Control Centre</button><a href="#call-sheet">Open Call Sheet</a>` : ""}</div>${text(item.locationName).toLowerCase() === "horizons hall" ? `<div class="hall-card-summary"><strong>Hall tools available</strong><p>Round tables, theatre seating, stage design, rehearsals and files open in the full-width control centre.</p><div class="tag-stack">${tag("Round Tables: Needs Assignment")}${tag("Seat Count: Needs Confirmation")}</div></div>` : (item.layoutReferences?.length ? detailsBlock("Layouts + Production References", [["Summary", item.layoutsSummary]], layoutCards(item.layoutReferences)) : "")}` + detailsBlock("Location schedule", [], (item.scheduleItems || []).length ? `<div class="location-schedule">${item.scheduleItems.slice(0, 8).map((row) => `
      <div class="supplier-time-block">
        <strong>${escapeHtml(row.day || "Day needed")} · ${escapeHtml(row.time || "Time needed")}</strong>
        <p>${escapeHtml(row.activity || "Activity needed")}</p>
        <div class="meta-list compact-meta">${meta("Owner", row.owner)}${meta("Status", row.status)}${meta("Notes", row.notes)}</div>
      </div>
    `).join("")}</div>` : `<p>No detailed location schedule linked yet.</p>`),
    updateId: item.updateId
  })).join("");
  const hallLocation = items.find((item) => text(item.locationName).toLowerCase() === "horizons hall") || (state.data.locations || []).find((item) => text(item.locationName).toLowerCase() === "horizons hall") || {};
  setHtml("[data-locations]", `${locationCards || empty("No locations match the current filters.")}${renderHallControlCentre(hallLocation)}`);
  document.body.classList.toggle("hall-centre-open", state.hallControlCentreOpen);
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
      ${detailsBlock("Supplier details", [["Supplier type", item.supplierType], ["Contact", item.contactPerson], ["Phone", item.phone], ["Email", item.email], ["Responsibility", item.responsibility], ["Day(s)", item.day], ["Location", item.location], ["Arrival", item.arrivalTime], ["Setup", item.setupTime], ["Active", item.activeTime], ["Notes", item.notes]], `${item.keyRoles?.length ? `<h3>Clownfish Key Roles</h3><ul>${item.keyRoles.map((role) => `<li>${escapeHtml(role)}</li>`).join("")}</ul>` : ""}${item.showOperatives ? `<h3>Show operatives</h3>${Object.entries(item.showOperatives).map(([location, names]) => meta(location, names.join(" + "))).join("")}` : ""}${supplierTimeline(item)}${item.openItems?.length ? `<h3>Open items</h3>${item.openItems.slice(0, 8).map((open, index) => `<p>${tag(open.status)} <strong>${index + 1}.</strong> ${escapeHtml(open.item)}</p>${meta("Owner", open.owner)}${open.latestUpdate ? meta("Latest update", open.latestUpdate) : ""}`).join("")}` : ""}`)}`,
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
  const podcastGuests = (item) => [item.guest_1 || item.guest, item.guest_2].filter(Boolean).join(" / ") || item.guestSubject || "Guest TBC";
  const podcastCompanies = (item) => [item.guest_1_company || item.guestCompany, item.guest_2_company].filter(Boolean).join(" / ") || "Needs Confirmation";
  const podcastTitle = (item, episode) => {
    if (item.kind === "support") return item.session || item.slot || "Podcast support";
    return item.session ? `${item.session}: ${podcastGuests(item)}` : (item.episodeNumber || `Podcast ${episode}: ${podcastGuests(item)}`);
  };
  const items = liveItems(state.data.podcast)
    .filter((item) => passesGlobal(item, { status: item.status, day: item.day || item.date, owner: item.productionLead, location: item.location, department: "Podcast", updateId: item.updateId }))
    .filter((item) => passesLocal(item, state.podcastFilters, { guest: podcastGuests }));
  let episode = 0;
  const grouped = groupBy(items, (item) => item.day || item.date || "Day needed");
  setHtml("[data-podcast]", Object.entries(grouped).map(([day, rows]) => `
    <article class="card section-card">
      <div class="card-header"><h3 class="card-title">${escapeHtml(dayLabelShort(day))}</h3><div class="tag-stack">${tag(`${rows.length} podcast item${rows.length === 1 ? "" : "s"}`)}</div></div>
      <details class="details schedule-day-group"><summary><span>Open ${escapeHtml(dayLabelShort(day))} podcasts</span><span class="summary-hint">${rows.length}</span></summary><div class="details-content location-schedule grouped-schedule">
        ${rows.map((item) => {
          episode += 1;
          return card({
            title: podcastTitle(item, episode),
            status: item.status,
            department: "Podcast",
            body: `<p>${escapeHtml(podcastGuests(item))}</p>${item.topic ? `<p>${escapeHtml(item.topic)}</p>` : ""}`,
            metadata: meta("Recording time", item.recording_time || item.time) + meta("Call time", item.call_time) + meta("Presenter", item.presenter) + meta("Company", podcastCompanies(item)) + meta("Location", item.location) + meta("Production / logistics", item.productionLead) + meta("Related schedule", item.related_schedule_ids?.length ? `${item.related_schedule_ids.length} linked` : "") + meta("Related call sheet", item.related_call_sheet_ids?.length ? `${item.related_call_sheet_ids.length} linked` : ""),
            footer: detailsBlock("Podcast details / source trace", [["Topic", item.topic || "Topic Needed"], ["Notes", item.notes], ["Support window", item.kind === "support" ? (item.time || item.recording_time) : ""], ["Presenter source alias", item.presenter_source_name], ["Source workbook", item.source_workbook], ["Source sheet", item.source_sheet], ["Source row", item.source_row], ["Location status", item.location_status], ["Production needs", item.productionNeeds]]),
            updateId: item.updateId
          });
        }).join("")}
      </div></details>
    </article>
  `).join("") || empty("No podcast slots match the filters."));
}

function renderEntertainment() {
  const performers = (state.data.entertainment || []).filter((item) => !/playlist|background|ambient|curated music/i.test(`${item.performerName} ${item.type}`));
  setHtml("[data-entertainment]", performers.map((item) => {
    const schedule = item.scheduleItems?.length ? `<div class="location-schedule">${Object.entries(groupBy(item.scheduleItems, (row) => row.day || "Day needed")).map(([day, rows]) => `<details class="details schedule-day-group"><summary><span>${escapeHtml(dayLabelShort(day))}</span><span class="summary-hint">${rows.length}</span></summary><div class="details-content">${rows.map((row) => `
      <div class="supplier-time-block">
        <strong>${escapeHtml([row.day, row.time].filter(Boolean).join(" · ") || "Time needed")}</strong>
        <p>${escapeHtml(row.title || "Performance moment")}</p>
        <div class="meta-list compact-meta">${meta("Location", row.location)}${meta("Status", row.status)}</div>
      </div>
    `).join("")}</div></details>`).join("")}</div>` : `<p>Performance schedule needs confirmation.</p>`;
    return card({
      title: item.performerName,
      status: item.status,
      department: "Entertainment",
      body: `<p>${escapeHtml(item.type)}</p>`,
      metadata: meta("Day(s)", item.day) + meta("Arrival", item.arrivalTime) + meta("Sound check", item.soundCheckTime) + meta("Performance", item.performanceTime) + meta("Location", item.location) + meta("Internal owner", item.internalOwner),
      footer: detailsBlock("Performer details", [["Technical needs", item.technicalNeeds], ["Hospitality needs", item.hospitalityNeeds], ["Notes", item.notes]], schedule),
      updateId: item.updateId
    });
  }).join("") || empty("No entertainment records available yet."));
}

function renderPlaylists() {
  const items = (state.data.curatedPlaylists || []).filter((item) => !/dj |violin|pianist|vocal|performer|live music/i.test(`${item.playlistName} ${item.notes}`));
  setHtml("[data-playlists]", items.map((item) => card({
    title: item.playlistName,
    status: item.status,
    department: "Curated Playlist",
    body: `<p>${escapeHtml([item.day, item.time, item.location].filter(Boolean).join(" · "))}</p>`,
    metadata: meta("Playlist link", item.playlistLink) + meta("Owner", item.owner) + meta("Start/stop responsibility", item.startStopResponsibility) + meta("Notes", item.notes),
    updateId: item.updateId
  })).join("") || empty("No curated playlist moments available yet."));
}

function renderCaptureLog() {
  const items = [...(state.captureLog || [])].slice(-18).reverse();
  setHtml("[data-capture-log]", items.length ? items.map((item) => card({
    title: item.subject || "Capture moment",
    status: item.status || "Logged",
    department: item.mediaType || "Capture Log",
    body: `<p>${escapeHtml([item.day, item.manualTime || item.timestamp].filter(Boolean).join(" · "))}</p>`,
    metadata: meta("Logged by", item.loggedBy) + meta("Camera", item.camera) + meta("Location", item.location) + meta("Tags", item.tags) + meta("File/card", item.fileReference) + meta("Priority", item.priority) + meta("Notes", item.notes),
    updateId: item.updateId || `capture-log:${slug(item.id || item.subject)}`
  })).join("") : empty("No capture log entries yet. Add moments as footage is captured onsite."));
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
  const dismissed = new Set(state.dismissedCaptureSuggestions || []);
  const items = [...base, ...local].filter((item) => !dismissed.has(item.id) && !dismissed.has(item.updateId)).slice(-12);
  setHtml("[data-capture-suggestions]", items.map((item) => card({
    title: item.idea,
    status: item.status || item.priority,
    department: "Content",
    metadata: meta("Added by", item.name) + meta("Suggested day/time", item.suggestedTime) + meta("Location", item.location) + meta("Priority", item.priority) + meta("Assigned to", item.assignedTo) + meta("Notes", item.notes),
    footer: `<div class="contact-actions"><button type="button" data-capture-accept="${escapeHtml(item.updateId || item.id)}">Accept</button><button type="button" data-capture-dismiss="${escapeHtml(item.id || item.updateId)}">Dismiss</button></div>`,
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
    <div class="visual-block official-brief-block">
      ${card({
        title: item.title,
        status: item.status,
        body: `<p>${escapeHtml(item.notes)}</p>
          <div class="brief-summary-grid">
            ${meta("Location", item.location)}
            ${meta("Layout lead", item.layoutLead)}
            ${meta("Decal supplier", item.decalSupplier)}
          </div>
          ${detailsBlock("Open reception display details", [["Owner", item.owner]], `<h3>Instructions</h3>${list(item.setupInstructions)}<h3>Checklist</h3>${list(item.checklist)}${item.checkInGifts ? `<h3>Check-in gifts</h3>${list(item.checkInGifts.confirmedNotes)}<h3>Cap quantities</h3>${list(item.checkInGifts.capQuantities)}${meta("Additional note", item.checkInGifts.additionalNote)}` : ""}${item.swagShoot ? `<h3>Swag shoot</h3>${meta("Date", item.swagShoot.date)}${meta("Time", item.swagShoot.time)}${meta("Location", item.swagShoot.location)}${meta("Team", item.swagShoot.team)}${meta("People", (item.swagShoot.people || []).join(", "))}` : ""}`)}`,
        metadata: meta("Owner", item.owner),
        updateId: item.updateId
      })}
      ${item.referenceImages?.length ? referenceGallery(item.referenceImages) : `<div class="image-placeholder"><strong>Image needed</strong><span>Reception display and display-cabinet reference images.</span></div>`}
    </div>
  `).join(""));
}

function renderRoomDrops() {
  setHtml("[data-room-drops]", state.data.roomDrops.map((item) => `
    <div class="visual-block official-brief-block">
      ${card({
        title: item.title,
        status: item.status,
        body: `<p>${escapeHtml(item.deliveryNotes)}</p>
          <p><strong>${escapeHtml(item.handling)}</strong></p>
          ${detailsBlock("Open room-drop details", [["Date", item.date], ["Location", item.location], ["Execution team", item.executionTeam], ["Welcome note", item.welcomeNote]], `<h3>Items included</h3>${list(item.items)}<h3>Setup / quality control</h3>${list(item.qualityChecklist)}`)}`,
        metadata: meta("Owner", item.owner) + meta("Responsible teams", (item.responsibleTeams || []).join(", ")),
        updateId: item.updateId
      })}
      ${(item.referenceImages || []).length ? referenceGallery(item.referenceImages) : `<div class="image-placeholder"><strong>Image needed</strong><span>Room-drop and guest-gift reference images.</span></div>`}
    </div>
  `).join(""));
}

function renderSwagDelivery() {
  const data = state.data.swagDelivery || {};
  if (!Object.keys(data).length) {
    setHtml("[data-swag-delivery]", "");
    return;
  }
  const timeline = asList(data.timeline);
  const allocationCards = asList(data.allocations).map((item) => card({
    title: item.title,
    status: item.status || "Confirmed",
    body: `${allocationTable(item.rows)}${list(item.notes)}`,
    metadata: meta("Total quantity", item.totalQuantity) + meta("Primary use", item.primaryUse) + meta("Location", item.location) + meta("Date", item.date) + meta("Responsible team", item.responsibleTeam),
    updateId: `swag-allocation:${slug(item.title)}`
  })).join("");
  const lanyard = data.lanyards || {};
  setHtml("[data-swag-delivery]", `
    <div class="official-brief-dashboard">
      ${card({
        title: "Official Swag & Delivery Timeline",
        status: data.status || "Reference",
        body: `<div class="timeline-list compact-timeline">${timeline.map((item) => `
          <div class="timeline-row">
            <strong>${escapeHtml([item.date, item.time].filter(Boolean).join(" | "))}</strong>
            <span>${escapeHtml(item.title)}</span>
            <em>${escapeHtml(item.location || item.details || "")}</em>
            ${tag(item.status)}
          </div>
        `).join("")}</div>${detailsBlock("Open source details", [["Source PDF", data.sourceDocument], ["Last updated", data.lastUpdated]], "")}`,
        updateId: "swag-delivery:timeline"
      })}
      <div class="cards-grid brief-feature-grid">
        ${data.checkInGifts ? card({
          title: data.checkInGifts.title,
          status: data.checkInGifts.status,
          body: `<p>${escapeHtml(data.checkInGifts.quantityRule)}</p>${detailsBlock("Open check-in gift details", [["Date", data.checkInGifts.date], ["Location", data.checkInGifts.location], ["Gift", data.checkInGifts.gift], ["Additional note", data.checkInGifts.additionalNote]], `<h3>Cap quantities</h3>${list(data.checkInGifts.capQuantities)}<h3>Confirmed notes</h3>${list(data.checkInGifts.confirmedNotes)}${referenceGallery(data.checkInGifts.images)}`)}`,
          metadata: meta("Location", data.checkInGifts.location),
          updateId: "swag-delivery:check-in-gifts"
        }) : ""}
        ${data.chairDrop ? card({
          title: data.chairDrop.title,
          status: data.chairDrop.status,
          body: `<p>${escapeHtml(data.chairDrop.setupType)} for ${escapeHtml(data.chairDrop.audience)}.</p>${detailsBlock("Open chair drop details", [["Date", data.chairDrop.date], ["Time", data.chairDrop.time], ["Location", data.chairDrop.location], ["Execution team", data.chairDrop.executionTeam]], `<h3>Chair drop items</h3>${list(data.chairDrop.items)}<h3>Setup notes</h3>${list(data.chairDrop.setupNotes)}${referenceGallery(data.chairDrop.images)}`)}`,
          metadata: meta("Location", data.chairDrop.location),
          updateId: "swag-delivery:chair-drop"
        }) : ""}
        ${data.swagShoot ? card({
          title: data.swagShoot.title,
          status: data.swagShoot.status,
          body: `<p>${escapeHtml(data.swagShoot.timingNote || "")}</p>`,
          metadata: meta("Date", data.swagShoot.date) + meta("Time", data.swagShoot.time) + meta("Location", data.swagShoot.location) + meta("Team", data.swagShoot.team) + meta("People", (data.swagShoot.people || []).join(", ")),
          updateId: "swag-delivery:swag-shoot"
        }) : ""}
      </div>
      <details class="details brief-detail-group">
        <summary><span>Swag Allocation</span>${tag("Reference")}</summary>
        <div class="details-content cards-grid">${allocationCards}</div>
      </details>
      <details class="details brief-detail-group">
        <summary><span>Visual References / Lanyards</span>${tag(lanyard.status || "Needs Confirmation")}</summary>
        <div class="details-content">
          ${list(lanyard.notes)}
          ${allocationTable(asList(lanyard.colours).map((item) => ({ label: item.colour, quantity: lanyardMeaning(item) })))}
          ${referenceGallery(lanyard.images)}
        </div>
      </details>
      <details class="details brief-detail-group">
        <summary><span>Execution Checklist</span>${tag("Reference")}</summary>
        <div class="details-content timeline-list compact-timeline">
          ${asList(data.executionChecklist).map((item) => `
            <div class="timeline-row">
              <strong>${escapeHtml([item.date, item.time].filter(Boolean).join(" | "))}</strong>
              <span>${escapeHtml(item.area)}</span>
              <em>${escapeHtml(item.task)}</em>
            </div>
          `).join("")}
        </div>
      </details>
    </div>
  `);
}

function renderSwagSchedule() {
  setHtml("[data-swag-schedule-tabs]", "");
  setHtml("[data-swag-queens]", "");
}

function renderSwag() {
  const officialOrder = [
    "swag-horizons-house-check-in-caps",
    "swag-shoot",
    "swag-horizons-connect-chair-drop",
    "swag-hand-fan-allocation",
    "swag-pens-notepads-allocation",
    "swag-spare-handling",
    "swag-lanyard-references"
  ];
  const officialIds = new Set(officialOrder);
  const items = liveItems(state.data.swag || [])
    .filter((item) => officialIds.has(item.id))
    .filter((item) => !/breakfast|coffee break|lunch|dinner|catering|allergen key|selected in-room dining/i.test(`${item.itemName} ${item.category} ${item.notes}`))
    .sort((a, b) => officialOrder.indexOf(a.id) - officialOrder.indexOf(b.id));
  setHtml("[data-swag]", items.map((item) => card({
    title: item.itemName,
    status: item.status,
    department: item.category,
    body: detailsBlock("Open item details", [["Delivery/setup", item.deliverySetupNotes], ["File/reference", item.fileUrl], ["Notes", item.notes]], `${item.image ? `<figure class="reference-card"><img src="${item.image}" alt="${escapeHtml(item.alt)}" loading="lazy"><figcaption>${escapeHtml(item.imageCaption || "Reference image")}</figcaption></figure>` : `<div class="image-placeholder"><strong>Image needed</strong><span>Reference image needed.</span></div>`}${item.referenceImages?.length ? `<div class="reference-grid">${item.referenceImages.map((image) => image.src ? `<figure class="reference-card"><img src="${image.src}" alt="${escapeHtml(image.alt)}" loading="lazy"><figcaption>${escapeHtml(image.caption)}</figcaption></figure>` : `<div class="image-placeholder"><strong>${escapeHtml(image.alt || "Image needed")}</strong><span>${escapeHtml(image.caption || "Reference image needed.")}</span></div>`).join("")}</div>` : ""}`),
    metadata: meta("Category", item.category) + meta("Day", item.day) + meta("Location", item.location) + meta("Owner", item.owner) + meta("Quantity", item.quantity),
    updateId: item.updateId
  })).join(""));
}

function renderSpeakers() {
  const groups = {
    "HORIZONS Hall": [],
    "HORIZONS Studio": [],
    "HORIZONS Podcast": []
  };
  liveItems(state.data.speakers || []).forEach((item) => {
    const key = /podcast|cliffhanger/i.test(item.location || item.sessionTitle || "") ? "HORIZONS Podcast" : /studio/i.test(item.location || "") ? "HORIZONS Studio" : "HORIZONS Hall";
    groups[key].push(item);
  });
  setHtml("[data-speakers]", Object.entries(groups).map(([location, items]) => {
    const byDay = groupBy(items, (item) => item.day || "Day needed");
    const logo = location === "HORIZONS Studio" ? state.data.event?.studioLogo : location === "HORIZONS Hall" ? "assets/logos/horizons-hall-black.png" : "assets/logos/horizons-main-logo-black.png";
    return `<article class="card section-card">
      <div class="brand-logo-wrapper mini-brand"><img class="brand-logo" src="${escapeHtml(logo)}" alt="${escapeHtml(location)} logo" loading="lazy"></div>
      <div class="card-header"><h3 class="card-title">${escapeHtml(location)}</h3><div class="tag-stack">${tag(items.length ? `${items.length} records` : "Content Needed")}</div></div>
      ${items.length ? Object.entries(byDay).map(([day, rows]) => `<details class="details schedule-day-group"><summary><span>${escapeHtml(dayLabelShort(day))}</span><span class="summary-hint">${rows.length}</span></summary><div class="details-content">${rows.map((item) => card({
        title: item.sessionTitle || item.speakerName,
        status: item.status,
        department: "Speaker Content",
        body: `<p>${escapeHtml(item.sessionDescription || "Session description needed")}</p>`,
        metadata: meta("Speaker", item.speakerName) + meta("Time", item.time) + meta("Location", item.location) + meta("Owner", item.owner) + meta("Visibility", item.visibility) + meta("Source file", item.sourceFile) + meta("Seating layout", item.seatingLayout) + meta("Layout status", item.layoutStatus),
        footer: detailsBlock("Speaker content details", [["Deck copy", item.deckCopy], ["Speaker notes", item.speakerNotes], ["Podcast clash check", item.podcastClash || "Needs Confirmation"], ["Status", item.status]], layoutLinks(item.relatedLayoutIds)),
        updateId: item.updateId
      })).join("")}</div></details>`).join("") : `<div class="image-placeholder"><strong>Content needed</strong><span>${escapeHtml(location)} speaker/session content still needs upload.</span></div>`}
    </article>`;
  }).join(""));
}

function renderRehearsals() {
  const grouped = groupBy(liveItems(state.data.rehearsals || []), (item) => item.day || "Day needed");
  setHtml("[data-rehearsals]", Object.entries(grouped).map(([day, rows]) => `<article class="card section-card">
    <div class="card-header"><h3 class="card-title">${escapeHtml(dayLabelShort(day))}</h3><div class="tag-stack">${tag(`${rows.length} rehearsal${rows.length === 1 ? "" : "s"}`)}</div></div>
    <details class="details schedule-day-group"><summary><span>Open rehearsals</span><span class="summary-hint">${rows.length}</span></summary><div class="details-content location-schedule grouped-schedule">${rows.map((item) => card({
      title: item.rehearsalName,
      status: item.status,
      department: "Rehearsal",
      body: `<p><strong>${escapeHtml(item.time || "Time needed")}</strong></p>`,
      metadata: meta("Location", item.location) + meta("Related session", item.relatedSession) + meta("Owner", item.owner) + meta("Purpose", item.purpose),
      footer: detailsBlock("Open rehearsal details", [["Required people", item.requiredPeople], ["Notes", item.notes], ["Status", item.status]], layoutLinks(item.relatedLayoutIds)),
      updateId: item.updateId
    })).join("")}</div></details>
  </article>`).join("") || empty("No rehearsal records available yet."));
}

function layoutRecords(ids = []) {
  const records = state.data.horizonsHallLayouts || [];
  return asList(ids).map((id) => records.find((item) => item.id === id)).filter(Boolean);
}

function layoutLinks(ids = []) {
  const records = layoutRecords(ids);
  if (!records.length) return "";
  return `<div class="contact-actions layout-actions">${records.map((item) => `<a href="${escapeHtml(item.sourceAsset)}" target="_blank" rel="noreferrer">${escapeHtml(item.title === "Reserved Seats — Needs Assignment" ? "Open reserved seats placeholder" : item.layoutName || item.title)}</a>`).join("")}</div>`;
}

function guestBySelectorValue(value = "") {
  const raw = text(value).toLowerCase();
  if (!raw) return null;
  return (state.data.guests || []).find((guest) => {
    const labels = [
      guest.name,
      guest.namecard_display_name,
      safeGuestLabel(guest),
      `${guest.name} · ${guest.company_display_name || guest.company || ""}`,
      guest.id
    ].map((item) => text(item).toLowerCase());
    return labels.includes(raw);
  }) || null;
}

function assignmentLabel(seat = {}) {
  return seat.guest_name ? `${seat.guest_name}${seat.guest_company ? ` · ${seat.guest_company}` : ""}` : "Guest Needed";
}

function roundTableGuestDatalist() {
  const optionsHtml = (state.data.guests || []).map((guest) => `<option value="${escapeHtml(safeGuestLabel(guest))}"></option>`).join("");
  return `<datalist id="round-table-guest-options">${optionsHtml}</datalist>`;
}

function renderRoundTableAssignmentSystem(layout = {}) {
  const config = roundTableConfig();
  const plan = state.roundTablePlan || roundTableSeedPlan();
  const summary = plan.summary || {};
  const tables = plan.tables || [];
  const assignedCount = summary.assigned_count || 0;
  const incompleteCount = tables.filter((table) => (table.assigned_count || 0) < (plan.config?.working_seats_per_table || 9)).length;
  const selected = tables.find((table) => Number(table.table_number) === Number(state.activeRoundTableNumber)) || tables[0] || {};
  state.activeRoundTableNumber = Number(selected.table_number || 1);
  return `
    <section class="round-table-system" data-round-table-system>
      <div class="round-table-panel">
        <div class="round-table-hero">
          <div>
            <p class="eyebrow">Round Tables</p>
            <h3>HORIZONS Hall Round Table Assignments</h3>
            <p>Assign guests to tables for the round table moment.</p>
            <div class="tag-stack">${tag(config.warningTag || "Seat Count Needs Confirmation")}${tag(layout.status || "Needs Assignment")}</div>
          </div>
          <div class="round-table-stats">
            <div><span>Tables</span><strong>${escapeHtml(summary.table_count || 10)}</strong></div>
            <div><span>Slots/table</span><strong>${escapeHtml(summary.seats_per_table || 9)}</strong></div>
            <div><span>Working slots</span><strong>${escapeHtml(summary.working_slots || 90)}</strong></div>
            <div><span>Source capacity</span><strong>${escapeHtml(summary.source_capacity || 80)}</strong></div>
          </div>
        </div>
        <div class="empty-state warning-state">
          <strong>Seat Count Needs Confirmation</strong>
          <span>${escapeHtml(config.sourceNote || plan.config?.notes || "Uploaded layout shows seated capacity 80. Current working version uses 10 tables x 9 guest slots until final confirmation from Kirsty / Clownfish.")}</span>
        </div>
        ${state.roundTableStorageWarning ? `<div class="empty-state warning-state"><strong>Shared storage status</strong><span>${escapeHtml(state.roundTableStorageWarning)}</span></div>` : ""}
        <div class="hall-visual-action-card">
          <div>
            <strong>HORIZONS Hall Round Table Layout</strong>
            <p>Small layout reference only. Original source file: ${escapeHtml(config.sourceFile || "Horizons - Farmers Market x80 V5.pdf")}.</p>
          </div>
          <div class="contact-actions">
            <a href="${escapeHtml(layout.sourceAsset || config.sourceAsset || "assets/horizons-hall-layouts/horizons-hall-round-table-layout-x80.pdf")}" target="_blank" rel="noreferrer">Open layout PDF</a>
            <a href="${escapeHtml(layout.sourceAsset || config.sourceAsset || "assets/horizons-hall-layouts/horizons-hall-round-table-layout-x80.pdf")}" download>Download layout PDF</a>
          </div>
        </div>
        <div class="round-table-mode-card">
          <div>
            <strong>${state.roundTableEditMode ? "Editing Round Table Assignments" : "View Mode"}</strong>
            <p>${state.roundTableEditMode ? "Make changes deliberately, then save to the shared seating plan." : "Review assignments. Tap Edit assignments before changing seats."}</p>
          </div>
          <div class="contact-actions">
            <button type="button" data-round-table-edit-toggle>${state.roundTableEditMode ? "Cancel editing" : "Edit assignments"}</button>
            <button type="button" data-round-table-reload>Refresh assignments</button>
          </div>
        </div>
        <div class="round-table-utility-row">
          <strong>Actions</strong>
          <div class="contact-actions">
            <button type="button" data-round-table-export>Export CSV</button>
            <button type="button" data-round-table-print>Print seating plan</button>
            <button type="button" data-round-table-copy>Copy table summary</button>
          </div>
        </div>
        <div class="meta-list compact-meta round-table-save-status" data-round-table-status>
          ${meta("Last updated", summary.last_updated || config.lastUpdated || "No shared save yet")}
          ${meta("Updated by", summary.updated_by || "Shared backend")}
          ${meta("Incomplete tables", incompleteCount)}
        </div>
        <div class="round-table-chip-row" role="tablist" aria-label="Round table selector">
          ${tables.map((table) => renderRoundTableChip(table, plan)).join("")}
        </div>
        ${roundTableGuestDatalist()}
        <div class="round-table-board is-single-table" data-round-table-board>
          ${renderSelectedRoundTablePanel(selected, plan)}
        </div>
      </div>
    </section>
  `;
}

function renderRoundTableChip(table = {}, plan = {}) {
  const slotCount = plan.config?.working_seats_per_table || 9;
  const assigned = table.assigned_count || 0;
  const statusClass = assigned >= slotCount ? "is-complete" : assigned > 0 ? "is-partial" : "is-empty";
  return `<button type="button" role="tab" aria-selected="${Number(table.table_number) === Number(state.activeRoundTableNumber)}" class="round-table-chip ${statusClass} ${Number(table.table_number) === Number(state.activeRoundTableNumber) ? "is-active" : ""}" data-round-table-select="${escapeHtml(table.table_number)}"><span>Table ${escapeHtml(table.table_number)}</span><strong>${escapeHtml(assigned)} / ${escapeHtml(slotCount)}</strong></button>`;
}

function renderSelectedRoundTablePanel(table = {}, plan = {}) {
  const tableNumber = table.table_number || state.activeRoundTableNumber || 1;
  const slotCount = plan.config?.working_seats_per_table || 9;
  const seats = table.seats || [];
  return `
    <article class="round-table-selected-panel" data-round-table-card data-table-number="${escapeHtml(tableNumber)}">
      <div class="round-table-selected-header">
        <div>
          <p class="eyebrow">Selected table</p>
          <h4>Table ${escapeHtml(tableNumber)}</h4>
          <p>${escapeHtml(table.assigned_count || 0)} / ${escapeHtml(slotCount)} assigned · ${escapeHtml(table.status || "Needs Assignment")}</p>
        </div>
        <div class="tag-stack">${tag(table.status || "Needs Assignment")}${state.roundTableEditMode ? tag("Editing") : tag("View Mode")}</div>
      </div>
      <div class="meta-list compact-meta">
        ${meta("Remaining slots", table.remaining_slots)}
        ${meta("Last updated", table.updated_at)}
        ${meta("Updated by", table.updated_by)}
      </div>
      <label><span>Table notes</span><textarea data-table-notes ${state.roundTableEditMode ? "" : "readonly"} placeholder="Notes for this table">${escapeHtml(table.notes || "")}</textarea></label>
      <div class="seat-grid single-table-seat-grid">
        ${seats.map((seat) => renderRoundTableSeat(tableNumber, seat)).join("")}
      </div>
      <div class="round-table-save-bar">
        <button type="button" data-round-table-save-table="${escapeHtml(tableNumber)}" ${state.roundTableEditMode ? "" : "disabled"}>Save changes</button>
        <button type="button" data-round-table-clear-table="${escapeHtml(tableNumber)}" ${state.roundTableEditMode ? "" : "disabled"}>Clear selected table</button>
        <button type="button" data-round-table-edit-toggle>${state.roundTableEditMode ? "Cancel" : "Edit assignments"}</button>
      </div>
    </article>
  `;
}

function renderRoundTableCard(table = {}, plan = {}) {
  const seats = table.seats || [];
  const tableNumber = table.table_number;
  const slotCount = plan.config?.working_seats_per_table || 9;
  return `
    <details class="round-table-card" data-round-table-card data-table-number="${escapeHtml(tableNumber)}">
      <summary>
        <span>Table ${escapeHtml(tableNumber)}</span>
        <span class="summary-hint">${escapeHtml(table.assigned_count || 0)} / ${escapeHtml(slotCount)} assigned · ${escapeHtml(table.status || "Needs Assignment")}</span>
      </summary>
      <div class="round-table-card-body">
        <div class="meta-list compact-meta">
          ${meta("Status", table.status || "Needs Assignment")}
          ${meta("Remaining slots", table.remaining_slots)}
          ${meta("Last updated", table.updated_at)}
          ${meta("Updated by", table.updated_by)}
        </div>
        <label><span>Table notes</span><textarea data-table-notes placeholder="Notes for this table">${escapeHtml(table.notes || "")}</textarea></label>
        <div class="seat-grid">
          ${seats.map((seat) => renderRoundTableSeat(tableNumber, seat)).join("")}
        </div>
        <div class="contact-actions">
          <button type="button" data-round-table-save-table="${escapeHtml(tableNumber)}">Save table</button>
          <button type="button" data-round-table-clear-table="${escapeHtml(tableNumber)}">Clear table</button>
        </div>
      </div>
    </details>
  `;
}

function renderRoundTableSeat(tableNumber, seat = {}) {
  const seatNumber = seat.seat_number;
  const locked = !state.roundTableEditMode;
  const seatKey = `${tableNumber}-${seatNumber}`;
  const editingSeat = state.roundTableEditMode && state.activeSeatEditor === seatKey;
  const assigned = Boolean(seat.guest_name);
  const noteFlag = seat.notes ? " · Notes" : "";
  if (!editingSeat) {
    return `
      <div class="seat-slot seat-slot-summary" data-seat-slot data-table-number="${escapeHtml(tableNumber)}" data-seat-number="${escapeHtml(seatNumber)}">
        <div class="seat-slot-header">
          <strong>Seat ${escapeHtml(seatNumber)}</strong>
          ${tag(seat.assignment_status || "Guest Needed")}
        </div>
        <div class="seat-assignment-summary">
          <strong>${escapeHtml(seat.guest_name || "Guest Needed")}</strong>
          ${seat.guest_company ? `<span>${escapeHtml(seat.guest_company)}</span>` : ""}
          ${seat.dietary_flag ? `<span>${escapeHtml(seat.dietary_flag)}</span>` : ""}
          ${seat.notes ? `<span>${escapeHtml(`Notes: ${seat.notes}`)}</span>` : ""}
        </div>
        <div class="contact-actions seat-actions">
          ${locked ? `<span class="seat-edit-hint">Tap Edit assignments to assign guests.</span>` : `<button type="button" data-round-table-edit-seat="${escapeHtml(seatKey)}">${assigned ? "Change" : "Assign guest"}</button>${assigned ? `<button type="button" data-round-table-clear-seat>Clear</button>` : ""}`}
        </div>
        <input type="hidden" data-seat-guest-id value="${escapeHtml(seat.guest_id || "")}">
        <input type="hidden" data-seat-existing-status value="${escapeHtml(seat.assignment_status || "Guest Needed")}">
        <input type="hidden" data-seat-existing-summary value="${escapeHtml(`${assignmentLabel(seat)}${noteFlag}`)}">
      </div>
    `;
  }
  return `
    <div class="seat-slot" data-seat-slot data-table-number="${escapeHtml(tableNumber)}" data-seat-number="${escapeHtml(seatNumber)}">
      <div class="seat-slot-header">
        <strong>Seat ${escapeHtml(seatNumber)}</strong>
        ${tag(seat.assignment_status || "Guest Needed")}
      </div>
      <label><span>Assign guest</span><input data-seat-guest list="round-table-guest-options" value="${escapeHtml(assignmentLabel(seat) === "Guest Needed" ? "" : assignmentLabel(seat))}" placeholder="Guest Needed" ${locked ? "readonly" : ""}></label>
      <p class="seat-edit-hint">Search Guests / Namecards by name or company. Manual entries are marked as not in the guest list.</p>
      <div class="seat-fields">
        <label><span>Company</span><input data-seat-company value="${escapeHtml(seat.guest_company || "")}" placeholder="Company" ${locked ? "readonly" : ""}></label>
        <label><span>Category</span><input data-seat-category value="${escapeHtml(seat.guest_category || "")}" placeholder="Category" ${locked ? "readonly" : ""}></label>
        <label><span>Dietary/allergy flag</span><input data-seat-dietary value="${escapeHtml(seat.dietary_flag || "")}" placeholder="Safe flag only" ${locked ? "readonly" : ""}></label>
        <label><span>Status</span><select data-seat-status ${locked ? "disabled" : ""}>
          ${["Guest Needed", "Assigned", "Needs Confirmation", "VIP / Reserved", "Empty / Not Used"].map((status) => `<option ${status === (seat.assignment_status || "Guest Needed") ? "selected" : ""}>${escapeHtml(status)}</option>`).join("")}
        </select></label>
      </div>
      <label><span>Notes</span><input data-seat-notes value="${escapeHtml(seat.notes || "")}" placeholder="Safe operational note" ${locked ? "readonly" : ""}></label>
      <input type="hidden" data-seat-guest-id value="${escapeHtml(seat.guest_id || "")}">
      <button type="button" data-round-table-clear-seat ${locked || !assigned ? "disabled" : ""}>Clear guest</button>
    </div>
  `;
}

function collectRoundTableAssignmentsFromDom() {
  const plan = state.roundTablePlan || roundTableSeedPlan();
  const byKey = new Map((plan.assignments || []).map((seat) => [`${seat.table_number}-${seat.seat_number}`, seat]));
  $$("[data-seat-slot]").forEach((slot) => {
    const tableNumber = Number(slot.dataset.tableNumber);
    const seatNumber = Number(slot.dataset.seatNumber);
    const guestInput = slot.querySelector("[data-seat-guest]");
    if (!guestInput) return;
    const guest = guestBySelectorValue(guestInput?.value);
    const guestName = guest ? guest.name : text((guestInput?.value || "").split(" · ")[0]);
    const company = guest ? guest.company_display_name || guest.company || "" : text(slot.querySelector("[data-seat-company]")?.value);
    const category = guest ? (guest.category && !/not provided/i.test(guest.category) ? guest.category : guest.guest_type || "") : text(slot.querySelector("[data-seat-category]")?.value);
    const existing = byKey.get(`${tableNumber}-${seatNumber}`) || {};
    byKey.set(`${tableNumber}-${seatNumber}`, {
      ...existing,
      table_number: tableNumber,
      seat_number: seatNumber,
      guest_id: guest?.id || slot.querySelector("[data-seat-guest-id]")?.value || "",
      guest_name: guestName,
      guest_company: company,
      guest_category: category,
      dietary_flag: text(slot.querySelector("[data-seat-dietary]")?.value),
      assignment_status: text(slot.querySelector("[data-seat-status]")?.value, guestName ? "Assigned" : "Guest Needed"),
      notes: text(slot.querySelector("[data-seat-notes]")?.value) || (guestName && !guest ? "Not in guest list" : ""),
      updated_by: existing.updated_by || "",
      updated_at: existing.updated_at || "",
      created_at: existing.created_at || ""
    });
  });
  return [...byKey.values()];
}

function duplicateRoundTableAssignment(assignments, tableNumber) {
  const seen = new Map();
  for (const seat of assignments) {
    const key = seat.guest_id || slug(seat.guest_name || "");
    if (!key || !seat.guest_name) continue;
    const previous = seen.get(key);
    if (previous && (previous.table_number !== seat.table_number || previous.seat_number !== seat.seat_number)) {
      const involvesTable = previous.table_number === tableNumber || seat.table_number === tableNumber;
      if (involvesTable) return { previous, current: seat };
    }
    seen.set(key, seat);
  }
  return null;
}

function roundTableCsv(plan = state.roundTablePlan) {
  const rows = [["table number", "seat number", "guest name", "company", "category", "dietary flag", "notes", "status"]];
  (plan?.assignments || []).forEach((seat) => {
    rows.push([seat.table_number, seat.seat_number, seat.guest_name || "Guest Needed", seat.guest_company, seat.guest_category, seat.dietary_flag, seat.notes, seat.assignment_status]);
  });
  return rows.map((row) => row.map((cell) => `"${String(cell || "").replace(/"/g, '""')}"`).join(",")).join("\n");
}

function roundTableSummary(plan = state.roundTablePlan) {
  return (plan?.tables || []).map((table) => {
    const seats = (table.seats || []).map((seat) => `  Seat ${seat.seat_number}: ${assignmentLabel(seat)} (${seat.assignment_status || "Guest Needed"})`).join("\n");
    return `Table ${table.table_number} — ${table.assigned_count || 0}/${plan.config?.working_seats_per_table || 9}\n${seats}`;
  }).join("\n\n");
}

const hallTabs = [
  ["overview", "Overview"],
  ["round-tables", "Round Tables"],
  ["theatre", "Theatre Seating"],
  ["stage", "Stage / Technical"],
  ["rehearsals", "Rehearsals"],
  ["files", "Files"]
];

function hallLayoutByTitle(pattern) {
  return (state.data.horizonsHallLayouts || []).find((item) => pattern.test(item.title || ""));
}

function hallRelatedDocuments() {
  return (state.data.documents || []).filter((doc) => /HORIZONS Hall Layouts|Round Table|Theatre Seating|Stage Design|Updated Table Layout Needed/i.test(`${doc.category} ${doc.title} ${doc.relatedLocation || ""}`));
}

function hallRelatedRehearsals() {
  return (state.data.rehearsals || []).filter((item) => /HORIZONS Hall|HORIZONS Connect|VIP 100 Debate/i.test(`${item.rehearsalName || item.title} ${item.relatedSession || ""} ${item.relatedLayout || ""} ${item.location || ""}`));
}

function renderHorizonsHallControlPanel(location = {}) {
  const plan = state.roundTablePlan || roundTableSeedPlan();
  const summary = plan.summary || {};
  const assignedCount = summary.assigned_count || 0;
  const workingSlots = summary.working_slots || 90;
  const panelOpen = state.activeHallTab !== "overview" || state.roundTableEditMode;
  return `
    <details class="hall-control-panel" data-hall-control-panel ${panelOpen ? "open" : ""}>
      <summary>
        <span>
          <strong>HORIZONS Hall Control Panel</strong>
          <small>Main stage / HORIZONS Connect / debate / round table setup.</small>
        </span>
        <span class="tag-stack">${tag("Round table seating: Needs Assignment")}${tag("Theatre plan: Available")}${tag("Stage design: Available")}${tag("Seat count: Needs Confirmation")}</span>
      </summary>
      <div class="hall-panel-body">
        <div class="hall-tabs" role="tablist" aria-label="HORIZONS Hall control panel">
          ${hallTabs.map(([id, label]) => `<button type="button" role="tab" aria-selected="${state.activeHallTab === id}" class="hall-tab ${state.activeHallTab === id ? "is-active" : ""}" data-hall-tab="${escapeHtml(id)}">${escapeHtml(label)}</button>`).join("")}
        </div>
        <div class="hall-tab-panel">
          ${renderHallTabContent(state.activeHallTab, location)}
        </div>
      </div>
    </details>
  `;
}

function renderHallControlCentre(location = {}) {
  if (!state.hallControlCentreOpen) return "";
  const activeHallLabel = hallTabs.find(([id]) => id === state.activeHallTab)?.[1] || "Overview";
  return `
    <div class="hall-centre-shell" data-hall-centre>
      <button type="button" class="hall-centre-backdrop" data-close-hall-centre aria-label="Close HORIZONS Hall Control Centre"></button>
      <section class="hall-centre-panel app-tool-panel" role="dialog" aria-modal="true" aria-label="HORIZONS Hall Control Centre">
        <header class="hall-centre-header app-tool-header">
          <div class="hall-centre-title-block">
            <p class="eyebrow">HORIZONS Hall</p>
            <h2>HORIZONS Hall Control Centre</h2>
            <p>Layouts, seating assignments, stage references, and HORIZONS Hall operating links.</p>
            <details class="tool-status-summary">
              <summary>Status summary</summary>
              <div class="tag-stack">${tag("Round Tables: Needs Assignment")}${tag("Theatre Plan: Available")}${tag("Stage Design: Available")}${tag("Seat Count: Needs Confirmation")}</div>
            </details>
          </div>
          <div class="hall-centre-actions app-tool-actions">
            <a href="#call-sheet" data-close-hall-centre>Open Call Sheet</a>
            <details class="app-tool-more">
              <summary>More</summary>
              <div>
                <button type="button" data-hall-tab-jump="files">Open Documents</button>
                <button type="button" data-close-hall-centre>Close</button>
              </div>
            </details>
          </div>
          <button type="button" class="app-tool-close" data-close-hall-centre aria-label="Close HORIZONS Hall Control Centre">×</button>
        </header>
        <label class="app-tool-section-select">
          <span>Section</span>
          <select data-hall-section-select aria-label="HORIZONS Hall Control Centre section">
            ${hallTabs.map(([id, label]) => `<option value="${escapeHtml(id)}" ${state.activeHallTab === id ? "selected" : ""}>${escapeHtml(label)}</option>`).join("")}
          </select>
          <small>Current: ${escapeHtml(activeHallLabel)}</small>
        </label>
        <div class="hall-panel-body hall-centre-body app-tool-body" data-hall-scroll>
          <div class="hall-tabs app-tool-tabs" role="tablist" aria-label="HORIZONS Hall control centre">
            ${hallTabs.map(([id, label]) => `<button type="button" role="tab" aria-selected="${state.activeHallTab === id}" class="hall-tab ${state.activeHallTab === id ? "is-active" : ""}" data-hall-tab="${escapeHtml(id)}">${escapeHtml(label)}</button>`).join("")}
          </div>
          <div class="hall-tab-panel hall-centre-tab-panel app-tool-card">
            ${renderHallTabContent(state.activeHallTab, location)}
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderHallTabContent(tab, location) {
  if (tab === "round-tables") return renderRoundTableAssignmentSystem(hallLayoutByTitle(/Round Table/i) || {});
  if (tab === "theatre") return renderHallTheatreTab();
  if (tab === "stage") return renderHallStageTab();
  if (tab === "rehearsals") return renderHallRehearsalsTab();
  if (tab === "files") return renderHallFilesTab();
  return renderHallOverviewTab(location);
}

function renderHallOverviewTab(location = {}) {
  const plan = state.roundTablePlan || roundTableSeedPlan();
  const assigned = plan.summary?.assigned_count || 0;
  return `
    <div class="hall-overview-grid">
      <div class="hall-summary-card">
        <p class="eyebrow">HORIZONS Hall Overview</p>
        <h3>Location control panel</h3>
        <p>Main stage / HORIZONS Connect / debate / round table setup.</p>
        <div class="meta-list compact-meta">
          ${meta("Location", "HORIZONS Hall")}
          ${meta("Primary use", "HORIZONS Connect / debate / round table moment")}
          ${meta("Current active task", "Round table guest assignments")}
          ${meta("Round table progress", `${assigned} / ${plan.summary?.working_slots || 90} assigned`)}
          ${meta("Status", "Needs Assignment")}
          ${meta("Seat count", "Needs Confirmation")}
        </div>
        <div class="contact-actions">
          <button type="button" data-hall-tab-jump="round-tables">Open Round Tables</button>
          <button type="button" data-hall-tab-jump="theatre">Open Theatre Seating</button>
          <button type="button" data-hall-tab-jump="stage">Open Stage Design</button>
          <button type="button" data-hall-tab-jump="files">Open Documents</button>
        </div>
      </div>
      <div class="hall-action-card">
        <strong>Key layout references</strong>
        <ul class="mini-list">
          <li>HORIZONS Hall Theatre Seating Plan</li>
          <li>HORIZONS Hall Round Table Layout</li>
          <li>HORIZONS Hall Stage Design / Technical Layout</li>
        </ul>
        <p class="summary-hint">${escapeHtml(location.layoutsSummary || "Theatre, round-table, and technical layout references are connected here.")}</p>
      </div>
    </div>
  `;
}

function renderHallTheatreTab() {
  const theatre = hallLayoutByTitle(/Theatre Seating/i) || {};
  return `
    <div class="hall-tab-card hall-reference-card">
      <div class="card-header hall-reference-header">
        <h3>HORIZONS Hall Theatre Seating Plan</h3>
        <div class="tag-stack">${tag(theatre.status || "Available")}${tag("Reserved Seats: Needs Assignment")}</div>
      </div>
      <p>${escapeHtml(theatre.summary || "Read-only theatre-style reference for HORIZONS Connect and the 12:00-13:00 debate.")}</p>
      <div class="meta-list compact-meta">
        ${meta("Layout type", theatre.layoutType || "Theatre-style")}
        ${meta("Capacity", theatre.capacity || "160 seated")}
        ${meta("Related sessions", (theatre.relatedSessions || ["HORIZONS Connect opening 90 minutes", "12:00-13:00 debate"]).join("; "))}
      </div>
      <div class="contact-actions">
        <a href="${escapeHtml(theatre.sourceAsset || "assets/horizons-hall-layouts/horizons-hall-theatre-seating-plan-x160.pdf")}" target="_blank" rel="noreferrer">Open theatre plan</a>
        <a href="${escapeHtml(theatre.sourceAsset || "assets/horizons-hall-layouts/horizons-hall-theatre-seating-plan-x160.pdf")}" download>Download PDF</a>
      </div>
      ${detailsBlock("Reserved Seats — Needs Assignment", [], `<div class="location-schedule">${(theatre.reservedSeatRows || [
        { seat: "CEO seat — Needs Assignment", personName: "Needs Assignment", company: "", reason: "CEO / leadership reserved seat", status: "Needs Assignment", notes: "" },
        { seat: "Leadership seats — Needs Assignment", personName: "Needs Assignment", company: "", reason: "Leadership reserved seats", status: "Needs Assignment", notes: "" },
        { seat: "Speaker seats — Needs Assignment", personName: "Needs Assignment", company: "", reason: "Speaker reserved seats", status: "Needs Assignment", notes: "" },
        { seat: "VIP / Aream seats — Needs Assignment", personName: "Needs Assignment", company: "Aream & Co.", reason: "VIP / client reserved seating", status: "Needs Assignment", notes: "" },
        { seat: "Reserved signage placement — Needs Confirmation", personName: "", company: "", reason: "Reserved signage placement", status: "Needs Confirmation", notes: "" }
      ]).map((row) => `<div class="supplier-time-block"><strong>${escapeHtml(row.seat)}</strong><div class="meta-list compact-meta">${meta("Person", row.personName)}${meta("Company", row.company)}${meta("Reason", row.reason)}${meta("Status", row.status)}${meta("Notes", row.notes)}</div></div>`).join("")}</div>`)}
    </div>
  `;
}

function renderHallStageTab() {
  const stage = hallLayoutByTitle(/Stage Design|Technical/i) || {};
  return `
    <div class="hall-tab-card hall-reference-card">
      <div class="card-header hall-reference-header">
        <h3>HORIZONS Hall Stage Design / Technical Layout</h3>
        <div class="tag-stack">${tag(stage.status || "Available")}${tag("Read-only production reference")}</div>
      </div>
      <p>${escapeHtml(stage.summary || "Stage design, LED wall / rear panel and production reference for HORIZONS Hall.")}</p>
      <div class="meta-list compact-meta">
        ${meta("Related team", "Clownfish / production")}
        ${meta("Related sections", "Rehearsals; Call Sheet; Speaker Content; Documents")}
        ${meta("Source", stage.sourceFile)}
      </div>
      <div class="contact-actions">
        <a href="${escapeHtml(stage.sourceAsset || "assets/horizons-hall-layouts/horizons-hall-stage-design-technical-layout.pdf")}" target="_blank" rel="noreferrer">Open stage design PDF</a>
        <a href="${escapeHtml(stage.sourceAsset || "assets/horizons-hall-layouts/horizons-hall-stage-design-technical-layout.pdf")}" download>Download PDF</a>
      </div>
    </div>
  `;
}

function renderHallRehearsalsTab() {
  const rehearsals = hallRelatedRehearsals();
  return `
    <div class="hall-tab-card">
      <div class="card-header"><h3>HORIZONS Hall Rehearsals</h3><div class="tag-stack">${tag(`${rehearsals.length} linked`)}</div></div>
      <p>Hall-related rehearsal references only. Full rehearsal records remain in Programme.</p>
      <div class="location-schedule">
        ${rehearsals.slice(0, 8).map((item) => `
          <details class="details rehearsal-mini-card">
            <summary><span>${escapeHtml(item.rehearsalName || item.title)}</span><span class="summary-hint">${escapeHtml([item.date, item.time, item.status].filter(Boolean).join(" · "))}</span></summary>
            <div class="meta-list compact-meta">${meta("Location", item.location)}${meta("Attendees", item.attendees || item.requiredPeople)}${meta("Purpose", item.purpose)}${meta("Related session", item.relatedSession)}${meta("Related layout", item.relatedLayout)}${meta("Notes", item.notes)}</div>
          </details>
        `).join("") || `<p>No HORIZONS Hall rehearsal records linked yet.</p>`}
      </div>
    </div>
  `;
}

function renderHallFilesTab() {
  const docs = hallRelatedDocuments();
  const missing = state.data.roundTableSeatingPlan?.missingAction || {};
  return `
    <div class="hall-tab-card">
      <div class="card-header"><h3>HORIZONS Hall Files</h3><div class="tag-stack">${tag(`${docs.length} files / records`)}</div></div>
      <div class="hall-files-grid">
        ${docs.map((doc) => {
          const docUrl = doc.link || doc.url || doc.file || doc.sourceAsset || "";
          const downloadUrl = doc.download || docUrl;
          return `
          <article class="hall-file-card">
            <div class="hall-file-card-head">
              <strong>${escapeHtml(doc.title)}</strong>
              ${tag(doc.status || "Available")}
            </div>
            <p>${escapeHtml(doc.description || doc.notes || "Related HORIZONS Hall file.")}</p>
            <div class="meta-list compact-meta">${meta("Category", doc.category)}${meta("Type / capacity", doc.capacity || doc.type)}</div>
            <div class="contact-actions">${docUrl ? `<a href="${escapeHtml(docUrl)}" target="_blank" rel="noreferrer">Open</a><a href="${escapeHtml(downloadUrl)}" download>Download</a>` : `<span class="tag tag-waiting">File Needed</span>`}</div>
            ${detailsBlock("Source trace", [], `<div class="meta-list compact-meta">${meta("Original filename", doc.sourceFile || doc.sourceTrace)}${meta("Notes", doc.sourceTrace || doc.notes)}</div>`)}
          </article>
        `; }).join("")}
        <article class="hall-file-card action-needed">
          <div class="hall-file-card-head">
            <strong>${escapeHtml(missing.title || "Updated Table Layout Needed from Kirsty / Clownfish")}</strong>
            ${tag(missing.status || "Needs Confirmation")}
          </div>
          <p>${escapeHtml(missing.details || "Please confirm final table count, seats per table, table numbering, and whether the uploaded 80-seat layout is final.")}</p>
          <div class="meta-list compact-meta">${meta("Status", missing.status || "Needs Confirmation")}${meta("Priority", missing.priority || "High")}</div>
        </article>
      </div>
    </div>
  `;
}

function layoutCards(ids = []) {
  const records = layoutRecords(ids);
  if (!records.length) return "";
  return `<div class="cards-grid compact-grid hall-layout-grid">${records.map((item) => `
    <article class="mini-card hall-layout-card">
      <div class="card-header"><h4>${escapeHtml(item.title)}</h4><div class="tag-stack">${tag(item.status)}</div></div>
      <p>${escapeHtml(item.summary || item.layoutType)}</p>
      <div class="meta-list compact-meta">
        ${meta("Type", item.layoutType)}
        ${meta("Capacity", item.capacity)}
      </div>
      ${item.reservedSeatRows?.length ? detailsBlock("Reserved seats placeholder", [], `<div class="location-schedule">${item.reservedSeatRows.map((row) => `<div class="supplier-time-block"><strong>${escapeHtml(row.seat)}</strong><p>${escapeHtml(row.reason)}</p><div class="meta-list compact-meta">${meta("Person", row.personName)}${meta("Company", row.company)}${meta("Status", row.status)}${meta("Notes", row.notes)}</div></div>`).join("")}</div>`) : ""}
      ${item.tablePlaceholders?.length ? detailsBlock("Table assignment placeholders", [], `<div class="location-schedule">${item.tablePlaceholders.map((row) => `<div class="supplier-time-block"><strong>${escapeHtml(row.table)}</strong><p>${escapeHtml(row.guestAssignments)}</p><div class="meta-list compact-meta">${meta("Capacity", row.capacity)}${meta("Status", row.status)}${meta("Notes", row.notes)}</div></div>`).join("")}</div>`) : ""}
      <div class="contact-actions"><a href="${escapeHtml(item.sourceAsset)}" target="_blank" rel="noreferrer">Open layout</a><a href="${escapeHtml(item.sourceAsset)}" download>Download PDF</a></div>
      ${item.assignmentSystemId ? renderRoundTableAssignmentSystem(item) : ""}
    </article>
  `).join("")}</div>`;
}

function renderArtwork() {
  const items = liveItems(state.data.artworkSignage || []).filter((item) => !/breakfast|coffee break|lunch|dinner|catering/i.test(`${item.itemName} ${item.type} ${item.notes}`));
  setHtml("[data-artwork]", items.map((item) => card({
    title: item.itemName,
    status: item.status,
    department: item.type,
    body: `<p>${escapeHtml(item.positioningNotes || item.placementDescription || "Placement details needed.")}</p>${detailsBlock("Open signage visual", [], item.referenceImage || (item.artworkFile || "").match(/\.(png|jpe?g|webp)$/i) ? `<figure class="reference-card"><img src="${escapeHtml(item.referenceImage || item.artworkFile)}" alt="${escapeHtml(item.itemName)} reference" loading="lazy"><figcaption>${escapeHtml(item.type || "Artwork reference")}</figcaption></figure>` : `<div class="image-placeholder"><strong>${escapeHtml(item.artworkFile || "File Needed")}</strong><span>Artwork preview / reference image needed.</span></div>`)}`,
    metadata: meta("Artwork file", item.artworkFile) + meta("Print size", item.printSize) + meta("Exact location", item.exactLocation || item.locationPlacement) + meta("Placement", item.placementDescription || item.positioningNotes) + meta("Who installs", item.installer || item.supplierSetupTeam) + meta("Install timing", item.installTiming) + meta("Owner", item.owner) + meta("Supplier / setup team", item.supplierSetupTeam) + meta("Reference image", item.referenceImage) + meta("Notes", item.notes),
    updateId: item.updateId
  })).join("") || empty("No artwork or signage records available yet."));
}

function renderStaffLists() {
  const groups = state.data.staffLists || {};
  setHtml("[data-staff]", Object.entries(groups).map(([group, people]) => card({
    title: group,
    status: people.length ? `${people.length} listed` : "Info Needed",
    body: people.length ? list(people.slice(0, 8).map((person) => `${person.name} · ${person.role || person.responsibility || "Role needed"}`)) : `<p>Staff list needed.</p>`,
    metadata: meta("Purpose", "Connected to Contacts, Who Do I Call, and Call Sheet."),
    footer: detailsBlock("Open staff details", [], people.length ? `<div class="location-schedule">${people.map((person) => `
      <div class="supplier-time-block">
        <strong>${escapeHtml(person.name)}</strong>
        <div class="meta-list compact-meta">${meta("Company", person.company)}${meta("Role", person.role)}${meta("Responsibility", person.responsibility)}${meta("Phone", person.phone)}${meta("Email", person.email || person.emailStatus)}${meta("Dietary requirements", person.dietaryRequirements)}${meta("Location responsibility", person.locationAssignment || person.showOperativeFor)}${meta("WhatsApp", person.whatsappLink)}${meta("Slack", person.slackHandle || person.slackUserId)}${meta("Days onsite", person.daysOnsite)}${meta("Notes", person.notes || "Needs Confirmation")}</div>
      </div>
    `).join("")}</div>` : `<p>Add staff list details.</p>`)
  })).join(""));
}

function renderCventComparison() {
  setHtml("[data-cvent]", liveItems(state.data.cventComparison || []).map((item) => card({
    title: item.item,
    status: item.status,
    department: item.area,
    body: `<p>${escapeHtml(item.difference)}</p>`,
    metadata: meta("Website data", item.websiteData) + meta("Cvent data", item.cventData) + meta("Owner", item.owner) + meta("Decision needed", item.decisionNeeded) + meta("Notes", item.notes),
    updateId: `cvent:${slug(item.item)}`
  })).join("") || empty("No Cvent comparison records available yet."));
}

function renderMissingFiles() {
  setHtml("[data-missing-files]", (state.data.missingFiles || []).map((item) => card({
    title: item.fileNeeded,
    status: item.status,
    department: item.category,
    body: `<p>${escapeHtml(item.neededFor)}</p>`,
    metadata: meta("Owner", item.owner) + meta("Category", item.category) + meta("Notes", item.notes),
    updateId: item.updateId
  })).join("") || empty("No missing file records available yet."));
}

function renderSlackIntegration() {
  const channels = state.data.meta?.slackChannels || [];
  const mapping = state.data.meta?.slackEventMapping || {};
  const env = state.data.meta?.slackEnvironmentVariables || [];
  setHtml("[data-slack]", [
    card({
      title: "Slack integration status",
      status: "Stub Ready",
      body: `<p>Use copy/open actions now. Automated posting needs a backend or serverless endpoint with webhook environment variables.</p>`,
      metadata: meta("No frontend secrets", "Webhook URLs and Slack tokens must not be stored in GitHub Pages JavaScript.") + meta("Environment variables", env.join(", ")),
      footer: `<div class="contact-actions"><button type="button" data-copy-slack-summary="main">Copy Slack Update</button><a href="slack://open" target="_blank" rel="noreferrer">Open Slack</a></div>`,
      updateId: "slack:integration"
    }),
    card({
      title: "Recommended Slack channels",
      status: `${channels.length} channels`,
      body: list(channels.map((item) => `${item.channel} · ${item.purpose}`)),
      metadata: "",
      updateId: "slack:channels"
    }),
    card({
      title: "Website event → Slack channel map",
      status: "Ready for backend",
      body: list(Object.entries(mapping).map(([event, channel]) => `${event} → ${channel}`)),
      metadata: meta("Rule", "Website remains the source of truth; Slack is the communication layer."),
      updateId: "slack:mapping"
    })
  ].join(""));
}

function renderDataHealth() {
  setHtml("[data-data-health]", (state.data.dataHealthDashboard || []).map((item) => card({
    title: item.metric,
    status: item.status,
    body: `<p><strong>${escapeHtml(String(item.count))}</strong> item${Number(item.count) === 1 ? "" : "s"}</p>`,
    metadata: meta("Action", item.action),
    updateId: `data-health:${slug(item.metric)}`
  })).join("") || empty("No data health metrics available."));
}

function renderDuplicateReview() {
  setHtml("[data-duplicate-review]", (state.data.duplicateReview || []).map((item) => card({
    title: item.duplicateGroupId,
    status: item.status,
    department: item.itemType,
    body: `<p>${escapeHtml(item.reason)}</p>`,
    metadata: meta("Possible duplicates", item.possibleDuplicates) + meta("Recommended canonical", item.recommendedCanonicalRecord) + meta("Confidence", item.confidence) + meta("Reviewed by", item.reviewedBy) + meta("Notes", item.notes),
    updateId: `duplicate:${slug(item.duplicateGroupId)}`
  })).join("") || empty("No exact duplicate groups detected in this pass."));
}

function renderSiteAudit() {
  setHtml("[data-site-audit]", (state.data.siteDataUxAudit || []).map((item) => card({
    title: item.area,
    status: item.status,
    department: item.issueType,
    body: `<p>${escapeHtml(item.whatWasFound)}</p>`,
    metadata: meta("Impact", item.impact) + meta("Recommended fix", item.recommendedFix),
    updateId: `site-audit:${slug(item.area)}:${slug(item.issueType)}`
  })).join("") || empty("No site audit records available."));
}

function renderDecisions() {
  setHtml("[data-decisions]", liveItems(state.data.decisions).map((item) => card({
    title: firstMeaningful(item.decisionNeeded, item.decision, item.issue, "Decision needed"),
    status: item.status,
    body: `<p>${escapeHtml(firstMeaningful(item.whyItMatters, item.notes, "Awaiting final detail."))}</p>${asList(item.options).length ? `<h3>Options</h3>${list(item.options)}` : ""}${text(item.recommendation) ? `<h3>Recommendation</h3><p>${escapeHtml(item.recommendation)}</p>` : ""}`,
    metadata: meta("Owner", item.owner) + meta("Approver", item.approver) + meta("Deadline", item.deadline) + meta("Latest update", item.latestUpdate) + meta("Workstream", item.relatedWorkstream || item.workstream || item.section),
    updateId: item.updateId
  })).join(""));
}

function renderDocumentTabs() {
  const categories = ["All", "Call Sheets", "Menus", "Print Assets", "Signage / Easel Boards", "Swag / Guest Materials", "Podcast", "Supplier Docs", "Stage / Technical", "Travel / Flights", "Venue Docs", "Source Data", "Maps", "Site Map", "Seating Plans", "Room Layouts", "Brand / Logos", "Style Guide", "Runbooks", "Production Documents", "Guest Experience", "HORIZONS House", "Room Drops", "Content Capture", "Presentations / Speeches", "Event Content Documents", "Other"];
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
    footer: (item.link || item.url) ? `<a class="button button-secondary" href="${escapeHtml(item.link || item.url)}" target="_blank" rel="noopener noreferrer">Open reference</a>` : `<span class="tag tag-waiting">File needed</span>`,
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
  const grid = $("[data-countdown-grid]");
  const fallback = $("[data-countdown-fallback]");
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
    if (grid) grid.hidden = false;
    if (fallback) {
      fallback.hidden = true;
      fallback.textContent = "";
    }
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
  const sections = APP_GROUPS.filter((group) => document.getElementById(group.target));
  const progress = $("[data-section-progress]");
  if (progress) {
    progress.innerHTML = sections.map((group) => `<a href="#${group.target}" data-progress-link="${group.id}"><span></span><em>${escapeHtml(group.label)}</em></a>`).join("");
  }
  setHtml("[data-section-drawer-links]", sections.map((group) => `<a href="#${group.target}" data-drawer-section="${group.id}">${escapeHtml(group.label)}</a>`).join(""));
  const jump = $("[data-section-jump]");
  const jumpNext = $("[data-section-next]", jump || document);
  const jumpCurrent = $("[data-section-current]", jump || document);
  let ticking = false;
  const setActive = (groupId) => {
    const index = sections.findIndex((group) => group.id === groupId);
    const current = sections[index] || sections[0];
    const next = sections[Math.min(sections.length - 1, index + 1)] || current;
    setActiveGroupForTarget(current?.target || "overview");
    $$("[data-progress-link]").forEach((link) => link.classList.toggle("is-active", link.dataset.progressLink === current?.id));
    $$("[data-drawer-section]").forEach((link) => link.classList.toggle("is-active", link.dataset.drawerSection === current?.id));
    if (jumpCurrent) jumpCurrent.textContent = current?.label || "Overview";
    if (jumpNext) {
      jumpNext.href = `#${next.target}`;
      jumpNext.textContent = index >= sections.length - 1 ? "End" : `Next: ${next.label}`;
      jumpNext.classList.toggle("is-muted", index >= sections.length - 1);
    }
    if (jump) jump.classList.toggle("is-visible", window.scrollY > 360);
  };
  const updateActive = () => {
    ticking = false;
    const headerOffset = ($("[data-header]")?.offsetHeight || 72) + 48;
    const scrollPosition = window.scrollY + headerOffset;
    const orderedSections = (APP_GROUPS.find((group) => group.id === document.body.dataset.activeGroup) || sections[0])?.sections
      .map((id) => ({ id, groupId: groupBySection[id], element: document.getElementById(id) }))
      .filter((section) => section.element)
      .sort((a, b) => a.element.offsetTop - b.element.offsetTop);
    let activeSection = orderedSections[0]?.id || "";
    orderedSections.forEach(({ id, element }) => {
      if (element.offsetTop <= scrollPosition) activeSection = id;
    });
    const activeGroup = groupBySection[activeSection] || document.body.dataset.activeGroup || "overview";
    if (activeGroup) setActive(activeGroup);
    $$("[data-app-subnav] a").forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${activeSection}`));
  };
  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateActive);
  };
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("hashchange", () => {
    setActiveGroupForTarget((location.hash || "#overview").replace("#", ""));
    requestUpdate();
  });
  window.HORIZONS_UPDATE_SECTION_NAV = requestUpdate;
  requestUpdate();
}

function setupBackToTopAndAdmin() {
  APP_GROUPS.forEach((group, index) => {
    const section = document.getElementById(group.sections.filter((id) => document.getElementById(id)).at(-1));
    if (!section || section.querySelector("[data-section-end-nav]")) return;
    const prev = APP_GROUPS[Math.max(0, index - 1)];
    const next = APP_GROUPS[Math.min(APP_GROUPS.length - 1, index + 1)];
    section.querySelector(".container")?.insertAdjacentHTML("beforeend", `
      <div class="section-end-nav" data-section-end-nav>
        ${index > 0 ? `<a href="#${escapeHtml(prev.target)}">← ${escapeHtml(prev.label)}</a>` : `<span></span>`}
        <button type="button" data-scroll-top>Back to top</button>
        ${index < APP_GROUPS.length - 1 ? `<a href="#${escapeHtml(next.target)}">Next: ${escapeHtml(next.label)} →</a>` : `<span></span>`}
      </div>
    `);
  });
}

function bindEvents() {
  $("[data-menu-toggle]").addEventListener("click", (event) => {
    const open = !document.body.classList.contains("nav-open");
    document.body.classList.toggle("nav-open", open);
    event.currentTarget.setAttribute("aria-expanded", String(open));
  });
  $$("[data-nav] a").forEach((link) => link.addEventListener("click", () => {
    setActiveGroupForTarget((link.getAttribute("href") || "#overview").replace("#", ""));
    document.body.classList.remove("nav-open");
    $("[data-menu-toggle]").setAttribute("aria-expanded", "false");
  }));
  $("[data-global-search]").addEventListener("input", (event) => { state.searchQuery = event.target.value.trim(); renderSearchResults(); });
  $$("[data-filter]").forEach((select) => select.addEventListener("change", (event) => { state.filters[event.target.dataset.filter] = event.target.value; renderAll(); }));
  $$("[data-task-filter]").forEach((select) => select.addEventListener("change", (event) => { state.taskFilters[event.target.dataset.taskFilter] = event.target.value; renderTasks(); }));
  $$("[data-travel-filter]").forEach((select) => select.addEventListener("change", (event) => { state.travelFilters[event.target.dataset.travelFilter] = event.target.value; renderTravel(); }));
  $$("[data-podcast-filter]").forEach((select) => select.addEventListener("change", (event) => { state.podcastFilters[event.target.dataset.podcastFilter] = event.target.value; renderPodcast(); }));
  $$("[data-content-filter]").forEach((select) => select.addEventListener("change", (event) => { state.contentFilters[event.target.dataset.contentFilter] = event.target.value; renderContentCapture(); }));
  const menuSearch = $("[data-menu-search]");
  if (menuSearch) menuSearch.addEventListener("input", (event) => { state.menuFilters.query = event.target.value.trim(); renderMenus(); });
  $$("[data-menu-filter]").forEach((control) => control.addEventListener("change", (event) => {
    if (event.target.dataset.menuFilter === "needs") state.menuFilters.needs = event.target.checked;
    else state.menuFilters[event.target.dataset.menuFilter] = event.target.value;
    renderMenus();
  }));
  const guestSearch = $("[data-guest-search]");
  if (guestSearch) guestSearch.addEventListener("input", (event) => { state.guestFilters.query = event.target.value.trim(); renderGuests(); });
  const attendeeSearch = $("[data-attendee-search]");
  if (attendeeSearch) attendeeSearch.addEventListener("input", (event) => { state.attendeeFilters.query = event.target.value.trim(); renderAttendeeDirectory(); });
  $$("[data-attendee-filter]").forEach((select) => select.addEventListener("change", (event) => { state.attendeeFilters[event.target.dataset.attendeeFilter] = event.target.value; renderAttendeeDirectory(); }));
  const attendeeReset = $("[data-attendee-reset]");
  if (attendeeReset) attendeeReset.addEventListener("click", () => {
    state.attendeeFilters = { query: "", category: "", company: "" };
    if (attendeeSearch) attendeeSearch.value = "";
    $$("[data-attendee-filter]").forEach((select) => select.value = "");
    renderAttendeeDirectory();
  });
  document.addEventListener("input", (event) => {
    const assignedSearch = event.target.closest("[data-round-table-search]");
    if (assignedSearch) {
      const query = assignedSearch.value.trim().toLowerCase();
      $$("[data-round-table-card]").forEach((table) => {
        table.classList.toggle("is-hidden", Boolean(query) && !table.textContent.toLowerCase().includes(query));
      });
      return;
    }
    const guestInput = event.target.closest("[data-seat-guest]");
    if (guestInput) {
      const slot = guestInput.closest("[data-seat-slot]");
      const guest = guestBySelectorValue(guestInput.value);
      const clearButton = slot?.querySelector("[data-round-table-clear-seat]");
      if (guest && slot) {
        slot.querySelector("[data-seat-guest-id]").value = guest.id || "";
        slot.querySelector("[data-seat-company]").value = guest.company_display_name || guest.company || "";
        slot.querySelector("[data-seat-category]").value = guest.category && !/not provided/i.test(guest.category) ? guest.category : guest.guest_type || "";
        const status = slot.querySelector("[data-seat-status]");
        if (status && status.value === "Guest Needed") status.value = "Assigned";
      } else if (slot) {
        const status = slot.querySelector("[data-seat-status]");
        if (status) status.value = text(guestInput.value) ? "Needs Confirmation" : "Guest Needed";
      }
      if (clearButton) clearButton.disabled = !text(guestInput.value);
    }
  });
  document.addEventListener("change", (event) => {
    const hallSectionSelect = event.target.closest("[data-hall-section-select]");
    if (hallSectionSelect) {
      state.activeHallTab = hallSectionSelect.value || "overview";
      state.hallControlCentreOpen = true;
      rerenderHallCentre({ preserveScroll: false });
    }
  });
  $$("[data-guest-filter]").forEach((select) => select.addEventListener("change", (event) => { state.guestFilters[event.target.dataset.guestFilter] = event.target.value; renderGuests(); }));
  const guestReset = $("[data-guest-reset]");
  if (guestReset) guestReset.addEventListener("click", () => {
    state.guestFilters = { query: "", company: "", status: "", missing: "", quick: "all" };
    if (guestSearch) guestSearch.value = "";
    $$("[data-guest-filter]").forEach((select) => select.value = "");
    renderGuests();
  });
  $("[data-reset-filters]").addEventListener("click", () => {
    state.filters = { query: "", status: "", day: "", owner: "", location: "", department: "" };
    state.taskFilters = { department: "", owner: "", day: "", status: "", location: "" };
    state.travelFilters = { person: "", arrivalDay: "", departureDay: "", team: "", status: "" };
    state.podcastFilters = { day: "", guest: "", status: "", location: "" };
    state.contentFilters = { owner: "", day: "", department: "", location: "", priority: "", status: "" };
    state.guestFilters = { query: "", company: "", status: "", missing: "", quick: "all" };
    state.attendeeFilters = { query: "", category: "", company: "" };
    state.menuFilters = { query: "", date: "", location: "", meal: "", needs: false };
    state.searchQuery = "";
    $("[data-global-search]").value = "";
    if (guestSearch) guestSearch.value = "";
    if (attendeeSearch) attendeeSearch.value = "";
    if (menuSearch) menuSearch.value = "";
    $$("[data-filter], [data-task-filter], [data-travel-filter], [data-podcast-filter], [data-content-filter], [data-guest-filter], [data-attendee-filter], [data-menu-filter]").forEach((select) => {
      if (select.type === "checkbox") select.checked = false;
      else select.value = "";
    });
    renderAll();
  });
  document.addEventListener("click", async (event) => {
    const scrollTop = event.target.closest("[data-scroll-top], [data-section-jump-action='top']");
    if (scrollTop) {
      window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      return;
    }
    const openDrawer = event.target.closest("[data-section-drawer-open]");
    if (openDrawer) {
      const drawer = $("[data-section-drawer]");
      const isOpen = drawer && !drawer.hidden;
      if (drawer) drawer.hidden = isOpen;
      document.body.classList.toggle("section-drawer-open", !isOpen);
      openDrawer.setAttribute("aria-expanded", String(!isOpen));
      return;
    }
    const closeDrawer = event.target.closest("[data-section-drawer-close], [data-section-drawer]");
    if (closeDrawer && (!event.target.closest(".section-drawer-panel") || event.target.closest("[data-section-drawer-close]"))) {
      const drawer = $("[data-section-drawer]");
      if (drawer) drawer.hidden = true;
      document.body.classList.remove("section-drawer-open");
      $("[data-section-drawer-open]")?.setAttribute("aria-expanded", "false");
      return;
    }
    const drawerLink = event.target.closest("[data-drawer-section]");
    if (drawerLink) {
      const drawer = $("[data-section-drawer]");
      if (drawer) drawer.hidden = true;
      document.body.classList.remove("section-drawer-open");
      $("[data-section-drawer-open]")?.setAttribute("aria-expanded", "false");
      setActiveGroupForTarget((drawerLink.getAttribute("href") || "#overview").replace("#", ""));
      return;
    }
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
    const guestQuick = event.target.closest("[data-guest-quick]");
    if (guestQuick) { state.guestFilters.quick = guestQuick.dataset.guestQuick; renderGuests(); return; }
    const guestToggle = event.target.closest("[data-guest-toggle]");
    if (guestToggle) {
      const card = guestToggle.closest("[data-guest-card]");
      setGuestDetailState(card, guestToggle.getAttribute("aria-expanded") !== "true");
      return;
    }
    const attendeeToggle = event.target.closest("[data-attendee-toggle]");
    if (attendeeToggle) {
      const panel = document.getElementById(attendeeToggle.getAttribute("aria-controls"));
      const open = attendeeToggle.getAttribute("aria-expanded") !== "true";
      attendeeToggle.setAttribute("aria-expanded", String(open));
      if (panel) panel.hidden = !open;
      return;
    }
    const expandGuests = event.target.closest("[data-guest-expand-all]");
    if (expandGuests) { $$("[data-guest-card]").forEach((card) => setGuestDetailState(card, true)); return; }
    const collapseGuests = event.target.closest("[data-guest-collapse-all]");
    if (collapseGuests) { $$("[data-guest-card]").forEach((card) => setGuestDetailState(card, false)); return; }
    const reloadSeating = event.target.closest("[data-round-table-reload]");
    if (reloadSeating) {
      reloadSeating.textContent = "Refreshing...";
      await loadSharedSeatingPlan();
      renderAll();
      return;
    }
    const openHallCentre = event.target.closest("[data-open-hall-centre]");
    if (openHallCentre) {
      state.hallControlCentreOpen = true;
      state.activeHallTab = state.activeHallTab || "overview";
      renderLocations();
      document.body.classList.add("hall-centre-open");
      return;
    }
    const closeHallCentre = event.target.closest("[data-close-hall-centre]");
    if (closeHallCentre) {
      state.hallControlCentreOpen = false;
      state.roundTableEditMode = false;
      state.activeSeatEditor = "";
      renderLocations();
      document.body.classList.remove("hall-centre-open");
      return;
    }
    const hallTab = event.target.closest("[data-hall-tab], [data-hall-tab-jump]");
    if (hallTab) {
      state.activeHallTab = hallTab.dataset.hallTab || hallTab.dataset.hallTabJump || "overview";
      state.hallControlCentreOpen = true;
      rerenderHallCentre({ preserveScroll: false });
      return;
    }
    const roundTableSelect = event.target.closest("[data-round-table-select]");
    if (roundTableSelect) {
      const scrollTop = hallScrollTop();
      state.activeRoundTableNumber = Number(roundTableSelect.dataset.roundTableSelect || 1);
      state.activeHallTab = "round-tables";
      state.hallControlCentreOpen = true;
      rerenderHallCentre({ scrollTop });
      return;
    }
    const editRoundTables = event.target.closest("[data-round-table-edit-toggle]");
    if (editRoundTables) {
      const scrollTop = hallScrollTop();
      if (state.roundTableEditMode) {
        if (!window.confirm("Cancel editing without saving current visible changes?")) return;
        state.roundTableEditMode = false;
        state.activeSeatEditor = "";
      } else {
        state.roundTableEditMode = true;
      }
      state.activeHallTab = "round-tables";
      state.hallControlCentreOpen = true;
      rerenderHallCentre({ scrollTop });
      return;
    }
    const expandTables = event.target.closest("[data-round-table-expand-all]");
    if (expandTables) { $$("[data-round-table-card]").forEach((detail) => { detail.open = true; }); return; }
    const collapseTables = event.target.closest("[data-round-table-collapse-all]");
    if (collapseTables) { $$("[data-round-table-card]").forEach((detail) => { detail.open = false; }); return; }
    const showIncomplete = event.target.closest("[data-round-table-show-incomplete]");
    if (showIncomplete) {
      $$("[data-round-table-card]").forEach((detail) => {
        const assigned = Number((detail.querySelector(".summary-hint")?.textContent || "0").match(/\\d+/)?.[0] || 0);
        detail.classList.toggle("is-hidden", assigned >= (state.roundTablePlan?.config?.working_seats_per_table || 9));
      });
      return;
    }
    const editSeat = event.target.closest("[data-round-table-edit-seat]");
    if (editSeat) {
      const scrollTop = hallScrollTop();
      state.activeSeatEditor = editSeat.dataset.roundTableEditSeat || "";
      state.roundTableEditMode = true;
      state.activeHallTab = "round-tables";
      state.hallControlCentreOpen = true;
      rerenderHallCentre({ scrollTop });
      return;
    }
    const clearSeat = event.target.closest("[data-round-table-clear-seat]");
    if (clearSeat) {
      const scrollTop = hallScrollTop();
      const slot = clearSeat.closest("[data-seat-slot]");
      if (slot && slot.querySelector("[data-seat-guest]")) {
        slot.querySelector("[data-seat-guest]").value = "";
        slot.querySelector("[data-seat-guest-id]").value = "";
        slot.querySelector("[data-seat-company]").value = "";
        slot.querySelector("[data-seat-category]").value = "";
        slot.querySelector("[data-seat-dietary]").value = "";
        slot.querySelector("[data-seat-status]").value = "Guest Needed";
        slot.querySelector("[data-seat-notes]").value = "";
        clearSeat.disabled = true;
      } else if (slot) {
        const tableNumber = Number(slot.dataset.tableNumber);
        const seatNumber = Number(slot.dataset.seatNumber);
        const plan = state.roundTablePlan || roundTableSeedPlan();
        const assignments = (plan.assignments || []).map((seat) => seat.table_number === tableNumber && seat.seat_number === seatNumber
          ? { ...seat, guest_id: "", guest_name: "", guest_company: "", guest_category: "", dietary_flag: "", assignment_status: "Guest Needed", notes: "" }
          : seat);
        state.roundTablePlan = normalizeRoundTablePlan({ ...plan, assignments });
        state.activeSeatEditor = "";
        rerenderHallCentre({ scrollTop });
      }
      return;
    }
    const clearTable = event.target.closest("[data-round-table-clear-table]");
    if (clearTable) {
      const scrollTop = hallScrollTop();
      const tableNumber = Number(clearTable.dataset.roundTableClearTable);
      if (!window.confirm(`Clear all assignments from Table ${tableNumber}?`)) return;
      const plan = state.roundTablePlan || roundTableSeedPlan();
      const assignments = (plan.assignments || []).map((seat) => seat.table_number === tableNumber
        ? { ...seat, guest_id: "", guest_name: "", guest_company: "", guest_category: "", dietary_flag: "", assignment_status: "Guest Needed", notes: "" }
        : seat);
      state.roundTablePlan = normalizeRoundTablePlan({ ...plan, assignments });
      state.activeSeatEditor = "";
      rerenderHallCentre({ scrollTop });
      return;
    }
    const saveTable = event.target.closest("[data-round-table-save-table]");
    if (saveTable) {
      const scrollTop = hallScrollTop();
      const tableNumber = Number(saveTable.dataset.roundTableSaveTable);
      const updatedBy = window.prompt("Who is saving this table?", "Website team") || "Website team";
      let assignments = collectRoundTableAssignmentsFromDom();
      const duplicate = duplicateRoundTableAssignment(assignments, tableNumber);
      if (duplicate) {
        const move = window.confirm(`Guest already assigned to Table ${duplicate.previous.table_number}, Seat ${duplicate.previous.seat_number}. Move guest here?`);
        if (!move) return;
        assignments = assignments.map((seat) => seat.table_number === duplicate.previous.table_number && seat.seat_number === duplicate.previous.seat_number
          ? { ...seat, guest_id: "", guest_name: "", guest_company: "", guest_category: "", dietary_flag: "", assignment_status: "Guest Needed", notes: "Moved to another seat", updated_by: updatedBy, updated_at: new Date().toISOString() }
          : seat);
      }
      if (!window.confirm("Save changes to shared seating plan?")) return;
      saveTable.textContent = "Saving...";
      try {
        const timestamp = new Date().toISOString();
        const stamped = assignments.map((seat) => seat.table_number === tableNumber ? { ...seat, updated_by: updatedBy, updated_at: timestamp } : seat);
        await saveSharedSeatingPlan({ ...(state.roundTablePlan || roundTableSeedPlan()), assignments: stamped }, updatedBy);
        state.roundTableEditMode = false;
        state.activeSeatEditor = "";
      } catch (error) {
        state.roundTableStorageWarning = error.message;
        window.alert(error.message);
      }
      renderAll();
      document.body.classList.add("hall-centre-open");
      requestAnimationFrame(() => {
        const body = $("[data-hall-scroll]");
        if (body) body.scrollTop = scrollTop;
      });
      return;
    }
    const exportSeating = event.target.closest("[data-round-table-export]");
    if (exportSeating) {
      state.roundTablePlan = normalizeRoundTablePlan({ ...(state.roundTablePlan || roundTableSeedPlan()), assignments: collectRoundTableAssignmentsFromDom() });
      const blob = new Blob([roundTableCsv()], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "horizons-hall-round-table-seating-plan.csv";
      link.click();
      URL.revokeObjectURL(url);
      return;
    }
    const copySeating = event.target.closest("[data-round-table-copy]");
    if (copySeating) {
      state.roundTablePlan = normalizeRoundTablePlan({ ...(state.roundTablePlan || roundTableSeedPlan()), assignments: collectRoundTableAssignmentsFromDom() });
      navigator.clipboard?.writeText(`HORIZONS Hall Round Table Plan\\n${roundTableSummary()}`);
      copySeating.textContent = "Copied";
      setTimeout(() => { copySeating.textContent = "Copy seating plan summary"; }, 1600);
      return;
    }
    const printSeating = event.target.closest("[data-round-table-print]");
    if (printSeating) {
      state.roundTablePlan = normalizeRoundTablePlan({ ...(state.roundTablePlan || roundTableSeedPlan()), assignments: collectRoundTableAssignmentsFromDom() });
      const win = window.open("", "_blank");
      if (win) {
        win.document.write(`<title>HORIZONS Hall Round Table Plan</title><style>body{font-family:Arial,sans-serif;padding:24px;color:#211b15}h1{font-family:Georgia,serif}pre{white-space:pre-wrap;font-size:13px}.note{border:1px solid #ddd;padding:12px;margin:12px 0}</style><h1>HORIZONS Hall Round Table Plan</h1><div class="note">Source capacity: 80. Working version: 10 tables x 9 guest slots. Seat count needs final confirmation.</div><pre>${escapeHtml(roundTableSummary())}</pre>`);
        win.document.close();
        win.print();
      }
      return;
    }
    const documentTab = event.target.closest("[data-document-tab]");
    if (documentTab) { state.activeDocumentCategory = documentTab.dataset.documentTab; renderDocumentTabs(); renderDocuments(); return; }
    const expandMenus = event.target.closest("[data-menu-expand-all]");
    if (expandMenus) { $$("[data-menus] details.menu-details").forEach((detail) => { detail.open = true; updateMenuDetailLabel(detail); }); return; }
    const collapseMenus = event.target.closest("[data-menu-collapse-all]");
    if (collapseMenus) { $$("[data-menus] details.menu-details").forEach((detail) => { detail.open = false; updateMenuDetailLabel(detail); }); return; }
    const openMenu = event.target.closest("[data-menu-open]");
    if (openMenu) {
      event.preventDefault();
      const card = document.querySelector(`[data-menu-card="${CSS.escape(openMenu.dataset.menuOpen)}"]`);
      if (card) {
        const detail = card.querySelector("details.menu-details");
        detail.open = true;
        updateMenuDetailLabel(detail);
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    const swagTab = event.target.closest("[data-swag-tab]");
    if (swagTab) { state.activeSwagSchedule = swagTab.dataset.swagTab; renderSwagSchedule(); }
    const copySlack = event.target.closest("[data-copy-slack-summary]");
    if (copySlack) {
      const id = copySlack.dataset.copySlackSummary;
      const redFlag = state.data.redFlags.find((item) => item.updateId === id || item.issue === id);
      const message = redFlag
        ? `RED FLAG: ${redFlag.issue}\nOwner: ${redFlag.owner || "TBC"}\nStatus: ${redFlag.status || "Needs Confirmation"}\nAction Needed: ${redFlag.decisionNeeded || "Needs Confirmation"}\nWebsite Link: ${location.origin}${location.pathname}#red-flags`
        : `HORIZONS update\nArea: Website source of truth\nStatus: Slack integration stub ready\nWebsite Link: ${location.origin}${location.pathname}#slack`;
      navigator.clipboard?.writeText(message);
      copySlack.textContent = "Copied";
      setTimeout(() => { copySlack.textContent = "Copy Slack Update"; }, 1600);
      return;
    }
    const printCallSheet = event.target.closest("[data-print-call-sheet]");
    if (printCallSheet) { window.print(); return; }
    const copyCallSheet = event.target.closest("[data-copy-call-sheet]");
    if (copyCallSheet) {
      const sheet = (state.data.callSheets || []).find((item) => item.day === state.activeCallSheetDay) || {};
      const items = state.data.schedule
        .filter((item) => (item.dayLabel || item.date) === state.activeCallSheetDay)
        .slice(0, 8)
        .map((item) => `${item.timeDisplay || item.timeStart || "TBC"} - ${item.title} (${item.location || "Location TBC"})`)
        .join("\n");
      const message = `CALL SHEET: ${sheet.title || state.activeCallSheetDay}\nCrew call: ${sheet.crewCallTime || "TBC"}\nMain location: ${sheet.mainLocation || "TBC"}\nFocus: ${sheet.dailyFocus || "TBC"}\n\nSchedule:\n${items}\n\nOpen: ${location.origin}${location.pathname}#call-sheet`;
      navigator.clipboard?.writeText(message);
      copyCallSheet.textContent = "Copied";
      setTimeout(() => { copyCallSheet.textContent = "Copy Slack Summary"; }, 1600);
      return;
    }
    const dismissSuggestion = event.target.closest("[data-capture-dismiss]");
    if (dismissSuggestion) {
      state.dismissedCaptureSuggestions = unique([...(state.dismissedCaptureSuggestions || []), dismissSuggestion.dataset.captureDismiss]);
      dismissedSuggestionStore.save(state.dismissedCaptureSuggestions);
      renderCaptureSuggestions();
      return;
    }
    const acceptSuggestion = event.target.closest("[data-capture-accept]");
    if (acceptSuggestion) {
      const id = acceptSuggestion.dataset.captureAccept;
      state.updates[id] = [...getUpdates(id), {
        name: "Website",
        topic: "Captured",
        status: "Approved to Capture",
        comment: "Suggestion accepted for content team review.",
        timestamp: new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
      }];
      updateStore.save(state.updates);
      renderCaptureSuggestions();
      return;
    }
    const updateAction = event.target.closest("[data-update-action]");
    if (updateAction) {
      const updateId = updateAction.dataset.updateId;
      const parentId = updateAction.dataset.parentId;
      const action = updateAction.dataset.updateAction;
      const actionLabel = action === "resolve" ? "Resolved" : action === "archive" ? "Archived" : "Still To Be Resolved";
      try {
        const base = backendApiBase();
        if (!base) throw new Error("Shared backend pending setup");
        const response = await fetch(`${base}/api/updates/${encodeURIComponent(updateId)}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: updateId, action, resolved_by: "Website" })
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.ok) throw new Error(result.error || `Updates API returned ${response.status}`);
      } catch (error) {
        console.warn("Could not update shared status; applying local fallback.", error);
      }
      state.updates[parentId] = getUpdates(parentId).map((item) => item.id === updateId ? { ...item, status: actionLabel } : item);
      updateStore.save(state.updates);
      renderAll();
      return;
    }
  });
  document.addEventListener("toggle", (event) => {
    if (event.target instanceof HTMLDetailsElement) {
      event.target.querySelector("summary")?.setAttribute("aria-expanded", String(event.target.open));
      if (event.target.classList.contains("menu-details")) updateMenuDetailLabel(event.target);
      document.body.classList.toggle("detail-open", $$("details[open] .update-form, details[open] .suggestion-form").length > 0);
    }
  }, true);
  document.addEventListener("submit", async (event) => {
    const captureLogForm = event.target.closest("[data-capture-log-form]");
    if (captureLogForm) {
      event.preventDefault();
      const data = new FormData(captureLogForm);
      const timestamp = new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Madrid" });
      const item = {
        id: `capture-log-${Date.now()}`,
        updateId: `capture-log:${Date.now()}`,
        loggedBy: text(data.get("loggedBy"), "Name needed"),
        timestamp,
        manualTime: text(data.get("manualTime")),
        day: text(data.get("day"), state.activeContentDay || state.activeDay || "Day needed"),
        location: text(data.get("location"), "Location needed"),
        camera: text(data.get("camera"), "Camera needed"),
        mediaType: text(data.get("mediaType"), "Photo"),
        subject: text(data.get("subject")),
        tags: text(data.get("tags")),
        fileReference: text(data.get("fileReference")),
        priority: text(data.get("priority"), "Normal"),
        status: text(data.get("status"), "Logged"),
        notes: text(data.get("notes")),
        source: "local-capture-log"
      };
      if (!item.subject) return;
      state.captureLog = [...(state.captureLog || []), item];
      captureLogStore.save(state.captureLog.filter((entry) => entry.source === "local-capture-log"));
      captureLogForm.reset();
      renderCaptureLog();
      return;
    }
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
      priority: text(data.get("priority"), "Normal"),
      visibility: text(data.get("visibility"), "Team"),
      comment: text(data.get("comment")),
      notifySlack: data.get("notifySlack") === "true",
      slackChannel: text(data.get("slackChannel"), slackChannelFor(id)),
      slackStatus: "",
      timestamp: new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
    };
    if (!update.comment) return;
    if (update.notifySlack) {
      const preview = `Send this update to ${update.slackChannel}?\n\n${slackUrgencyLabel(update)}\nStatus: ${update.status}\nPriority: ${update.priority}\n\n${update.comment}`;
      if (!window.confirm(preview)) update.notifySlack = false;
    }
    const shouldNotify = update.notifySlack || shouldAutoNotifySlack(update, id);
    if (shouldNotify && /private|admin/i.test(update.visibility)) {
      update.slackStatus = "Blocked by visibility";
    }

    try {
      const result = await saveSharedUpdate(id, update);
      if (result?.update) {
        const savedUpdate = frontendUpdateFromRecord(result.update);
        const slack = result.slack || {};
        savedUpdate.slackStatus = slack.sent ? "Sent" : slack.error ? "Slack failed" : shouldNotify ? "Queued" : "";
        state.updates[id] = [...getUpdates(id), savedUpdate];
      } else {
        state.updates[id] = [...getUpdates(id), update];
      }
    } catch (error) {
      if (shouldNotify && !update.slackStatus) update.slackStatus = "Pending backend setup";
      const log = slackActivityStore.load();
      if (shouldNotify) {
        slackActivityStore.save([...log, {
          id: `slack-local-${Date.now()}`,
          updateId: id,
          parentType: parentTypeFor(id),
          parentId: id,
          channel: update.slackChannel,
          messagePreview: update.comment.slice(0, 180),
          sentBy: update.name,
          sentAt: update.timestamp,
          status: "Queued",
          errorMessage: `Shared backend unavailable: ${error.message}`
        }]);
      }
      update.source = "local-fallback";
      state.updates[id] = [...getUpdates(id), update];
    }
    updateStore.save(state.updates);
    renderAll();
  });
}

function updateMenuDetailLabel(detail) {
  const label = detail?.querySelector("[data-menu-summary-label]");
  if (label) label.textContent = detail.open ? "Close menu" : "Open menu";
}

init().catch((error) => {
  console.error(error);
  document.body.insertAdjacentHTML("afterbegin", `<div class="empty-state">The command centre could not load the latest event data. Please refresh or contact the site owner.</div>`);
});
