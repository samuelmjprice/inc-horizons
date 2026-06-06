# Samuel Review Recovery QA Report

Date: 6 June 2026

## Commands

| Check | Result |
| --- | --- |
| `node --check script.js` | Passed |
| `python3 -m json.tool content.json` | Passed |
| Local HTTP `content.json` fetch | Passed: `200`, 2,138,029 bytes |
| Cache bust check | Passed: `index.html` now references `20260606-samuel-recovery1` for CSS and JS |
| Asset path existence scan | Passed: 40 referenced asset paths checked, 0 missing |

## Active Data Checks

| Check | Result |
| --- | --- |
| Archived complaint red flags hidden from active render | Passed: no active podcast slot count, unknown initials, 33 poker/casino chair, or hospital-route red flag remains active |
| Completed decision clutter hidden from active render | Passed: no active podcast slot, Slack integration, or Cvent export owner decision remains active |
| Missing-file tracker done items hidden from active render | Passed: StudioBinder, current production sheet, weather sheet, final master schedule, Ben's document, crew call sheet, speaker bios and speaker list are no longer active missing items |
| Documents non-file/resolved placeholders | Resolved placeholders are hidden from live document rendering |
| Sensitive fields | No new sensitive travel/private fields were added. Historical/report mentions remain in admin/report files only |

## Browser / Local Site Notes

- A local server was already running on port `8765`; the recovery pass reused it.
- Dedicated Playwright was not available in the Node REPL environment, so this pass used local HTTP and source/asset checks rather than a full visual browser screenshot pass.
- The primary deploy-risk issue found during smoke testing was fixed: `index.html` was still pointing to the older Ask Lite cache-bust string.

## Remaining Confirmation Items

- Exact hospital/clinic and emergency route.
- Nearby pharmacy.
- Subject 2 / Subject 3 / Subject 4 podcast arrival labels.
- Kelechi email/contact and final team label.
- Final HORIZONS Hall logo source if the live Programme logo still renders incorrectly.

