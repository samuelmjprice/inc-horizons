# Accessibility UX Fix Report

Date: 2026-06-04

## Fixes Applied
- HORIZONS Hall Control Centre keeps dialog semantics.
- Added labelled X close button.
- Mobile section selector has an explicit label and current-section helper text.
- Hall tabs remain available on desktop with `role=tab` and `aria-selected`.
- Mobile tap targets remain at least 44px where practical.
- Global section navigation hides inside the full-screen Hall tool to reduce focus/interaction conflict.

## Remaining Recommendations
- Add focus trap for full-screen tools.
- Add Escape-key close for Hall Control Centre.
- Add one-open-at-a-time behavior to some dense accordions if the team wants stricter mobile simplicity.
