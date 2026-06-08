# Report Issue System QA Report

## Automated

- `node --check script.js` passed.
- `python3 -m json.tool content.json` passed.
- Active team-facing files no longer contain `Delete this archived local update`, `saved on this device`, `local until`, or `backend is connected`.

## Code Checks

- The specific `Delete this archived local update` prompt was removed from active frontend code.
- Team-facing capture copy no longer says suggestions are saved on this device.
- Report/update submit failures no longer create local-only records that appear synced.

## Manual Browser QA

- Local server opened at `http://127.0.0.1:4177/`.
- Page loaded with the report/update cache-busted CSS and JS.
- Ask HORIZONS opened successfully.
- Ask HORIZONS `Report Issue` opened the branded report modal.
- Report modal prefilled section as `Ask HORIZONS`.
- Slack channel selector defaulted to `#horizons-main`.
- Slack preview included the current site URL.
- Report Inbox container rendered under Admin.
- Section-level report buttons rendered across major sections.

## Backend Lifecycle Smoke Test

- Created a `Website Issue` update through the backend handler.
- Confirmed new report records default to `New`.
- Moved it from `New` to `Acknowledged`.
- Soft-deleted it through the shared update lifecycle.
- Confirmed deleted records are filtered from shared update listing.

## Browser Tool Limitation

- The in-app browser automation could open and inspect the report modal, but form text entry failed because the Browser plugin reported its virtual clipboard helper was not installed. The backend lifecycle test covers the critical shared create/status/delete behavior.
