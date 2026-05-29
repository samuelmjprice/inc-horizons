# Deploy This HORIZONS Website Update

This package contains the current local HORIZONS website update.

Commits included:

- `7f226c0 Add dedicated call sheet and emergency location support`
- Latest local packaging/scaffold commit: run `git log --oneline -1` in this folder.

Current live deploy status:

- The local site is updated.
- `git push origin main` has succeeded.
- GitHub Pages is serving the latest `20260529-nextpass1` build at https://inc-horizons.com/.
- The ZIP remains available as a manual fallback package.

## What Changed

- Added dedicated `CALL SHEET` page/section with day tabs.
- Added call sheet weather, emergency medical, notes, schedule, red flags, missing files, print, and copy-to-Slack summary actions.
- Added Open-Meteo live weather with local caching and graceful fallback.
- Added emergency medical placeholder: `Nearest Hospital — Needs Confirmation`.
- Added Google Maps support/placeholders on location records.
- Added Data Health Dashboard, Duplicate Review, and Site Data & UX Audit admin sections.
- Added Slack-ready fields to update/comment forms.
- Added backend-ready scaffolds for shared comments and Slack notifications.
- Added Slack setup docs, environment variable docs, channel map, and app manifest.
- Added completion matrix and final updated files folder.

## Manual GitHub Upload

If a future SSH or token push is blocked:

1. Unzip `inc-horizons-website-update-2026-05-29.zip`.
2. Open the GitHub repository: `samuelmjprice/inc-horizons`.
3. Upload or commit the included files to the `main` branch.
4. Preserve the folder structure exactly.
5. Wait for GitHub Pages to deploy.
6. Test [https://inc-horizons.com/](https://inc-horizons.com/).

Key files to replace:

- `index.html`
- `style.css`
- `script.js`
- `content.json`
- `README.md`
- `data-dictionary.md`
- `WEBSITE_UPDATE_WORKFLOW.md`
- `WEBSITE_REVIEW_NOTES.md`
- `TEAM_TRACKER_INSTRUCTIONS.md`
- `SITE_DATA_UX_AUDIT.md`
- `DATA_HEALTH_DASHBOARD.md`
- `DUPLICATE_REVIEW.md`
- `CODEX_COMPLETION_MATRIX.md`
- `SLACK_WORKSPACE_SETUP_REQUIRED.md`
- `SLACK_ENVIRONMENT_VARIABLES.md`
- `SLACK_TEST_PLAN.md`
- `BACKEND_SETUP_REQUIRED_FOR_SLACK.md`
- `BACKEND_SETUP_REQUIRED_FOR_COMMENTS.md`
- `slack-app-manifest.json`
- `slack-channel-map.json`
- `backend/`
- `api/`
- `schemas/`
- changed `assets/` and final export files

## SSH Fix Option

Current remote:

```bash
git@github.com:samuelmjprice/inc-horizons.git
```

Public key to add to GitHub:

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKoIDG4TCoKW4zzLLC/ff2P6wK6Bd1t+Vf5s5vyDFutW inc-horizons GitHub Pages
```

Add it as either:

- a user SSH key for the GitHub account that can push to `samuelmjprice/inc-horizons`, or
- a repository deploy key with write access.

Then run:

```bash
git push origin main
```

## HTTPS Token Option

Create a GitHub Personal Access Token with repository write access for `samuelmjprice/inc-horizons`.

For a fine-grained token, grant:

- Repository access: `samuelmjprice/inc-horizons`
- Contents: Read and write
- Metadata: Read

Then switch the remote if needed:

```bash
git remote set-url origin https://github.com/samuelmjprice/inc-horizons.git
git push origin main
```

Do not commit or paste the token into any file.

## Local Only / Not Live Yet

- Shared comments backend is scaffolded but not deployed.
- Slack notifications are prepared but not live.
- Slack workspace/channels/webhooks require human admin setup.

## Still Needs Confirmation

- Exact hospital/emergency medical location, address, route, phone, and venue emergency contact.
- Exact Google Maps pins for internal venue/location spaces.
- Slack workspace, channels, app, webhooks, and environment variables.
- Final podcast schedule, speaker content, rehearsal timings, staff lists, Cvent exports, final menus, signage placement map, and remaining production/source documents.
