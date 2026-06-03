import {
  createUpdate,
  hasSupabase,
  listUpdates,
  queryParams,
  supabaseRequest
} from "./storage-adapter.mjs";

const EVENT_ID = "horizons_2026";
const TABLE_COUNT = 10;
const SEATS_PER_TABLE = 9;
const SNAPSHOT_PARENT_TYPE = "round_table_seating_snapshot";
const ACTIVITY_PARENT_TYPE = "round_table_seating_activity";

const now = () => new Date().toISOString();

const defaultConfig = () => ({
  layout_name: "HORIZONS Hall Round Table Layout",
  source_file: "Horizons - Farmers Market x80 V5.pdf",
  source_capacity: 80,
  working_table_count: TABLE_COUNT,
  working_seats_per_table: SEATS_PER_TABLE,
  status: "Needs Assignment",
  seat_count_confirmation_status: "Needs Confirmation",
  notes: "Uploaded layout shows seated capacity 80. Current working version uses 10 tables x 9 guest slots until final confirmation from Kirsty / Clownfish.",
  updated_at: now()
});

const emptySeat = (tableNumber, seatNumber) => ({
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

export function seedAssignments() {
  const rows = [];
  for (let tableNumber = 1; tableNumber <= TABLE_COUNT; tableNumber += 1) {
    for (let seatNumber = 1; seatNumber <= SEATS_PER_TABLE; seatNumber += 1) {
      rows.push(emptySeat(tableNumber, seatNumber));
    }
  }
  return rows;
}

function normalizeSeat(row = {}) {
  const tableNumber = Number(row.table_number || row.tableNumber || 0);
  const seatNumber = Number(row.seat_number || row.seatNumber || 0);
  return {
    table_number: tableNumber,
    seat_number: seatNumber,
    guest_id: row.guest_id || row.guestId || "",
    guest_name: row.guest_name || row.guestName || "",
    guest_company: row.guest_company || row.guestCompany || "",
    guest_category: row.guest_category || row.guestCategory || "",
    dietary_flag: row.dietary_flag || row.dietaryFlag || "",
    assignment_status: row.assignment_status || row.assignmentStatus || (row.guest_name || row.guestName ? "Assigned" : "Guest Needed"),
    notes: row.notes || "",
    updated_by: row.updated_by || row.updatedBy || "",
    updated_at: row.updated_at || row.updatedAt || "",
    created_at: row.created_at || row.createdAt || ""
  };
}

function normalizeConfig(config = {}) {
  return {
    ...defaultConfig(),
    ...config,
    working_table_count: Number(config.working_table_count || config.workingTableCount || TABLE_COUNT),
    working_seats_per_table: Number(config.working_seats_per_table || config.workingSeatsPerTable || SEATS_PER_TABLE),
    source_capacity: Number(config.source_capacity || config.sourceCapacity || 80)
  };
}

function mergeSeed(rows = []) {
  const byKey = new Map(rows.map((row) => [`${row.table_number}-${row.seat_number}`, normalizeSeat(row)]));
  return seedAssignments().map((seat) => byKey.get(`${seat.table_number}-${seat.seat_number}`) || seat);
}

function planFromRows(rows = [], config = defaultConfig(), source = "seed") {
  const assignments = mergeSeed(rows);
  const tables = Array.from({ length: TABLE_COUNT }, (_, index) => {
    const tableNumber = index + 1;
    const seats = assignments.filter((seat) => seat.table_number === tableNumber).sort((a, b) => a.seat_number - b.seat_number);
    const assignedCount = seats.filter((seat) => /assigned|reserved|confirmation/i.test(seat.assignment_status || "") && seat.guest_name).length;
    const latest = seats.map((seat) => seat.updated_at).filter(Boolean).sort().at(-1) || "";
    return {
      table_number: tableNumber,
      status: assignedCount ? (assignedCount >= SEATS_PER_TABLE ? "Fully Assigned" : "In Progress") : "Needs Assignment",
      assigned_count: assignedCount,
      remaining_slots: Math.max(0, SEATS_PER_TABLE - assignedCount),
      notes: "",
      updated_at: latest,
      updated_by: seats.find((seat) => seat.updated_at === latest)?.updated_by || "",
      seats
    };
  });
  const latest = assignments.map((seat) => seat.updated_at).filter(Boolean).sort().at(-1) || "";
  return {
    ok: true,
    event_id: EVENT_ID,
    source,
    shared: source !== "seed",
    config: normalizeConfig(config),
    assignments,
    tables,
    summary: {
      table_count: TABLE_COUNT,
      seats_per_table: SEATS_PER_TABLE,
      working_slots: TABLE_COUNT * SEATS_PER_TABLE,
      source_capacity: 80,
      assigned_count: assignments.filter((seat) => seat.guest_name && /assigned|reserved|confirmation/i.test(seat.assignment_status || "")).length,
      last_updated: latest
    }
  };
}

async function readLatestSnapshot() {
  const updates = await listUpdates({ parent_type: SNAPSHOT_PARENT_TYPE, parent_id: EVENT_ID });
  const latest = updates.at(-1);
  if (!latest?.body) return null;
  try {
    return JSON.parse(latest.body);
  } catch {
    return null;
  }
}

async function writeSnapshot(plan, updatedBy = "Website") {
  await createUpdate({
    parent_type: SNAPSHOT_PARENT_TYPE,
    parent_id: EVENT_ID,
    title: "Round table seating snapshot",
    body: JSON.stringify({
      config: plan.config || defaultConfig(),
      assignments: (plan.assignments || []).map(normalizeSeat),
      saved_at: now()
    }),
    author_name: updatedBy,
    status: "Shared Snapshot",
    visibility: "Admin",
    priority: "Normal",
    source: "round-table-seating-api"
  });
}

async function readDedicatedTables() {
  const filters = {
    select: "*",
    event_id: `eq.${EVENT_ID}`,
    order: "table_number.asc,seat_number.asc"
  };
  const rows = await supabaseRequest(`round_table_assignments?${queryParams(filters)}`);
  const configRows = await supabaseRequest(`round_table_plan_config?${queryParams({ select: "*", event_id: `eq.${EVENT_ID}`, limit: 1 })}`);
  return planFromRows(rows || [], configRows?.[0] || defaultConfig(), "supabase");
}

async function writeDedicatedTables(assignments = [], config = defaultConfig()) {
  const timestamp = now();
  const rows = assignments.map((row) => ({
    event_id: EVENT_ID,
    ...normalizeSeat(row),
    updated_at: timestamp,
    created_at: row.created_at || timestamp
  }));
  const configRow = {
    event_id: EVENT_ID,
    layout_name: config.layout_name || defaultConfig().layout_name,
    source_file: config.source_file || defaultConfig().source_file,
    source_capacity: Number(config.source_capacity || 80),
    working_table_count: Number(config.working_table_count || TABLE_COUNT),
    working_seats_per_table: Number(config.working_seats_per_table || SEATS_PER_TABLE),
    status: config.status || "Needs Assignment",
    seat_count_confirmation_status: config.seat_count_confirmation_status || "Needs Confirmation",
    notes: config.notes || defaultConfig().notes,
    updated_at: timestamp
  };
  await supabaseRequest("round_table_plan_config?on_conflict=event_id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(configRow)
  });
  await supabaseRequest("round_table_assignments?on_conflict=event_id,table_number,seat_number", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(rows)
  });
}

