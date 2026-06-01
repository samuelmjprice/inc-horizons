# Data Quality Audit

Audit date: 1 June 2026

## Summary

The website data is extensive and mostly well-structured. The main issue is not missing sections; it is unresolved operational data.

## Current Counts

- Schedule records: 310
- Task records: 310
- Location records: 32
- Location schedule rows: 340
- Restaurant schedule rows: 95
- Travel rows: 40
- Documents: 60
- Missing file records: 84
- Placeholder / missing / needs-confirmation references found in JSON scan: 2665
- Duplicate IDs found in JSON scan: 0
- Document records needing file/link work: 30
- Travel records needing cleanup: 31

## Findings

| Area | Finding | Risk | Action |
|---|---|---:|---|
| Emergency medical | Hospital and route still unconfirmed. | High | Samuel/Chris/venue to confirm. |
| Travel | Many vague travel rows remain. | Medium | Use `TRAVEL_DATA_CLEANUP_NEEDED.md`. |
| Documents | Multiple final files and links missing. | High | Use `MISSING_IMAGES_FILES_QUESTIONS_FOR_SAMUEL.md`. |
| Speaker / Podcast | Final guest/session data still incomplete. | High | Team data pass required. |
| Signage / Artwork | Placement files, maps, and totem details incomplete. | High | Team data pass required. |
| Contacts | Emails missing for some contacts. | Medium | Do not invent; request from team. |
| Staff | Some staff/team assignments still need human confirmation. | Medium | Use staff list review. |
| Slack | Production routing not approved. | Medium | Keep test-only until approved. |

## Data Rule

Unconfirmed values should remain visible as `Needs Confirmation`, `File Needed`, `Map Needed`, `Email Needed`, or similar. Do not silently remove placeholders before team review.
