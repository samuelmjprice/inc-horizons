# Post Archive Login Functionality QA Report

Date: 18 June 2026

## Status

Blocked until a Vercel deployment exists and the archive password can be tested.

## Pending After Login

Verify:

- Homepage loads.
- Video hero works.
- Search works.
- Ask HORIZONS works.
- Report Issue works.
- Call Sheet loads.
- Schedule loads.
- Locations load.
- People load.
- Assets load.
- HORIZONS Hall Control Centre loads.
- Admin loads.
- Documents open.

## Current Local Validation

Static code validation passed, but live post-login QA cannot be performed while the live domain remains on GitHub Pages.

## Current Vercel Validation

Unauthenticated `https://inc-horizons.vercel.app/` resolves to the archive screen.

Post-login functionality QA remains blocked because the login API returns `503` until Vercel archive environment variables are set.