async function logActivity(payload = {}) {
  const record = {
    event_id: EVENT_ID,
    table_number: payload.table_number || null,
    seat_number: payload.seat_number || null,
    action: payload.action || "update",
    old_value: payload.old_value || null,
    new_value: payload.new_value || null,
    updated_by: payload.updated_by || "Website",
    created_at: now()
  };
  if (hasSupabase()) {
    try {
      await supabaseRequest("round_table_assignment_activity", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify(record)
      });
      return { ok: true, source: "supabase" };
    } catch {
      // Fall through to the existing shared update table.
    }
  }
  await createUpdate({
    parent_type: ACTIVITY_PARENT_TYPE,
    parent_id: EVENT_ID,
    title: record.action,
    body: JSON.stringify(record),
    author_name: record.updated_by,
    status: "Logged",
    visibility: "Admin",
    priority: "Normal",
    source: "round-table-seating-api"
  });
  return { ok: true, source: "record_updates" };
}

export async function handleGetSeatingPlan() {
  if (hasSupabase()) {
    try {
      return await readDedicatedTables();
    } catch (error) {
      const snapshot = await readLatestSnapshot();
      if (snapshot?.assignments) {
        return {
          ...planFromRows(snapshot.assignments, snapshot.config || defaultConfig(), "record_updates_snapshot"),
          storage_warning: "Dedicated seating tables are not available yet. Using shared snapshot storage."
        };
      }
      return {
        ...planFromRows([], defaultConfig(), "seed"),
        storage_warning: `Shared seating storage unavailable. Changes are not saved yet. ${error.message}`
      };
    }
  }
  return {
    ...planFromRows([], defaultConfig(), "seed"),
    storage_warning: "Shared seating storage unavailable. Changes are not saved yet."
  };
}

