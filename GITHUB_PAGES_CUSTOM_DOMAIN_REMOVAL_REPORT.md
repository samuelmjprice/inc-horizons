# GitHub Pages Custom Domain Removal Report

Date: 18 June 2026

## CNAME File

The repository contained a `CNAME` file with:

```txt
inc-horizons.com
```

This file tells GitHub Pages to claim the custom domain.

## Change Made

`CNAME` was removed from the repository so GitHub Pages no longer claims `inc-horizons.com` from the source branch after deployment.

## GitHub Pages Settings

Blocked: GitHub admin UI/API access is not available in this environment because `gh` is not installed and no GitHub API token/admin session is available.

Manual check still recommended:

GitHub repo -> Settings -> Pages -> Custom domain -> confirm `inc-horizons.com` is removed, or disable GitHub Pages if the archive will live only on Vercel.

## Status

- CNAME file existed: yes
- CNAME file removed in repo: yes
- GitHub Pages custom domain removed in UI: blocked / needs admin confirmation
- Pages disabled in UI: blocked / needs admin confirmation
