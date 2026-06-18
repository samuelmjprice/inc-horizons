# Post Password Unlock Site Feature QA Report

Date: 18 June 2026

## Scope

After archive login, the static HORIZONS site unlocks and serves core files from Vercel.

## Checks Completed

Passed:

- Archive login API sets a valid session cookie.
- Root page returns `200` with the session cookie.
- `content.json` returns `200` with the session cookie.
- Root page and data remain blocked without the session cookie.

## Notes

Full functional event-site QA after unlock was not repeated in this final DNS migration pass. The focus of this pass was hosting, password protection, DNS migration, and direct-data protection.

