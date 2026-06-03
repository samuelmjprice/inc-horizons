# HORIZONS Hall Location UX Redesign Report

## What changed
- Added a dedicated `HORIZONS Hall Control Panel` inside the HORIZONS Hall location card.
- Replaced the confusing nested layout/dropdown stack with segmented tabs.
- Added tabs: Overview, Round Tables, Theatre Seating, Stage / Technical, Rehearsals, Files.
- Kept the panel collapsed by default while making the primary action clear: `Open Hall Control Panel`.

## Operational structure
- Overview answers what the space is, what happens there, what layout references exist, and what still needs action.
- Round Tables contains the editable seating assignment tool.
- Theatre Seating is read-only and includes reserved seats placeholder.
- Stage / Technical is read-only production reference.
- Rehearsals shows Hall-related rehearsal cards only.
- Files shows linked HORIZONS Hall layout documents and the updated layout request.

## Mobile intent
- The tab row can scroll horizontally on narrow screens.
- The selected table panel replaces the previous all-tables-open/dropdown stack.
- Save controls become a sticky mobile save bar in edit mode.
