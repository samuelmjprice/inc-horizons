# Codex Action And Bug Backlog

## Current Open Items

| Item | Area | Status | Notes |
| --- | --- | --- | --- |
| Apply updated Supabase schema | Backend / Report Issue | Needs deployment | Run `backend/supabase-schema.sql` against the live Supabase project so report metadata and `deleted_at` are available. |
| Test live Report Issue save | Report Inbox | Needs live backend QA | Local syntax checks pass; live site should be tested after deploy. |
| Test archived update delete sitewide | Updates | Needs live backend QA | Verify soft-delete removes archived update from all browsers after refresh. |
| Move capture suggestions to shared backend | Content Capture | Deferred | Current pass points team-wide issues to Report Issue; capture suggestions still need a separate migration decision. |
| Replace seating native confirmations | HORIZONS Hall seating | Deferred | Seating plan prompts are separate from report/update lifecycle and should be handled in a focused seating UX pass. |
