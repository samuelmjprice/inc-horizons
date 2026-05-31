const memory = {
  updates: [],
  slackActivity: []
};

const now = () => new Date().toISOString();
const makeId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
const hasSupabase = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

async function supabaseRequest(path, options = {}) {
  const baseUrl = process.env.SUPABASE_URL.replace(/\/$/, "");
  const response = await fetch(`${baseUrl}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "content-type": "application/json",
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase returned ${response.status}: ${message}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

function queryParams(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, value);
  });
  return query.toString();
}

function buildUpdateRecord(payload) {
  const timestamp = now();
  return {
    id: payload.id || makeId("update"),
    parent_type: payload.parent_type,
    parent_id: payload.parent_id,
    title: payload.title || "",
    body: payload.body || "",
    author_name: payload.author_name || "Team update",
    author_email: payload.author_email || "",
    status: payload.status || "Still To Be Resolved",
    visibility: payload.visibility || "Team",
    priority: payload.priority || "Normal",
    notify_slack: Boolean(payload.notify_slack),
    slack_channel: payload.slack_channel || "",
    slack_sent_at: null,
    slack_message_ts: "",
    slack_error: "",
    created_at: payload.created_at || timestamp,
    updated_at: payload.updated_at || timestamp,
    resolved_by: "",
    resolved_at: null,
    archived_at: null,
    source: payload.source || "website"
  };
}

export async function listUpdates({ parent_type, parent_id } = {}) {
  if (hasSupabase()) {
    const filters = { select: "*", order: "created_at.asc" };
    if (parent_type) filters.parent_type = `eq.${parent_type}`;
    if (parent_id) filters.parent_id = `eq.${parent_id}`;
    return supabaseRequest(`record_updates?${queryParams(filters)}`);
  }

  return memory.updates.filter((update) => {
    if (parent_type && update.parent_type !== parent_type) return false;
    if (parent_id && update.parent_id !== parent_id) return false;
    return true;
  });
}

export async function createUpdate(payload) {
  const record = buildUpdateRecord(payload);
  if (hasSupabase()) {
    const rows = await supabaseRequest("record_updates", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(record)
    });
    return rows?.[0] || record;
  }

  memory.updates.push(record);
  return record;
}

export async function patchUpdate(id, patch) {
  if (hasSupabase()) {
    const rows = await supabaseRequest(`record_updates?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ ...patch, updated_at: now() })
    });
    return rows?.[0] || null;
  }

  const index = memory.updates.findIndex((update) => update.id === id);
  if (index === -1) return null;
  memory.updates[index] = { ...memory.updates[index], ...patch, updated_at: now() };
  return memory.updates[index];
}

export async function deleteUpdate(id) {
  if (hasSupabase()) {
    await supabaseRequest(`record_updates?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
    return true;
  }

  const index = memory.updates.findIndex((update) => update.id === id);
  if (index === -1) return false;
  memory.updates.splice(index, 1);
  return true;
}

export async function createSlackActivity(payload) {
  const record = {
    id: payload.id || makeId("slack"),
    update_id: payload.update_id || "",
    parent_type: payload.parent_type || "",
    parent_id: payload.parent_id || "",
    sent_at: payload.sent_at || now(),
    sent_by: payload.sent_by || "website",
    event_type: payload.event_type || "comment_update",
    channel: payload.channel || "",
    message_title: payload.message_title || payload.title || "",
    related_item_id: payload.related_item_id || payload.parent_id || "",
    website_link: payload.website_link || "",
    status: payload.status || "Queued",
    error_message: payload.error_message || "",
    payload_preview: payload.payload_preview || ""
  };
  if (hasSupabase()) {
    const rows = await supabaseRequest("slack_activity_log", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(record)
    });
    return rows?.[0] || record;
  }

  memory.slackActivity.push(record);
  return record;
}

export async function listSlackActivity() {
  if (hasSupabase()) {
    return supabaseRequest("slack_activity_log?select=*&order=sent_at.desc");
  }

  return memory.slackActivity;
}
