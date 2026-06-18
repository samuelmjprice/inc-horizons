# DNS Full Migration To Vercel Report

Date: 18 June 2026

## DNS Provider

GoDaddy / DomainControl.

Nameservers:

```txt
ns07.domaincontrol.com
ns08.domaincontrol.com
```

## Records Removed

Removed old GitHub Pages records:

```txt
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  samuelmjprice.github.io.
```

## Records Added / Preserved For Vercel

Active GoDaddy records:

```txt
A     @    216.198.79.1
A     @    76.76.21.21
CNAME www  ee2308c7a6b33f98.vercel-dns-017.com.
```

Unrelated records preserved:

```txt
NS    @    ns07.domaincontrol.com.
NS    @    ns08.domaincontrol.com.
CNAME _domainconnect _domainconnect.gd.domaincontrol.com.
SOA   @    ns07.domaincontrol.com.
TXT   _dmarc preserved
```

## QA

DNS now resolves to Vercel and no longer resolves to GitHub Pages.

```txt
inc-horizons.com -> 216.198.79.1
www.inc-horizons.com -> ee2308c7a6b33f98.vercel-dns-017.com.
```

HTTP and HTTPS requests are served by Vercel and redirect logged-out users to the archive lock screen.

