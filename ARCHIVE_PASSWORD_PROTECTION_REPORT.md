# HORIZONS Archive Password Protection Report

Date: 18 June 2026

## Status

Complete.

The live site is now served by Vercel and protected by the server-side archive gate:

```txt
https://inc-horizons.com
https://www.inc-horizons.com
```

Logged-out visitors are redirected to the branded archive lock page. Direct data URLs such as `/content.json` are also protected.

## Hosting

Current production hosting:

```txt
Vercel project: inc-horizons
Production deployment: https://inc-horizons-seven.vercel.app
Live domain: https://inc-horizons.com
```

GitHub Pages is no longer the live custom-domain host.

## Files

Archive gate files:

- `middleware.js`
- `api/archive-login.js`
- `archive-lock.html`
- `robots.txt`

Updated:

- `index.html` includes `noindex, nofollow, noarchive`.
- Repository `CNAME` file was removed previously.

## How It Works

1. `middleware.js` checks incoming requests.
2. If the request has a valid `horizons_archive_session` cookie, the request continues.
3. If not, the visitor is redirected to `/archive-lock.html`.
4. The branded archive lock page posts to `/api/archive-login`.
5. The API route compares the submitted password with `HORIZONS_ARCHIVE_PASSWORD`.
6. If the password matches, the API sets an HttpOnly secure archive session cookie using `HORIZONS_ARCHIVE_ACCESS_TOKEN`.

## Environment Variables

These are set in Vercel and must not be committed:

```txt
HORIZONS_ARCHIVE_PASSWORD
HORIZONS_ARCHIVE_ACCESS_TOKEN
```

To rotate archive access:

1. Change one or both variables in Vercel Project Settings.
2. Redeploy production.
3. Test in a private browser window.

## DNS

GoDaddy now points the domain to Vercel.

Active relevant records:

```txt
A     @    216.198.79.1
A     @    76.76.21.21
CNAME www  ee2308c7a6b33f98.vercel-dns-017.com.
```

Old GitHub Pages records are no longer present.

## QA

Passed:

- `https://inc-horizons.com` serves from Vercel.
- `https://www.inc-horizons.com` serves from Vercel.
- Logged-out root requests redirect to `/archive-lock.html`.
- Logged-out `/content.json` redirects to `/archive-lock.html`.
- Wrong password fails.
- Correct password unlocks.
- Refresh remains unlocked via secure cookie.
- `robots.txt` blocks indexing.
- Archive lock page has `noindex,nofollow,noarchive`.
