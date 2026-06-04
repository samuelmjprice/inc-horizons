# Complex Tool UX Pattern

Date: 2026-06-04

## Purpose
Complex tools should not be squeezed into ordinary cards on mobile.

## Applies To
- HORIZONS Hall Control Centre
- Round Table Assignments
- Guests / Namecards advanced editing
- Menus advanced view
- Capture Log
- Admin / Developer Data
- Signage file review
- Seating / reserved seat tools

## Pattern
- `app-tool-panel`: full-width desktop panel or full-screen mobile sheet.
- `app-tool-header`: compact title, primary action, close control.
- `app-tool-actions`: one primary action plus secondary More menu.
- `app-tool-tabs`: desktop tabs only where space allows.
- `app-tool-section-select`: mobile section selector instead of clipped tabs.
- `app-tool-body`: internal scroll area with safe scroll padding.
- `app-tool-card`: content card inside the tool body.
- `app-tool-sticky-save`: use only when it does not cover fields.

## Rules
- Summary first, details one tap deeper.
- One major item open at a time where appropriate.
- Avoid nested accordions for active editing.
- Forms should use full-width mobile panels or inline single-column layout.
- Hide global bottom navigation while a full-screen tool is open.
