const memory = {
  updates: [],
  slackActivity: []
};

const now = () => new Date().toISOString();
const makeId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export async function listUpdates({ parent_type, parent_id } = {}) {
  return memory.updates.filter((update) => {
    if (parent_type && update.parent_type !== parent_type) return false;
    if (parent_id && update.parent_id !== parent_id) return false;
    return true;
  });
}

export async function createUpdate(payload) {
  const record = {
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
    created_at: now(),
    updated_at: now(),
    resolved_by: "",
    resolved_at: null,
    archived_at: null,
    source: payload.source || "website"
  };
  memory.updates.push(record);
  return record;
}

export async function patchUpdate(id, patch) {
  const index = memory.updates.findIndex((update) => update.id === id);
  if (index === -1) return null;
  memory.updates[index] = { ...memory.updates[index], ...patch, updated_at: now() };
  return memory.updates[index];
}

export async function deleteUpdate(id) {
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
  memory.slackActivity.push(record);
  return record;
}

export async function listSlackActivity() {
  return memory.slackActivity;
}
