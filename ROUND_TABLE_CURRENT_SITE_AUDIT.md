# HORIZONS Hall Round Table Current Site Audit

Date: 2026-06-03

## Current Records Found

- HORIZONS Hall exists as `location-horizons-hall`.
- HORIZONS Hall layout records exist in `horizonsHallLayouts`.
- `hall-layout-round-table-x80` already links to `assets/horizons-hall-layouts/horizons-hall-round-table-layout-x80.pdf`.
- The round-table source file is preserved as `Horizons - Farmers Market x80 V5.pdf`, but team-facing labels use `HORIZONS Hall Round Table Layout`.
- Guests / Namecards exist as canonical safe guest records in `guests`.
- No editable table-assignment system existed before this pass.
- No shared round-table assignment backend routes existed before this pass.

## Conflicts / Gaps

- Source PDF shows seated capacity 80.
- Current working request requires 10 tables x 9 guest slots, or 90 working slots.
- Final seats per table need confirmation from Kirsty / Clownfish.
- Existing table placeholders were non-editable and assumed 8 seats shown / confirmation needed.
- No user-facing Farmers Market label should be used for the live seating tool.

## Recommended Placement

- Primary: Locations -> HORIZONS Hall, inside the HORIZONS Hall Round Table Layout card.
- Secondary links: Guests / Namecards, Call Sheet, Schedule, Documents / Links, Assets, HORIZONS Hall Layouts, Admin / Developer Data.

## Changes Needed

- Add shared editable seating plan.
- Seed 10 tables and 9 empty slots per table.
- Connect the guest selector to safe Guests / Namecards fields.
- Add duplicate assignment protection.
- Add export, print, copy, refresh, save, and clear-table actions.
- Add server-side API routes so the feature is not local-only.
