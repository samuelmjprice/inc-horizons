# Validation Final QA Report

Commands run:

- `node --check script.js` passed.
- `python3 -m json.tool content.json` passed.
- `npm run check` could not run because `npm` is not installed in this shell. The underlying commands in `package.json` were run directly and passed.

Browser QA:

- Local server: `http://127.0.0.1:4177/`.
- Desktop viewport: 1440 x 1000.
- Mobile viewport: 390 x 844.
- Browser QA runner: `tools/full_site_qa_playwright.mjs`.

Known local-only browser console warnings:

- Production API CORS blocks localhost for updates and seating plan. This is expected and should be tested on `https://inc-horizons.com` after deploy.
