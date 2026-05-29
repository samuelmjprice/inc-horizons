import { handleCreateUpdate, handleListUpdates } from "../../backend/serverless/updates.mjs";

export default async function handler(request, response) {
  if (request.method === "GET") {
    const result = await handleListUpdates(request.query || {});
    response.status(200).json(result);
    return;
  }

  if (request.method === "POST") {
    const result = await handleCreateUpdate(request.body, process.env);
    response.status(result.status || (result.ok ? 200 : 500)).json(result);
    return;
  }

  response.status(405).json({ ok: false, error: "Method not allowed." });
}
