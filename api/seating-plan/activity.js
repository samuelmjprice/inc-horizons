import { handleSeatingActivity } from "../../backend/serverless/seating-plan.mjs";
import { applyCors, handleOptions } from "../_cors.js";

export default async function handler(request, response) {
  if (handleOptions(request, response)) return;
  applyCors(request, response);

  if (request.method !== "POST") {
    response.status(405).json({ ok: false, error: "Method not allowed." });
    return;
  }

  try {
    const result = await handleSeatingActivity(request.body || {});
    response.status(result.status || (result.ok ? 200 : 500)).json(result);
  } catch (error) {
    response.status(500).json({ ok: false, error: error.message || "Seating activity API error." });
  }
}
