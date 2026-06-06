# Ask HORIZONS Search Fix Report

## What was broken
- The homepage search had already been partly moved away from destructive global filtering, but it still used a small section-only result list and did not behave like a guided command palette.
- Result clicks used ordinary hash navigation, which could land under sticky UI or mid-section.

## What changed
- Search now uses a shared safe result builder used by both homepage search and Ask HORIZONS Lite.
- Homepage search results render as action cards and no longer change the global page filters.
- Result clicks clear the homepage search panel, close Ask HORIZONS if open, activate the correct top-level group, and scroll with sticky-header offset.
- No sensitive fields are intentionally indexed. Keys matching DOB, passport, visa, PNR, booking/reference, rooming, private notes, costs, webhooks, API keys, Supabase keys, Vercel tokens, or secrets are excluded from the searchable blob.

## Tests run
- `node --check script.js`
- `python3 -m json.tool content.json`

## Remaining
- Full live-device QA should still be repeated after deployment.
