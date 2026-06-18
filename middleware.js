const SESSION_COOKIE = "horizons_archive_session";
const LOCK_PATH = "/archive-lock.html";
const LOGIN_PATH = "/api/archive-login";

function isArchiveLoginPath(pathname) {
  return pathname === LOCK_PATH || pathname === LOGIN_PATH;
}

function isStaticBrowserNoise(pathname) {
  return pathname === "/favicon.ico" || pathname === "/robots.txt";
}

function hasValidArchiveSession(request) {
  const expectedToken = process.env.HORIZONS_ARCHIVE_ACCESS_TOKEN;
  if (!expectedToken) return false;

  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const sessionCookie = cookies.find((cookie) => cookie.startsWith(`${SESSION_COOKIE}=`));
  if (!sessionCookie) return false;

  const token = decodeURIComponent(sessionCookie.slice(SESSION_COOKIE.length + 1));
  return token === expectedToken;
}

export default function middleware(request) {
  const url = new URL(request.url);
  const { pathname } = url;

  if (isArchiveLoginPath(pathname) || isStaticBrowserNoise(pathname)) {
    return;
  }

  if (hasValidArchiveSession(request)) {
    return;
  }

  const lockUrl = new URL(LOCK_PATH, url.origin);
  lockUrl.searchParams.set("next", `${url.pathname}${url.search}`);
  return Response.redirect(lockUrl, 307);
}

export const config = {
  matcher: "/(.*)"
};
