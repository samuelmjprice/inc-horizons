# Report Issue System Implementation Plan

See `REPORT_ISSUE_SITEWIDE_UPDATES_IMPLEMENTATION_PLAN.md`.

This pass uses the existing `/api/updates` shared backend as the source of truth, extends it with report metadata and soft-delete, and removes the local-only archived update deletion flow from the active team-facing site.
