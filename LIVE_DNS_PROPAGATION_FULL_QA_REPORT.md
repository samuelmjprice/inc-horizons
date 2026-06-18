# Live DNS Propagation Full QA Report

Date: 18 June 2026

## DNS Results

```txt
inc-horizons.com -> 216.198.79.1
www.inc-horizons.com -> ee2308c7a6b33f98.vercel-dns-017.com.
```

The `www` CNAME resolves onward through Vercel infrastructure.

## HTTP / HTTPS

Passed:

```txt
https://inc-horizons.com -> HTTP/2 307, server: Vercel
https://www.inc-horizons.com -> HTTP/2 307, server: Vercel
```

Both domains redirect logged-out users to:

```txt
/archive-lock.html?next=%2F
```

## Certificates

Both domains now present valid Let's Encrypt certificates:

```txt
inc-horizons.com
www.inc-horizons.com
```

