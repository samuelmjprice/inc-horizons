# HORIZONS Slack Setup Guide Updated

Workspace name: `inc-horizons 2026`

The website is the source of truth. Slack is the communication and alert layer. Build Slack privately first and do not invite the wider team until tested and approved.

## Channels

- `#horizons-main`: General event communication.
- `#horizons-red-flags`: Urgent issues, risks, decisions, and unresolved conflicts.
- `#horizons-schedule`: Schedule updates and day-by-day changes.
- `#horizons-production`: Call sheet, crew, setup, technical, rehearsals, and production updates.
- `#horizons-content`: Photo, video, drone, BTS, vox pops, highlight reel.
- `#horizons-podcast`: Podcast schedule, guests, timings, room setup, and changes.
- `#horizons-suppliers`: Supplier arrivals, setup, logistics, access, and timing changes.
- `#horizons-entertainment`: DJs, performers, sound checks, performance slots, and curated music.
- `#horizons-locations`: Location-specific issues and space updates.
- `#horizons-documents`: Missing files, uploads, artwork, print assets, and reference documents.
- `#horizons-decisions`: Leadership decisions and open approvals.
- `#horizons-test`: Private Slack integration testing

## Security Rule

Do not paste Slack webhook URLs or tokens into `content.json`, `script.js`, GitHub Pages, Excel comments, or public documents. Use backend/serverless environment variables only.

## Placeholder Environment Variables

- `SLACK_WEBHOOK_MAIN`
- `SLACK_WEBHOOK_RED_FLAGS`
- `SLACK_WEBHOOK_SCHEDULE`
- `SLACK_WEBHOOK_PRODUCTION`
- `SLACK_WEBHOOK_CONTENT`
- `SLACK_WEBHOOK_PODCAST`
- `SLACK_WEBHOOK_SUPPLIERS`
- `SLACK_WEBHOOK_ENTERTAINMENT`
- `SLACK_WEBHOOK_LOCATIONS`
- `SLACK_WEBHOOK_DOCUMENTS`
- `SLACK_WEBHOOK_DECISIONS`
- `SLACK_WEBHOOK_TEST`

## Event Alert Mapping

- `red_flag_created, red_flag_resolved` -> `#horizons-red-flags`
- `schedule_changed` -> `#horizons-schedule`
- `call_sheet_changed, speaker_content_updated` -> `#horizons-production`
- `content_capture_changed` -> `#horizons-content`
- `podcast_changed` -> `#horizons-podcast`
- `supplier_changed` -> `#horizons-suppliers`
- `entertainment_changed` -> `#horizons-entertainment`
- `location_schedule_changed` -> `#horizons-locations`
- `document_missing, cvent_conflict_found` -> `#horizons-documents`
- `decision_needed` -> `#horizons-decisions`
- `All test alerts` -> `#horizons-test`

## Recommended First Test

1. Create `#horizons-test`.
2. Add Samuel Price and Chris Manoe only.
3. Configure a serverless endpoint with test webhook environment variables.
4. Send a test red flag and schedule update.
5. Approve before inviting the wider team.
