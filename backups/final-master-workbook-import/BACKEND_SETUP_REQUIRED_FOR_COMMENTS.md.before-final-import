# Backend Setup Status For Comments

Shared comments are now connected to a Vercel API backed by Supabase Postgres.

`localStorage` remains only as a draft/offline fallback if the backend cannot be reached.

Required routes:

- `GET /api/updates?parent_type=...&parent_id=...`
- `POST /api/updates`
- `PATCH /api/updates/:id`
- `DELETE /api/updates/:id`
- `PATCH /api/updates/:id/resolve`
- `PATCH /api/updates/:id/reopen`
- `PATCH /api/updates/:id/archive`
- `POST /api/updates/:id/send-to-slack`

Database tables created:

- `record_updates`
- `slack_activity_log`

Required fields:

- `id`
- `parent_type`
- `parent_id`
- `title`
- `body`
- `author_name`
- `author_email`
- `status`
- `visibility`
- `priority`
- `notify_slack`
- `slack_channel`
- `slack_sent_at`
- `slack_message_ts`
- `slack_error`
- `created_at`
- `updated_at`
- `resolved_by`
- `resolved_at`
- `archived_at`
- `source`

Backend API base:

- `https://inc-horizons.vercel.app`

The live site at `https://inc-horizons.com` loads `meta.backendApiBase` from `content.json` and posts team updates to `/api/updates`.
