import channelMap from "../../slack-channel-map.json" assert { type: "json" };
import { createSlackActivity } from "./storage-adapter.mjs";

const allowedEventTypes = new Set(Object.keys(channelMap));

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

  const envName = channelMap[eventType];
  const webhookUrl = env[envName];
  const channel = payload.channel || envName;
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
