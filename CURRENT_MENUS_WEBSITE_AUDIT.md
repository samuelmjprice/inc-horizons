# Current Menus Website Audit

Updated: 3 June 2026

## Current Records Found

- Existing Menus section found in `index.html` with search, date, location, meal type, Needs Confirmation filter, Expand all, and Collapse all controls.
- Existing canonical `content.json` menu records found: 25.
- Source PDF linked in Documents: `assets/menus/final/horizons-menus-wip5.pdf`.
- Menu cards are rendered by `renderMenus()` in `script.js` using native closed `<details>` controls.
- Full menu content is not visible by default.

## Current Menu Coverage

- 09.06.26: 4 records.
- 10.06.26: 8 records.
- 11.06.26: 8 records.
- 12.06.26: 5 records.
- All requested records from `HORIZONS_MENUS_WIP5.pdf` are present.

## Links Found

- Call Sheet links: all 25 menu records link to the relevant day-level call sheet record.
- Restaurant Schedule links: safe links exist only where the location match was clear.
- Linked restaurant/menu examples include Beach Caves Dinner, Pool Deck Canapes, and HORIZONS House Menu.
- Menus with unclear location remain unlinked to Restaurant Schedules and are marked for confirmation.

## Issues Fixed In This Pass

- Added explicit `location_status` to all menu records.
- Updated the document title to `HORIZONS Final Menus`.
- Marked the old `Final menus` missing-file blocker as added to the website.
- Added live menu detail labels so controls read `Open menu` when closed and `Close menu` when open.
- Updated cache busting to `20260603-menus1`.

## Remaining Issues

- 20 menu records still need final location confirmation.
- Several restaurant schedule links remain intentionally unlinked because the PDF page does not provide a clear venue.
- Dinner Drinks and Tea & Coffee need exact venue confirmation.
