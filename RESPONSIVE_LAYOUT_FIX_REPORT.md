# Responsive Layout Fix Report

Date: 2026-06-04

## Fixes Applied
- HORIZONS Hall tool header is compact on mobile.
- HORIZONS Hall desktop tabs remain, mobile uses a Section selector.
- Mobile Hall Overview, Round Tables, stats, and seat fields collapse to one column.
- Mobile contact/action rows stack full-width.
- Mobile filter/form controls receive 44px minimum tap targets.
- Global bottom section navigation hides inside full-screen Hall tool.
- Admin-heavy and long menu sections use content-visibility for mobile performance.
- Cache bust updated to `20260604-apple-mobile1`.

## Risks Avoided
- No data removed.
- No seating data changed.
- No guest privacy fields exposed.
- No desktop Hall control centre functionality removed.

## Remaining
- Full route-level separation for Admin would be a larger change.
- Capture Log drawer would be useful but was not included in this safe pass.
