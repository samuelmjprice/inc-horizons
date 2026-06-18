# HORIZONS Archive Password Protection Report

Date: 18 June 2026

## Status

Implemented a server-side archive access gate for Vercel-style hosting.

The current live site at `https://inc-horizons.com/` is served by GitHub Pages, confirmed by the live response header:

```txt
server: GitHub.com
```

GitHub Pages cannot enforce password protection with environment variables because it only serves static files. The committed archive gate will work when the domain is served through a host that supports middleware/API environment variables, such as Vercel.

## Files Added

- `middleware.js`
- `api/archive-login.js`
- `archive-lock.html`
- `robots.txt`

## Files Updated

- `index.html` now includes `noindex, nofollow, noarchive`.
- `CNAME` was removed from the repository to stop GitHub Pages claiming `inc-horizons.com` after rebuild.

## How It Works

1. `middleware.js` checks every request.
2. If the request has a valid `horizons_archive_session` cookie, the request continues.
3. If not, the visitor is redirected to `/archive-lock.html`.
4. The branded archive lock page posts to `/api/archive-login`.
5. The API route compares the submitted password with `HORIZONS_ARCHIVE_PASSWORD`.
6. If the password matches, the API sets an HttpOnly secure archive session cookie using `HORIZONS_ARCHIVE_ACCESS_TOKEN`.

## Environment Variables Required

Set these in the production hosting environment. Do not commit them.

```txt
HORIZONS_ARCHIVE_PASSWORD
HORIZONS_ARCHIVE_ACCESS_TOKEN
```

Use the agreed archive password for `HORIZONS_ARCHIVE_PASSWORD`.

Use a long random value for `HORIZONS_ARCHIVE_ACCESS_TOKEN`, for example a UUID or generated secret token.

## Important Hosting Note

To protect the live site, do one of the following:

1. Move `inc-horizons.com` to Vercel and set the two environment variables above.
2. Enable Vercel password protection / deployment protection if available on the project plan.
3. Disable GitHub Pages for this repository so the current public static site is no longer served.

Until GitHub Pages is disabled or the domain is moved to Vercel, GitHub Pages cannot enforce this password gate.

On 18 June 2026, Vercel deployment and DNS migration were attempted from this environment but blocked because no Vercel CLI/session/token, DNS provider access, or GitHub Pages admin access was available.

## Password Safety

The archive password is not hard-coded in the repository.

The login cookie stores only the configured archive access token, not the password.

## QA

Pending after deployment:

- Confirm unauthenticated users are redirected to `/archive-lock.html`.
- Confirm wrong password returns to branded lock page.
- Confirm correct password sets an HttpOnly cookie and opens the archive.
- Confirm `/content.json`, `/script.js`, `/assets/*`, and `/api/*` are not accessible without the cookie.
- Confirm GitHub Pages has been disabled or DNS no longer points to GitHub Pages.
