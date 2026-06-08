# Shared Update Backend Connection Report

The site already had a shared `/api/updates` backend with Supabase support. This pass keeps that as the source of truth and extends it for reports, lifecycle statuses, and sitewide soft-delete.

If the configured backend is unavailable, report/update/status actions now show clear failure feedback instead of saving a local-only record that looks synced.
