# DNS Migration To Vercel Report

Date: 18 June 2026

## DNS Provider

Nameservers:

```txt
ns07.domaincontrol.com
ns08.domaincontrol.com
```

Likely provider: GoDaddy / DomainControl.

## Current Public Records

Apex:

```txt
inc-horizons.com A 185.199.108.153
inc-horizons.com A 185.199.109.153
inc-horizons.com A 185.199.110.153
inc-horizons.com A 185.199.111.153
```

WWW:

```txt
www.inc-horizons.com CNAME samuelmjprice.github.io
```

## Migration Status

Blocked: DNS provider login/session/API access is not available in this environment.

Vercel has not yet provided exact DNS records because the domain could not be added to a Vercel project from this environment.

## Required DNS Changes After Vercel Domain Add

Use the exact records shown by Vercel.

Remove old GitHub Pages records:

```txt
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Remove:

```txt
www CNAME samuelmjprice.github.io
```

Add the exact Vercel-provided apex and `www` records.

## TTL

Current observed TTL: 3600 seconds.

## Fresh Verification - 18 June 2026 13:16 UTC

Current DNS still points to GitHub Pages:

```txt
inc-horizons.com A 185.199.108.153
inc-horizons.com A 185.199.109.153
inc-horizons.com A 185.199.110.153
inc-horizons.com A 185.199.111.153
www.inc-horizons.com CNAME samuelmjprice.github.io
```

`https://inc-horizons.com` returns a GitHub Pages `404`, so the event hub is not publicly exposed on the custom domain, but the branded Vercel archive gate is not yet serving the custom domain.
