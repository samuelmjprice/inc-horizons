# Vercel Domain Add Report

Date: 18 June 2026

## Status

Blocked before domain add.

No Vercel project is linked and no Vercel auth/session/token is available in this environment.

An existing Vercel deployment exists at `https://inc-horizons.vercel.app`, so the domain should be added to that existing project rather than creating a duplicate project.

## Domains To Add

```txt
inc-horizons.com
www.inc-horizons.com
```

Preferred canonical domain:

```txt
https://inc-horizons.com
```

`www` should redirect to apex.

## Required Next Action

In Vercel dashboard:

Project -> Settings -> Domains -> Add:

- `inc-horizons.com`
- `www.inc-horizons.com`

Then copy the exact DNS records Vercel requests. Do not guess DNS values.
