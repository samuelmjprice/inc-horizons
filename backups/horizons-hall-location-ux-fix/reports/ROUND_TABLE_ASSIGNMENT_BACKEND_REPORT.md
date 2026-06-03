# Round Table Assignment Backend Report

Date: 2026-06-03

## Routes Added

- `GET /api/seating-plan`
- `POST /api/seating-plan`
- `PATCH /api/seating-plan`
- `POST /api/seating-plan/activity`

## Server Files Added

- `backend/serverless/seating-plan.mjs`
- `api/seating-plan/index.js`
- `api/seating-plan/activity.js`

## Supabase Schema Added

- `round_table_assignments`
- `round_table_assignment_activity`
- `round_table_plan_config`

## Persistence Behavior

- Preferred storage: dedicated Supabase tables listed above.
- Compatibility fallback: if the dedicated tables have not been migrated yet, the API writes a shared snapshot to the existing `record_updates` table.
- If no backend is available, the frontend shows: `Shared seating storage unavailable. Changes are not saved yet.`

## Security

- No Supabase service role key is exposed in frontend code.
- API routes rely on server-side Vercel environment variables.
- No Slack webhook or private key was committed.

## QA Required On Live Backend

- Confirm the dedicated Supabase migration has been applied.
- Confirm a save writes to Supabase.
- Confirm another browser/session can reload the saved assignment.
- Confirm activity logs write successfully.
