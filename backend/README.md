# HORIZONS Backend Scaffold

This folder contains backend-ready scaffolding for shared team updates and Slack notifications.

The live GitHub Pages site is static, so these modules are not active until deployed to a backend or serverless host such as Vercel, Netlify, Cloudflare Workers, or a small Node API.

Required runtime responsibilities:

- Persist `record_updates` in a shared database.
- Persist `slack_activity_log` records.
- Persist HORIZONS Hall round-table seating assignments through `/api/seating-plan`.
- Keep Slack webhook URLs in environment variables only.
- Never expose Slack webhook URLs or bot tokens in frontend JavaScript.
- Return clear pending/error states to the static website.

Recommended first implementation:

1. Deploy these serverless handlers behind `/api/updates` and `/api/slack/send`.
2. Connect `backend/serverless/storage-adapter.mjs` to Supabase Postgres or another shared database.
3. Add the `SLACK_WEBHOOK_*` variables listed in `SLACK_ENVIRONMENT_VARIABLES.md`.
4. Test all Slack traffic in `#horizons-test` before enabling live channels.

## HORIZONS Hall Round Table Seating

The editable round-table seating tool uses server-side Vercel API routes:

- `GET /api/seating-plan`
- `POST /api/seating-plan`
- `PATCH /api/seating-plan`
- `POST /api/seating-plan/activity`

Preferred Supabase tables are documented in `backend/supabase-schema.sql`:

- `round_table_assignments`
- `round_table_assignment_activity`
- `round_table_plan_config`

If those dedicated tables have not been migrated yet, the API saves shared snapshots through the existing `record_updates` table. This keeps the website shared/persistent while the final database migration is confirmed. Do not expose the Supabase service role key in frontend code.
