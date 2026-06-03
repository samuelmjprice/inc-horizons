# Round Table Backend Status Report

## Current backend
- Frontend uses the existing configured backend base and `/api/seating-plan`.
- Live shared persistence is supported through Vercel.
- Dedicated Supabase tables are specified but still need migration confirmation.

## Storage behavior
- Preferred: `round_table_assignments`, `round_table_assignment_activity`, `round_table_plan_config`.
- Current fallback: shared snapshot via existing `record_updates` table.
- UI displays storage warnings when dedicated seating tables are unavailable or save fails.

## Security
- No Supabase service keys are exposed in the frontend.
- API routes use server-side environment variables.
- Guest data shown in the editor is limited to safe operational fields.
