# Archive Current State Full Access Report

Date: 18 June 2026

## Current State

The HORIZONS archive is now served from Vercel on the live domains.

```txt
https://inc-horizons.com -> Vercel, 307 to /archive-lock.html when logged out
https://www.inc-horizons.com -> Vercel, 307 to /archive-lock.html when logged out
https://inc-horizons-seven.vercel.app -> Vercel, 307 to /archive-lock.html when logged out
```

Direct data access is also protected:

```txt
https://inc-horizons.com/content.json -> 307 to /archive-lock.html when logged out
```

## DNS

Current authoritative records seen in GoDaddy:

```txt
A     @    216.198.79.1
A     @    76.76.21.21
CNAME www  ee2308c7a6b33f98.vercel-dns-017.com.
NS    @    ns07.domaincontrol.com.
NS    @    ns08.domaincontrol.com.
CNAME _domainconnect _domainconnect.gd.domaincontrol.com.
TXT   _dmarc preserved
```

The old GitHub Pages apex records were removed:

```txt
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

The old GitHub Pages `www` target was removed:

```txt
samuelmjprice.github.io.
```

## Vercel

The Vercel project `inc-horizons` was created/imported under `samuelmjprice's projects` from `samuelmjprice/inc-horizons`.

Production deployment:

```txt
https://inc-horizons-seven.vercel.app
```

Both custom domains show Valid Configuration in Vercel:

```txt
inc-horizons.com
www.inc-horizons.com
```

