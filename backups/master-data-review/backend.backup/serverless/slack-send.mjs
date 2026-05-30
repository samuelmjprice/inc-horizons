import { createSlackActivity } from "./storage-adapter.mjs";

const channelMap = {
  red_flag_created: "SLACK_WEBHOOK_RED_FLAGS",
  red_flag_resolved: "SLACK_WEBHOOK_RED_FLAGS",
  schedule_changed: "SLACK_WEBHOOK_SCHEDULE",
  call_sheet_published: "SLACK_WEBHOOK_PRODUCTION",
  location_changed: "SLACK_WEBHOOK_LOCATIONS",
  supplier_changed: "SLACK_WEBHOOK_SUPPLIERS",
  podcast_changed: "SLACK_WEBHOOK_PODCAST",
  entertainment_changed: "SLACK_WEBHOOK_ENTERTAINMENT",
  content_capture_changed: "SLACK_WEBHOOK_CONTENT",
  document_missing: "SLACK_WEBHOOK_DOCUMENTS",
  document_uploaded: "SLACK_WEBHOOK_DOCUMENTS",
  decision_needed: "SLACK_WEBHOOK_DECISIONS",
  cvent_conflict_found: "SLACK_WEBHOOK_RED_FLAGS",
  comment_update: "SLACK_WEBHOOK_MAIN",
  test_message: "SLACK_WEBHOOK_TEST"
};

const allowedEventTypes = new Set(Object.keys(channelMap));
const channelEnvMap = {
  "#horizons-main": "SLACK_WEBHOOK_MAIN",
  "#horizons-red-flags": "SLACK_WEBHOOK_RED_FLAGS",
  "#horizons-schedule": "SLACK_WEBHOOK_SCHEDULE",
  "#horizons-production": "SLACK_WEBHOOK_PRODUCTION",
  "#horizons-content": "SLACK_WEBHOOK_CONTENT",
  "#horizons-podcast": "SLACK_WEBHOOK_PODCAST",
  "#horizons-suppliers": "SLACK_WEBHOOK_SUPPLIERS",
  "#horizons-entertainment": "SLACK_WEBHOOK_ENTERTAINMENT",
  "#horizons-locations": "SLACK_WEBHOOK_LOCATIONS",
  "#horizons-documents": "SLACK_WEBHOOK_DOCUMENTS",
  "#horizons-decisions": "SLACK_WEBHOOK_DECISIONS",
  "#horizons-test": "SLACK_WEBHOOK_TEST"
};

function slackText(payload) {
  const title = payload.title || "HORIZONS website update";
  const area = payload.area || payload.event_type || "Website";
  const status = payload.status || "Needs Review";
  const owner = payload.owner ? `\nOwner: ${payload.owner}` : "";
  const link = payload.website_link ? `\nWebsite Link: ${payload.website_link}` : "";
  return `*${title}*\nArea: ${area}\nStatus: ${status}${owner}\n\n${payload.message || ""}${link}`;
}

export async function sendSlackAlert(payload, env = process.env) {
  if (!payload || typeof payload !== "object") {
    return { ok: false, status: 400, error: "Invalid Slack payload." };
  }

  const eventType = payload.event_type || "test_message";
  if (!allowedEventTypes.has(eventType)) {
    return { ok: false, status: 400, error: `Unsupported Slack event type: ${eventType}` };
  }

  const testMode = env.SLACK_TEST_MODE === "true" || payload.force_test_channel === true;
  const requestedChannel = payload.channel || "";
  const envName = testMode ? "SLACK_WEBHOOK_TEST" : (channelEnvMap[requestedChannel] || channelMap[eventType]);
  const webhookUrl = env[envName];
  const channel = testMode ? "#horizons-test" : (requestedChannel || envName);
  const preview = slackText(payload);

  if (!webhookUrl) {
    await createSlackActivity({
      event_type: eventType,
      channel,
      message_title: payload.title,
      related_item_id: payload.related_item_id,
      website_link: payload.website_link,
      status: "Failed",
      error_message: `${envName} is not configured.`,
      payload_preview: preview
    });
    return { ok: false, status: 503, error: "Slack notifications pending setup.", envName };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: preview })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Slack returned ${response.status}: ${text}`);
    }

    const record = await createSlackActivity({
      event_type: eventType,
      channel,
      message_title: payload.title,
      related_item_id: payload.related_item_id,
      website_link: payload.website_link,
      status: "Sent",
      payload_preview: preview
    });
    return { ok: true, status: 200, activity: record };
  } catch (error) {
    await createSlackActivity({
      event_type: eventType,
      channel,
      message_title: payload.title,
      related_item_id: payload.related_item_id,
      website_link: payload.website_link,
      status: "Failed",
      error_message: error.message,
      payload_preview: preview
    });
    return { ok: false, status: 502, error: error.message };
  }
}
