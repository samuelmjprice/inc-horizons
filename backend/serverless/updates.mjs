import {
  createUpdate,
  deleteUpdate,
  listUpdates,
  patchUpdate
} from "./storage-adapter.mjs";
import { sendSlackAlert } from "./slack-send.mjs";

const urgentStatuses = new Set(["At Risk", "Decision Needed"]);
const urgentPriorities = new Set(["Urgent", "Critical"]);

const routing = {
  red_flag: "red_flag_created",
  schedule_item: "schedule_changed",
  call_sheet_item: "call_sheet_published",
  location: "location_changed",
  restaurant: "location_changed",
  podcast: "podcast_changed",
  supplier: "supplier_changed",
  entertainment: "entertainment_changed",
  content_capture: "content_capture_changed",
  missing_file: "document_missing",
  document: "document_uploaded",
  decision: "decision_needed",
  speaker_content: "call_sheet_published",
  rehearsal: "call_sheet_published",
  signage: "document_missing",
  guest_material: "document_missing",
  cvent_comparison: "cvent_conflict_found"
};

function shouldAutoNotify(update) {
  return urgentStatuses.has(update.status) || urgentPriorities.has(update.priority);
}

function canSendVisibility(update) {
  return update.visibility === "Team" || update.visibility === "Leadership";
}

export async function handleListUpdates(query) {
  return { ok: true, updates: await listUpdates(query) };
}

export async function handleCreateUpdate(payload, env = process.env) {
  const required = ["parent_type", "parent_id", "body"];
  for (const field of required) {
    if (!payload?.[field]) return { ok: false, status: 400, error: `Missing ${field}.` };
  }

  const update = await createUpdate(payload);
  const eventType = routing[update.parent_type] || "comment_update";
  const shouldNotify = Boolean(update.notify_slack) || shouldAutoNotify(update);
  let slack = { sent: false, reason: "Not requested." };

  if (shouldNotify && canSendVisibility(update)) {
    const result = await sendSlackAlert({
      event_type: eventType,
      title: update.priority === "Urgent" ? "URGENT WEBSITE UPDATE" : "NEW WEBSITE UPDATE",
      area: update.parent_type,
      status: update.status,
      message: update.body,
      related_item_id: update.parent_id,
      website_link: payload.website_link || "",
      force_test_channel: Boolean(payload.force_test_channel)
    }, env);
    slack = { sent: result.ok, ...result };
    await patchUpdate(update.id, {
      slack_channel: result.envName || update.slack_channel,
      slack_sent_at: result.ok ? new Date().toISOString() : null,
      slack_error: result.ok ? "" : result.error
    });
  } else if (shouldNotify) {
    slack = { sent: false, reason: "Visibility prevents public Slack notification." };
  }

  return { ok: true, saved: true, update, slack };
}

export async function handlePatchUpdate(id, patch) {
  const update = await patchUpdate(id, patch);
  if (!update) return { ok: false, status: 404, error: "Update not found." };
  return { ok: true, update };
}

export async function handleDeleteUpdate(id) {
  const deleted = await deleteUpdate(id);
  if (!deleted) return { ok: false, status: 404, error: "Update not found." };
  return { ok: true, deleted: true };
}

export async function handleResolveUpdate(id, resolvedBy = "") {
  return handlePatchUpdate(id, {
    status: "Resolved",
    resolved_by: resolvedBy,
    resolved_at: new Date().toISOString(),
    archived_at: null
  });
}

export async function handleReopenUpdate(id) {
  return handlePatchUpdate(id, {
    status: "Still To Be Resolved",
    resolved_by: "",
    resolved_at: null,
    archived_at: null
  });
}

export async function handleArchiveUpdate(id) {
  return handlePatchUpdate(id, {
    status: "Archived",
    archived_at: new Date().toISOString()
  });
}

export async function handleSendUpdateToSlack(id, env = process.env) {
  const updates = await listUpdates();
  const update = updates.find((item) => item.id === id);
  if (!update) return { ok: false, status: 404, error: "Update not found." };
  if (!canSendVisibility(update)) {
    return { ok: false, status: 403, error: "Private/admin updates cannot be posted to public Slack channels." };
  }
  const eventType = routing[update.parent_type] || "comment_update";
  return sendSlackAlert({
    event_type: eventType,
    title: update.priority === "Urgent" ? "URGENT WEBSITE UPDATE" : "NEW WEBSITE UPDATE",
    area: update.parent_type,
    status: update.status,
    message: update.body,
    related_item_id: update.parent_id,
    force_test_channel: Boolean(update.force_test_channel)
  }, env);
}
