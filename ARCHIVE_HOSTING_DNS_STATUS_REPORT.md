# Archive Hosting DNS Status Report

Date: 18 June 2026

## Live Hosting Check

`https://inc-horizons.com`

```txt
HTTP/2 200
server: GitHub.com
```

`https://www.inc-horizons.com`

```txt
HTTP/2 301
server: GitHub.com
location: https://inc-horizons.com/
```

## Current DNS

`inc-horizons.com` currently resolves to GitHub Pages A records:

```txt
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

`www.inc-horizons.com` currently resolves via:

```txt
www.inc-horizons.com CNAME samuelmjprice.github.io
```

## Nameservers

```txt
ns07.domaincontrol.com
ns08.domaincontrol.com
```

These nameservers indicate the DNS provider is likely GoDaddy / DomainControl.

## Current State

- GitHub Pages is still serving the public live site.
- HTTPS works on both apex and `www`.
- `www` redirects to apex through GitHub Pages.
- The committed archive middleware/API gate is not active on the live domain because GitHub Pages cannot run middleware or environment variables.

## Update After CNAME Removal

After removing the repository `CNAME`, the custom domain no longer serves the event app:

```txt
https://inc-horizons.com -> HTTP/2 404
server: GitHub.com
```

DNS still points to GitHub Pages records, so the domain has not yet been migrated to Vercel.

## Required Change

Move the domain away from GitHub Pages to Vercel or another server-capable host.

Expected DNS migration steps once Vercel project/domain access is available:

1. Add `inc-horizons.com` and `www.inc-horizons.com` to the Vercel project.
2. Use Vercel-provided DNS records.
3. Remove GitHub Pages apex A records.
4. Remove `www` CNAME pointing to `samuelmjprice.github.io`.
5. Remove the repository `CNAME` file or disable GitHub Pages custom domain to avoid ownership conflicts.
