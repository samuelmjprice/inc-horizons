# Live Domain Archive Password Full QA Report

Date: 18 June 2026

## Live Domain

```txt
https://inc-horizons.com
https://www.inc-horizons.com
```

## QA Results

Passed:

- Password screen appears for logged-out visitors.
- Wrong password fails.
- Correct password unlocks the site.
- Session cookie keeps the site unlocked after refresh.
- Direct `/content.json` is protected when logged out.
- Direct `/content.json` works only after archive login.
- Server header is Vercel.
- HTTPS works with valid certificates.

## Evidence

```txt
Logged-out /: 307 -> /archive-lock.html?next=%2F
Logged-out /content.json: 307 -> /archive-lock.html?next=%2Fcontent.json
Wrong password: 303 -> /archive-lock.html?error=1&next=%2F
Correct password: 303 -> /
Unlocked /: 200
Unlocked /content.json: 200
```

