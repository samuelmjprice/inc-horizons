# Slack Activity Log

Slack test notifications are live through the Vercel backend and Supabase activity table.

Production channel webhooks remain intentionally disabled until Samuel/Chris approve routing beyond `#horizons-test`.

| ID | Sent At | Sent By | Event Type | Channel | Message Title | Related Item ID | Website Link | Status | Error Message | Payload Preview |
| -- | ------- | ------- | ---------- | ------- | ------------- | --------------- | ------------ | ------ | ------------- | --------------- |
| slack-setup-pending | 2026-05-29 | Codex | test_message | #horizons-test | Slack setup pending | slack_setup | https://inc-horizons.com/#slack | Queued | Webhooks not configured. | Slack notifications pending setup. |
| slack_1780070578280_y3aoik | 2026-05-29 | website | test_message | #horizons-test | HORIZONS Slack Test | slack-test | https://inc-horizons.com/#slack | Sent |  | Safe backend test sent to `#horizons-test`. |
| slack_1780070810096_md8gm0 | 2026-05-29 | website | test_message | #horizons-test | HORIZONS Final Backend Test | final-slack-test | https://inc-horizons.com/#slack | Sent |  | Final safe test after live site was pointed at shared backend. |
| slack_1780077880518_env3sr | 2026-05-29 | website | decision | #horizons-test | QA Slack comment test | test-mode-slack-route | https://inc-horizons.com/#today | Sent |  | Notify Slack comment routed through test mode only. |
