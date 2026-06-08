# Shared Update Data Model Report

`record_updates` has been extended in `backend/supabase-schema.sql` with report fields including `record_type`, `section`, related item/person/location/date, owner, suggested fix, `deleted_at`, source URL, device context, and metadata.

The storage adapter is compatibility-tolerant: it writes the richer fields when the live Supabase schema has them, and falls back to the legacy record shape if the schema has not been upgraded yet.
