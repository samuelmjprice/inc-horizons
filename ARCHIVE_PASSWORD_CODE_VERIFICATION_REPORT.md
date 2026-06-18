# Archive Password Code Verification Report

Date: 18 June 2026

## Files Inspected

- `middleware.js`
- `api/archive-login.js`
- `archive-lock.html`
- `robots.txt`
- `index.html`

## Findings

### Middleware

`middleware.js` redirects unauthenticated requests to `/archive-lock.html`.

The middleware checks the `horizons_archive_session` cookie against `HORIZONS_ARCHIVE_ACCESS_TOKEN`.

Direct routes such as `/content.json`, `/script.js`, `/assets/*`, and `/api/*` are covered by the matcher unless they are the archive lock page, archive login route, `robots.txt`, or `favicon.ico`.

### Login API

`api/archive-login.js` checks:

- `HORIZONS_ARCHIVE_PASSWORD`
- `HORIZONS_ARCHIVE_ACCESS_TOKEN`

The password and token are read from environment variables only.

The archive session cookie is:

```txt
HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800
```

### Branded Lock Page

`archive-lock.html` is a branded HORIZONS archive access screen and does not include the archive password.

### SEO Lockdown

`robots.txt` blocks all crawling:

```txt
User-agent: *
Disallow: /
```

`index.html` now includes:

```html
<meta name="robots" content="noindex, nofollow, noarchive">
```

## Validation

Passed:

- `node --check middleware.js`
- `node --check api/archive-login.js`
- `node --check script.js`
- `python3 -m json.tool content.json`

## Remaining

The code is ready for Vercel/server-side hosting, but the live site is currently served by GitHub Pages and cannot execute this gate.
