import { sendSlackAlert } from "../../backend/serverless/slack-send.mjs";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ ok: false, error: "Method not allowed." });
    return;
  }

  const result = await sendSlackAlert(request.body, process.env);
  response.status(result.status || (result.ok ? 200 : 500)).json(result);
}
