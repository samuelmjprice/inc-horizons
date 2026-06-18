# Vercel Password Gate QA Report

Date: 18 June 2026

## Status

Partially tested on the existing Vercel deployment:

```txt
https://inc-horizons.vercel.app
```

Middleware is active, but login is blocked because Vercel environment variables are not configured.

## Local Code QA Completed

Middleware simulation passed:

```txt
Unauthenticated /content.json -> 307 /archive-lock.html?next=%2Fcontent.json
Valid archive cookie -> allowed
```

Syntax validation passed:

- `node --check middleware.js`
- `node --check api/archive-login.js`
- `node --check script.js`
- `python3 -m json.tool content.json`

## Vercel URL QA Completed

Unauthenticated root:

```txt
https://inc-horizons.vercel.app -> HTTP/2 307 /archive-lock.html?next=%2F
```

Unauthenticated direct data:

```txt
https://inc-horizons.vercel.app/content.json -> HTTP/2 307 /archive-lock.html?next=%2Fcontent.json
```

Archive lock page:

```txt
https://inc-horizons.vercel.app/archive-lock.html -> HTTP/2 200
```

Login API:

```txt
POST /api/archive-login -> 503
```

Interpretation: middleware is deployed and protecting direct content paths, but `HORIZONS_ARCHIVE_PASSWORD` and/or `HORIZONS_ARCHIVE_ACCESS_TOKEN` are not configured in the Vercel production environment.

## Pending Vercel QA

After environment variable setup and redeploy:

- Wrong password fails.
- Correct password unlocks.
- Refresh stays unlocked.
- Direct `/content.json` redirects to the archive lock when unauthenticated.
- Direct `/script.js` and `/assets/*` routes are protected.
- `/api/archive-login` is available only for login/logout behavior.
- Site works after unlock.
