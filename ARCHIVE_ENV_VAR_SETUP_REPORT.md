# Archive Environment Variable Setup Report

Date: 18 June 2026

## Required Variables

```txt
HORIZONS_ARCHIVE_PASSWORD
HORIZONS_ARCHIVE_ACCESS_TOKEN
```

## Status

Blocked: Vercel project/auth access is unavailable from this environment, so environment variables could not be set.

The existing Vercel deployment at `https://inc-horizons.vercel.app` returns `503` from `/api/archive-login` for both wrong and expected password attempts. That confirms the archive environment variables are missing or unavailable to the production deployment.

No secret values were committed or printed.

## Required Manual Action

Set both variables in Vercel Production at minimum.

Recommended:

- Production: set both variables.
- Preview: set both variables if preview deployments should also be protected.

After setting or changing Vercel environment variables, redeploy the production deployment.
