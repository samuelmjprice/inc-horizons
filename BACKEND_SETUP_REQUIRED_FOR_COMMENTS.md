# Backend Setup Required For Comments

The current GitHub Pages frontend includes a backend-ready update form, but shared comments are not live until a database/API is connected.

Shared updates must not rely on `localStorage` as source of truth. `localStorage` may only be used as a draft/offline fallback.

Required routes:

- `GET /api/updates?parent_type=...&parent_id=...`
- `POST /api/updates`
- `PATCH /api/updates/:id`
- `DELETE /api/updates/:id`
- `PATCH /api/updates/:id/resolve`
- `PATCH /api/updates/:id/reopen`
- `PATCH /api/updates/:id/archive`
- `POST /api/updates/:id/send-to-slack`

Required database table: `record_updates`

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

Recommended database options:

- Supabase Postgres with Row Level Security.
- Firebase/Firestore.
- Airtable for a fast non-engineering admin layer.
- A small Postgres database behind Vercel/Netlify/Cloudflare functions.

Until this backend exists, the website must show shared updates as pending backend connection.
