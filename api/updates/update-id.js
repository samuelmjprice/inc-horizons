import {
  handleArchiveUpdate,
  handleDeleteUpdate,
  handlePatchUpdate,
  handleReopenUpdate,
  handleResolveUpdate,
  handleSendUpdateToSlack
} from "../../backend/serverless/updates.mjs";

export default async function handler(request, response) {
  const id = request.query?.id || request.body?.id;
  const action = request.query?.action || request.body?.action;

  if (!id) {
    response.status(400).json({ ok: false, error: "Missing update id." });
    return;
  }

  if (request.method === "PATCH") {
    let result;
    if (action === "resolve") result = await handleResolveUpdate(id, request.body?.resolved_by);
    else if (action === "reopen") result = await handleReopenUpdate(id);
    else if (action === "archive") result = await handleArchiveUpdate(id);
    else if (action === "send-to-slack") result = await handleSendUpdateToSlack(id, process.env);
    else result = await handlePatchUpdate(id, request.body || {});
    response.status(result.status || (result.ok ? 200 : 500)).json(result);
    return;
  }

  if (request.method === "DELETE") {
    const result = await handleDeleteUpdate(id);
    response.status(result.status || (result.ok ? 200 : 500)).json(result);
    return;
  }

  response.status(405).json({ ok: false, error: "Method not allowed." });
}
