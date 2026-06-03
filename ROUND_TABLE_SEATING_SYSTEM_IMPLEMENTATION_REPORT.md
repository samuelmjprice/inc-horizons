# Round Table Seating System Implementation Report

Date: 2026-06-03

## What Changed

- Added `roundTableSeatingPlan` to `content.json`.
- Seeded 10 tables with 9 empty guest slots per table.
- Default slot status is `Guest Needed`.
- Added the editable seating system under `HORIZONS Hall Round Table Layout`.
- Added capacity warning: `Seat Count Needs Confirmation`.
- Added source note explaining the 80-seat PDF versus 90-slot working requirement.
- Added safe guest search using existing Guests / Namecards data.
- Added duplicate assignment warning with move/cancel behavior.
- Added clear seat, clear table, save table, refresh, CSV export, print, and copy summary controls.

## Website Placement

- Primary placement: Locations -> HORIZONS Hall -> Layouts + Production References -> HORIZONS Hall Round Table Layout.
- Guest cards can show table assignment when a guest has been assigned.
- Call Sheet and Schedule link back to the round-table seating plan where the plan ID is present.
- Documents / Missing Files include the updated layout request.

## Privacy

- The editor uses safe fields only: guest name, company, category, guest status, and safe dietary/allergy flag.
- DOB, passport, rooming, PNR, visa, travel cost, private notes, and private medical data are not displayed.

## UX

- The round-table system is collapsed by default.
- Each table is collapsed by default.
- Mobile uses stacked table cards and seat cards.
- There are no wide spreadsheet tables.

## Remaining

- Confirm final seat count per table.
- Confirm whether the uploaded 80-seat layout is final.
- Confirm final guest assignments.
- Confirm the final round-table schedule moment.
