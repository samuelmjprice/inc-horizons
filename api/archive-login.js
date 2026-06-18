const SESSION_COOKIE = "horizons_archive_session";
const ONE_WEEK = 60 * 60 * 24 * 7;

function parseBody(request) {
  if (!request.body) return {};
  if (typeof request.body === "object") return request.body;
  if (typeof request.body !== "string") return {};

  const trimmedBody = request.body.trim();
  if (!trimmedBody) return {};

  try {
    return JSON.parse(trimmedBody);
  } catch {
    return Object.fromEntries(new URLSearchParams(trimmedBody));
  }
}

function safeRedirectPath(value) {
  if (!value || typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  if (value.startsWith("/api/archive-login") || value.startsWith("/archive-lock.html")) return "/";
  return value;
}

function redirect(response, location, status = 303) {
  response.writeHead(status, { Location: location });
  response.end();
}

function setArchiveCookie(response, token) {
  response.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${ONE_WEEK}`
  );
}

function clearArchiveCookie(response) {
  response.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
  );
}

export default async function handler(request, response) {
  if (request.method === "GET" && request.query?.logout === "1") {
    clearArchiveCookie(response);
    redirect(response, "/archive-lock.html?loggedOut=1");
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ ok: false, error: "Method not allowed." });
    return;
  }

  const archivePassword = process.env.HORIZONS_ARCHIVE_PASSWORD;
  const archiveToken = process.env.HORIZONS_ARCHIVE_ACCESS_TOKEN;

  if (!archivePassword || !archiveToken) {
    response.status(503).json({
      ok: false,
      error: "Archive protection environment variables are not configured."
    });
    return;
  }

  const body = parseBody(request);
  const password = String(body.password || "");
  const nextPath = safeRedirectPath(body.next);

  if (password !== archivePassword) {
    redirect(response, `/archive-lock.html?error=1&next=${encodeURIComponent(nextPath)}`);
    return;
  }

  setArchiveCookie(response, archiveToken);
  redirect(response, nextPath);
}
