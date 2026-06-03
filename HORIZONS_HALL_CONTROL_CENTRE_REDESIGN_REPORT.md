# HORIZONS Hall Control Centre Redesign Report

## What changed
- HORIZONS Hall location card is now a compact summary and launcher.
- The full Hall tools now mount separately as `HORIZONS Hall Control Centre`.
- The control centre uses a fixed full-width/full-screen dialog shell, not the narrow location card.
- Tabs remain persistent inside the control centre: Overview, Round Tables, Theatre Seating, Stage / Technical, Rehearsals, Files.

## Location card behavior
- Shows HORIZONS Hall summary and action buttons.
- Keeps Google Maps, location schedule, Call Sheet and Open Hall Control Centre actions.
- No longer renders the full seating editor, all seat fields, or all PDFs inside the card.

## Round Tables behavior
- Round Tables are still the main working tool.
- Table chips remain available for Tables 1-10.
- Only one selected table renders at a time.
- Seat rows show compact summaries by default.
- Seat edit fields appear only for the selected seat in edit mode.

## Modal / full-width behavior
- Desktop uses a wide centered panel up to approximately 1360px.
- Mobile uses a full-screen sheet with sticky header and scrollable content.
- Body scroll is locked while the control centre is open.

## Preserved tools
- Open/download round table layout PDF.
- Export CSV.
- Print seating plan.
- Copy table summary.
- Theatre seating tab and reserved seat placeholders.
- Stage / Technical tab.
- Rehearsals tab.
- Files tab.
