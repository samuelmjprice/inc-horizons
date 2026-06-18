# Vercel Redeploy Password Gate Full QA Report

Date: 18 June 2026

## Deployment

The GitHub repository was imported into Vercel as project `inc-horizons`.

Production URL:

```txt
https://inc-horizons-seven.vercel.app
```

## Password Gate QA

Passed:

- Root redirects unauthenticated visitors to the branded archive lock page.
- Direct `content.json` redirects unauthenticated visitors to the archive lock page.
- Wrong password fails and does not set a session cookie.
- Correct password sets the archive session cookie.
- Refresh/unlocked requests continue to work with the session cookie.
- The custom live domain now uses the same Vercel password gate.

## Evidence

```txt
https://inc-horizons-seven.vercel.app -> 307 /archive-lock.html?next=%2F
https://inc-horizons-seven.vercel.app/content.json -> 307 /archive-lock.html?next=%2Fcontent.json
https://inc-horizons.com -> 307 /archive-lock.html?next=%2F
https://inc-horizons.com/content.json -> 307 /archive-lock.html?next=%2Fcontent.json
```

