# Delete Archived Update Sitewide Sync Report

Archived update deletion now:

- uses branded confirmation
- patches the shared backend
- sets `status: Deleted`
- sets `deleted_at`
- removes the record from active/archived team-facing views after backend success
- leaves the record visible and shows an error if backend sync fails
