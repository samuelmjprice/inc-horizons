# HORIZONS Hall Control Centre Current Audit

## Current implementation before this pass
- The HORIZONS Hall location card rendered the Hall control panel directly inside the location card footer.
- The round table assignment system lived inside that location card, so the working area inherited the narrow card width.
- The tabbed Hall experience existed, but it was still constrained by the location card DOM container.
- Theatre seating, stage design, rehearsals, files, and round table assignments were technically separated by tabs but visually felt cramped because they were inside the card.

## Constrained / nested elements
- `renderLocations()` injected the Hall panel into the HORIZONS Hall card footer.
- `renderRoundTableAssignmentSystem()` rendered the table selector and selected table inside that nested panel.
- Seat assignment controls were visible as form fields inside the limited card space.

## Backend status
- Seating assignments use `/api/seating-plan`.
- Live shared persistence is available through the existing Vercel/Supabase snapshot fallback.
- Dedicated Supabase seating tables are defined in `backend/supabase-schema.sql` but still need migration confirmation.
- The system is not local-only when the Vercel backend is reachable.

## Files needing change
- `script.js`: move Hall tools out of the card and mount a full Hall Control Centre.
- `style.css`: add full-screen/full-width control centre styles.
- `index.html`: cache-bust assets.
- Reports and missing questions tracker.

## Must be preserved
- Round table seating system.
- Theatre seating plan link.
- Round table layout link.
- Stage design link.
- Export CSV, print plan, copy summary.
- Shared backend save path.
- Guest/namecard privacy protections.
