const allowedOrigins = new Set([
  "https://inc-horizons.com",
  "https://www.inc-horizons.com",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
  "http://127.0.0.1:5500"
]);

export function applyCors(request, response) {
  const origin = request.headers?.origin || "";
  response.setHeader("Access-Control-Allow-Origin", allowedOrigins.has(origin) ? origin : "https://inc-horizons.com");
  response.setHeader("Vary", "Origin");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}

export function handleOptions(request, response) {
  if (request.method !== "OPTIONS") return false;
  applyCors(request, response);
  response.status(204).end();
  return true;
}
