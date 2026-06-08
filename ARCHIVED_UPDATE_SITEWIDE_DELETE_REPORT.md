# Archived Update Sitewide Delete Report

Archived update delete now uses a branded confirmation modal:

`Delete archived update? This will remove the archived update for everyone using the site. Source event records are not deleted.`

On confirm, the frontend patches `/api/updates/:id` with `action: delete`. The backend soft-deletes by setting `status: Deleted` and `deleted_at`, then list calls hide deleted records from team-facing views.
