# HORIZONS Final Updated Files - Start Here

This folder is the organized handoff for the current HORIZONS website and operations records.

## Master File

Use `HORIZONS_MASTER_EVENT_CONTROL_UPDATED.xlsx` as the primary source-of-truth workbook for event control records.

## What Each File Is

- `HORIZONS_MASTER_EVENT_CONTROL_UPDATED.xlsx` - master event control workbook.
- `HORIZONS_WEBSITE_CONTROL_UPDATED.xlsx` - website control and publishing support workbook.
- `HORIZONS_DAILY_RUNBOOK_UPDATED.xlsx` - daily operations/runbook workbook.
- `HORIZONS_CONTACTS_AND_WHO_DO_I_CALL.xlsx` - contacts and escalation workbook.
- `HORIZONS_MISSING_FILES_TRACKER_UPDATED.xlsx` - missing files and human confirmations tracker.
- `HORIZONS_SOURCE_ARCHIVE_UPDATED.xlsx` - source/archive register.
- `HORIZONS_SLACK_SETUP_GUIDE_UPDATED.md` - Slack setup and rollout guide.
- `HORIZONS_WEBSITE_DATA_EXPORT_UPDATED.json` - current website data export from `content.json`.
- `SITE_DATA_UX_AUDIT.md` - audit report for data, UX, and section structure.
- `DATA_HEALTH_DASHBOARD.md` - data health/admin dashboard notes.
- `DUPLICATE_REVIEW.md` - duplicate review report.
- `CODEX_COMPLETION_MATRIX.md` - requirement-by-requirement completion matrix.
- `README_DEPLOY_THIS_UPDATE.md` - deployment instructions and GitHub authentication fallback.
- `SLACK_WORKSPACE_SETUP_REQUIRED.md` - human Slack workspace/channel setup steps.
- `SLACK_ENVIRONMENT_VARIABLES.md` - environment variable names required for Slack.
- `SLACK_TEST_PLAN.md` - Slack channel/message testing checklist.
- `BACKEND_SETUP_REQUIRED_FOR_SLACK.md` - backend/serverless requirements for secure Slack posting.
- `BACKEND_SETUP_REQUIRED_FOR_COMMENTS.md` - backend/database requirements for shared comments.
- `SLACK_ACTIVITY_LOG.md` - temporary Slack log until the backend database is connected.
- `slack-app-manifest.json` - Slack app manifest for Horizons Ops Bot.
- `slack-channel-map.json` - website event to Slack webhook environment-variable map.

## Where To Find Critical Information

- Contact details: `HORIZONS_CONTACTS_AND_WHO_DO_I_CALL.xlsx`, `TEAM_CONTACTS`, and the website Contacts section.
- Who Do I Call: `HORIZONS_CONTACTS_AND_WHO_DO_I_CALL.xlsx` and the website Who Do I Call section.
- Schedule: `HORIZONS_MASTER_EVENT_CONTROL_UPDATED.xlsx`, `HORIZONS_DAILY_RUNBOOK_UPDATED.xlsx`, and website Schedule/Call Sheet sections.
- Location schedules: website Location Schedules and `HORIZONS_MASTER_EVENT_CONTROL_UPDATED.xlsx`.
- Restaurant schedules: website Restaurants section and master workbook.
- Website data: `HORIZONS_WEBSITE_DATA_EXPORT_UPDATED.json`.
- Source/archive data: `HORIZONS_SOURCE_ARCHIVE_UPDATED.xlsx`.
- Missing files and confirmations: `HORIZONS_MISSING_FILES_TRACKER_UPDATED.xlsx`.
- Slack setup: `HORIZONS_SLACK_SETUP_GUIDE_UPDATED.md`, `SLACK_WORKSPACE_SETUP_REQUIRED.md`, and `SLACK_ENVIRONMENT_VARIABLES.md`.

## Live vs Local

- Local website update: complete.
- Latest pushed commit: `e1fb4b9 Ignore local deployment zip packages`.
- Live deployment: complete. GitHub Pages is serving the latest `20260529-nextpass1` build at https://inc-horizons.com/.
- Slack: prepared but not live. Human admin setup required.
- Shared comments backend: scaffolded but not deployed. GitHub Pages cannot run backend/API routes directly.

## Still Needs Confirmation

- Exact nearest hospital/emergency medical location, address, Google Maps link, route, emergency phone, and venue emergency contact.
- Exact Google Maps/internal pins for the main venue spaces.
- Final podcast schedule and guests.
- Final speaker content, bios, session descriptions, and deck copy.
- Final rehearsal timings.
- Clownfish/INC/hotel staff lists.
- Entertainment rider details, arrival times, sound checks, and hospitality needs.
- Curated playlist links and start/stop ownership.
- Cvent exports.
- Final menu files and dietary notes.
- Venue maps, floor plans, seating plans, stage layouts, and signage placement map.
- StudioBinder call sheet example, production contact hierarchy, crew call sheet layout, and Ben's document.
