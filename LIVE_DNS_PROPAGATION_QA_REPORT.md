# Live DNS Propagation QA Report

Date: 18 June 2026

## Current State

Before DNS migration, the live domain is still resolving to GitHub Pages:

```txt
server: GitHub.com
```

Apex records are still GitHub Pages A records and `www` still points to `samuelmjprice.github.io`.

## Repo-Level Mitigation

The repository `CNAME` file was removed so GitHub Pages should stop claiming `inc-horizons.com` after rebuild.

This is not the same as a completed Vercel password gate. It is a partial mitigation to prevent GitHub Pages continuing to serve the custom domain.

## Protected Vercel URL

The Vercel URL exists and middleware protection is active:

```txt
https://inc-horizons.vercel.app
```

Unauthenticated requests redirect to `/archive-lock.html`.

Login is not usable yet because required Vercel env vars are missing.

## Pending

After Vercel project/domain/DNS access:

- Confirm `inc-horizons.com` no longer resolves to GitHub Pages.
- Confirm HTTPS works on Vercel.
- Confirm unauthenticated live access redirects to `/archive-lock.html`.
- Confirm `www` redirects to apex.
