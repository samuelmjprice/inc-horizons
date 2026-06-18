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

After commit `74a14fe`, `https://inc-horizons.com` returns GitHub Pages 404 instead of the event app. This removes public access to the event hub through the custom domain, but it does not replace the need for Vercel env var setup and DNS migration to show the branded archive password screen on the custom domain.

## Fresh Verification - 18 June 2026 13:16 UTC

- `https://inc-horizons.com` still resolves to GitHub Pages and returns `404` with `server: GitHub.com`.
- `inc-horizons.com` still has GitHub Pages apex A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
- `www.inc-horizons.com` still points to `samuelmjprice.github.io`.
- Nameservers remain `ns07.domaincontrol.com` and `ns08.domaincontrol.com`.
- `https://inc-horizons.vercel.app` redirects unauthenticated visitors to `/archive-lock.html?next=%2F`.
- `https://inc-horizons.vercel.app/content.json` redirects unauthenticated visitors to `/archive-lock.html?next=%2Fcontent.json`.
- `POST https://inc-horizons.vercel.app/api/archive-login` returns `503` with `Archive protection environment variables are not configured.`
- No Vercel CLI, npm/npx, GitHub CLI, Vercel token, or local `.vercel/project.json` is available in this environment.

Conclusion: repository-side protection is complete and the Vercel deployment is enforcing the middleware gate, but the final live-domain migration is blocked by external Vercel and DNS access.
