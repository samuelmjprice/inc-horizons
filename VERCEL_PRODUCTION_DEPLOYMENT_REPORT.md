# Vercel Production Deployment Report

Date: 18 June 2026

## Status

Partially complete via existing Vercel deployment, but blocked for final production archive login.

Vercel CLI/auth/project access is unavailable in this environment:

```txt
npx: command not found
vercel: not found
.vercel/project.json: not found
```

No production Vercel deployment was created from this environment.

However, an existing Vercel deployment is active:

```txt
https://inc-horizons.vercel.app
```

Unauthenticated requests to this Vercel URL are running the middleware and redirecting to the archive lock page.

The login API currently returns `503`, indicating required archive environment variables are not configured in Vercel Production.

## Required Next Action

After Vercel access is available:

1. Link/create the `inc-horizons` project.
2. Set `HORIZONS_ARCHIVE_PASSWORD` and `HORIZONS_ARCHIVE_ACCESS_TOKEN`.
3. Redeploy production.
4. Redeploy production.
5. Test the Vercel production URL before changing DNS.

## Deployment URL

```txt
https://inc-horizons.vercel.app
```
