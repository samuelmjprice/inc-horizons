# Backend / Comments / Slack Audit

Audit date: 1 June 2026

## Backend Status

- Frontend backend base: `https://inc-horizons.vercel.app`
- Shared comments route: `/api/updates`
- Slack send route: `/api/slack/send`
- Database: Supabase
- Slack test channel: `#horizons-test`

## Tests

| Test | Result | Notes |
|---|---|---|
| Shared comment save | Passed | Test comment saved through `/api/updates`. |
| Shared comment read | Passed | Test comment was retrieved from `/api/updates`. |
| Test comment cleanup | Passed | Test comment marked `Archived`. |
| Slack test send | Passed | Test message sent to `#horizons-test`. |
| Production Slack spam | Passed | No production Slack channels were tested or enabled. |
| Secret exposure | Passed | No webhook URLs or service keys found in source scan. |

## Important Caveat

Capture Log is currently local/browser persisted only. If the team uses it as a real production logging tool, add a Supabase-backed `capture_log` table and API route.

## Slack Routing

Production Slack routing remains pending approval. Keep normal comments website-first, and use manual Slack notify only when the route is approved.
