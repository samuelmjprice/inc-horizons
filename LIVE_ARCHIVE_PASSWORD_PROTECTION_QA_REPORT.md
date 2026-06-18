# Live Archive Password Protection QA Report

Date: 18 June 2026

## Status

Blocked for custom domain: live domain is still served by GitHub Pages at the time of this pass.

GitHub Pages cannot execute the archive middleware/API gate.

The Vercel URL is protected by middleware, but login returns `503` until Vercel environment variables are set.

## Completed

- Archive gate code committed previously.
- `CNAME` file removed from repo to stop GitHub Pages custom-domain claim.
- `robots.txt` blocks crawling.
- `index.html` includes `noindex, nofollow, noarchive`.

## Pending Live QA

After Vercel deployment and DNS migration:

- Private browser opens password screen.
- Wrong password fails.
- Correct password unlocks.
- Refresh stays unlocked.
- Direct `/content.json` requires authentication.
- Admin/backend sections require authentication.
- Mobile password screen works.
- Desktop password screen works.
