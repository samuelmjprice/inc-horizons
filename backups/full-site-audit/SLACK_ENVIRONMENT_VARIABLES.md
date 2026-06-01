# Slack Environment Variables

Slack test posting is live through `SLACK_WEBHOOK_TEST`.

Live production channel webhooks are still pending approval and should be added only after the team confirms routing and noise levels.

Do not commit webhook URLs, bot tokens, signing secrets, or workspace IDs.

Required Phase 1 webhook variables:

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

Optional future variables:

- `SLACK_BOT_TOKEN`
- `SLACK_SIGNING_SECRET`
- `SLACK_APP_ID`
- `SLACK_WORKSPACE_ID`

Current configured Vercel variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SLACK_WEBHOOK_TEST`

Use `SLACK_WEBHOOK_TEST` first. Do not enable live channels until `#horizons-test` passes and Samuel/Chris approve broader Slack posting.
