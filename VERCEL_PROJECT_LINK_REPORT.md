# Vercel Project Link Report

Date: 18 June 2026

## Current Repo Link State

No Vercel project link is present.

```txt
.vercel/project.json: not found
```

## Intended Project

Suggested project name:

```txt
inc-horizons
```

Production branch:

```txt
main
```

## Status

Blocked locally: Vercel CLI/auth access is unavailable in this environment.

No duplicate Vercel project was created.

## Existing Vercel Deployment Detected

An existing Vercel deployment is live at:

```txt
https://inc-horizons.vercel.app
```

The local checkout is still not linked because `.vercel/project.json` is absent, but the Vercel URL confirms a Vercel project already exists somewhere under an account/team.

## Middleware/API Expectation

The repository now contains:

- `middleware.js`
- `api/archive-login.js`
- `archive-lock.html`

These require Vercel-style server-side middleware/API support and will not run on GitHub Pages.
