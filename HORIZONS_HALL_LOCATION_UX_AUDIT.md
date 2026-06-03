# HORIZONS Hall Location UX Audit

## Current state before this UX pass
- HORIZONS Hall content existed in Locations with layout references for theatre seating, round table layout, stage design, and reserved seats.
- The editable round table assignment system existed and used the shared `/api/seating-plan` backend path.
- The UI was nested inside `Layouts + Production References`, then inside another round-table details block, then individual table details.
- On mobile this created a confusing dropdown stack and made it hard to know whether the user was viewing files, editing seats, or opening layout references.

## Backend status
- `/api/seating-plan` is available on the Vercel backend.
- Dedicated Supabase tables are defined in `backend/supabase-schema.sql`.
- Until those dedicated tables are migrated, the live system persists via the existing shared `record_updates` snapshot fallback.
- The system is shared, not local-only, when the Vercel backend is reachable.

## What needed restructuring
- HORIZONS Hall needed a location-specific control panel rather than generic layout cards.
- Round Tables needed to be separated from Theatre Seating and Stage / Technical references.
- Only one table should be visible at a time by default.
- Edit mode needed clearer separation from view mode.
- Export/print/copy actions needed a clear utility row.

## What remains unchanged
- Existing seating data, source trace, PDFs, guest/namecard source, backend routes, and privacy exclusions remain in place.
