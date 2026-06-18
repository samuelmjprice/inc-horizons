# Archive Deployment Final Status Report

Date: 18 June 2026

## Completed In Repository

- Archive password middleware exists.
- Archive login API exists.
- Branded archive lock page exists.
- `robots.txt` blocks crawling.
- `index.html` has noindex/noarchive meta.
- GitHub Pages `CNAME` file removed from source.
- Backup branch created: `backup-before-complete-archive-domain-migration`.
- Backup files created under `backups/complete-archive-domain-migration/`.

## Completed On Existing Vercel URL

Existing Vercel deployment detected:

```txt
https://inc-horizons.vercel.app
```

Middleware is active:

- Root redirects to archive lock.
- `/content.json` redirects to archive lock.
- `/archive-lock.html` loads.

Login currently returns `503`, meaning required archive environment variables need to be set in Vercel.

## Blocked Outside Repository

The full live migration could not be completed from this environment because:

- Vercel CLI/auth/project access is unavailable.
- No Vercel token is present.
- No `.vercel/project.json` exists.
- DNS provider access for DomainControl/GoDaddy is unavailable.
- GitHub admin UI/API access to disable Pages settings is unavailable.
- Existing Vercel project env vars cannot be set without Vercel project access.

## Exact Manual Actions Needed

1. Link/create Vercel project `inc-horizons`.
2. Set Vercel Production env vars:
   - `HORIZONS_ARCHIVE_PASSWORD`
   - `HORIZONS_ARCHIVE_ACCESS_TOKEN`
3. Deploy production.
4. Add `inc-horizons.com` and `www.inc-horizons.com` to Vercel.
5. Copy exact DNS records from Vercel.
6. In GoDaddy/DomainControl DNS, remove GitHub Pages A records and the `www` CNAME to `samuelmjprice.github.io`.
7. Add Vercel DNS records.
8. In GitHub repo settings, confirm Pages custom domain is removed or Pages is disabled.
9. Verify live domain shows the archive password gate.

## Current Live Status

At the start of this migration pass, `inc-horizons.com` was still served by GitHub Pages.

After this commit deploys through GitHub Pages, the removed `CNAME` should stop GitHub Pages from serving the custom domain, but that does not replace the need for Vercel deployment and DNS migration.
