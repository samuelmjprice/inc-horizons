# Report Issue / Sitewide Updates Implementation Plan

## Current Storage Path

- Team update forms render through `updateModule()` in `script.js`.
- Shared updates already use the configured backend base from `content.json` / `window.HORIZONS_API_BASE` and call `/api/updates`.
- The backend currently stores records in Supabase table `record_updates` when `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are configured.
- Browser `localStorage` currently remains as a cache/fallback through `horizons-card-updates-v1`.
- Archived update deletion is currently local-only in `script.js` and uses a native `window.confirm()`.
- Backend `deleteUpdate()` currently hard-deletes records when Supabase is configured.

## Local-Only Wording / Behavior Found

- `script.js` has the visible archived update prompt: `Delete this archived local update? Source records are not deleted.`
- Capture log deletion also uses local-only wording.
- Capture suggestions still say they are saved on this device until shared storage is enabled.
- Some historic reports and docs still describe local-only workflows. Active team-facing UI needs to move to shared wording.

## Existing Backend Capability

- `/api/updates` supports shared list and create.
- `/api/updates/[id]` routes to update actions.
- `backend/serverless/updates.mjs` supports resolve, reopen, archive, send-to-Slack and delete.
- `backend/serverless/storage-adapter.mjs` supports Supabase and in-memory fallback.
- Schema needs to be extended for soft-delete and richer report metadata.

## Report Issue Flow

- Add a reusable branded Report Issue modal.
- Open it from Ask HORIZONS and section-level buttons.
- Auto-fill section, URL hash, and current context when possible.
- Save report records to the shared updates backend.
- Do not silently save reports locally if the shared backend fails.

## Slack Routing Plan

- Use a frontend routing map for report type to suggested Slack channel.
- Show channel selector and message preview before send.
- Save only remains available when Slack is not configured.
- Sensitive-looking content triggers a branded warning before Slack send.

## Status Sync Plan

- Keep backend records as the source of truth for update/report status.
- Patch status changes through `/api/updates/[id]`.
- On success, update rendered instances and cache only as a local copy.
- On failure, show clear feedback and do not pretend the update synced.

## Delete Archived Update Plan

- Replace native confirm with branded modal.
- Backend delete becomes soft-delete: set `deleted_at`, `status: Deleted`, and `updated_at`.
- Shared list calls filter out deleted updates by default.
- Successful delete removes the archived update from all team-facing views.
- Failed delete leaves the update visible and shows `Could not delete sitewide. Try again.`

## QA Plan

- Validate JavaScript and JSON.
- Search for local-only wording and native update/delete confirms.
- Test report submit, Slack preview, archive, reopen, and delete on desktop/mobile.
- Verify no secrets or private travel fields are exposed.