export async function handleSaveSeatingPlan(payload = {}) {
  const updatedBy = payload.updated_by || payload.updatedBy || "Website";
  const assignments = mergeSeed(payload.assignments || []);
  const config = normalizeConfig(payload.config || defaultConfig());
  const plan = planFromRows(assignments.map((row) => ({ ...row, updated_by: row.updated_by || updatedBy })), config, "pending");

  if (!hasSupabase()) {
    return { ...plan, ok: false, status: 503, error: "Shared seating storage unavailable. Changes are not saved yet." };
  }

  try {
    await writeDedicatedTables(plan.assignments, plan.config);
    await logActivity({ action: payload.action || "save_plan", updated_by: updatedBy, new_value: { assigned_count: plan.summary.assigned_count } });
    return await readDedicatedTables();
  } catch (error) {
    await writeSnapshot(plan, updatedBy);
    await logActivity({ action: payload.action || "save_plan_snapshot", updated_by: updatedBy, new_value: { assigned_count: plan.summary.assigned_count } });
    return {
      ...planFromRows(plan.assignments, plan.config, "record_updates_snapshot"),
      storage_warning: `Dedicated seating tables are not available yet. Saved to shared snapshot storage instead. ${error.message}`
    };
  }
}

export async function handlePatchSeatingPlan(payload = {}) {
  const current = await handleGetSeatingPlan();
  const updatedBy = payload.updated_by || payload.updatedBy || "Website";
  let assignments = current.assignments || seedAssignments();
  if (payload.table_number || payload.tableNumber) {
    const tableNumber = Number(payload.table_number || payload.tableNumber);
    const incomingSeats = (payload.seats || []).map((seat) => normalizeSeat({ ...seat, table_number: tableNumber, updated_by: updatedBy, updated_at: now() }));
    const incomingBySeat = new Map(incomingSeats.map((seat) => [seat.seat_number, seat]));
    assignments = assignments.map((seat) => seat.table_number === tableNumber && incomingBySeat.has(seat.seat_number) ? incomingBySeat.get(seat.seat_number) : seat);
  } else if (payload.assignment) {
    const incoming = normalizeSeat({ ...payload.assignment, updated_by: updatedBy, updated_at: now() });
    assignments = assignments.map((seat) => seat.table_number === incoming.table_number && seat.seat_number === incoming.seat_number ? incoming : seat);
  } else if (payload.assignments) {
    assignments = payload.assignments.map((seat) => normalizeSeat({ ...seat, updated_by: seat.updated_by || updatedBy }));
  }
  return handleSaveSeatingPlan({
    assignments,
    config: payload.config || current.config || defaultConfig(),
    updated_by: updatedBy,
    action: payload.action || "patch_plan"
  });
}

export async function handleSeatingActivity(payload = {}) {
  return logActivity(payload);
}
