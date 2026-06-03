import {
  handleGetSeatingPlan,
  handlePatchSeatingPlan,
  handleSaveSeatingPlan
} from "../../backend/serverless/seating-plan.mjs";
import { applyCors, handleOptions } from "../_cors.js";

export default async function handler(request, response) {
  if (handleOptions(request, response)) return;
  applyCors(request, response);

  try {
    if (request.method === "GET") {
      const result = await handleGetSeatingPlan();
      response.status(result.status || (result.ok ? 200 : 500)).json(result);
      return;
    }

    if (request.method === "POST") {
      const result = await handleSaveSeatingPlan(request.body || {});
      response.status(result.status || (result.ok ? 200 : 500)).json(result);
      return;
    }

    if (request.method === "PATCH") {
      const result = await handlePatchSeatingPlan(request.body || {});
      response.status(result.status || (result.ok ? 200 : 500)).json(result);
      return;
    }

    response.status(405).json({ ok: false, error: "Method not allowed." });
  } catch (error) {
    response.status(500).json({ ok: false, error: error.message || "Seating plan API error." });
  }
}
