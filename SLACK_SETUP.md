# Slack Setup

Last updated: 1 June 2026

## Current Decision

Use one Slack workspace only:

`International Collective`

HORIZONS event channels live inside this same workspace. Do not create a second HORIZONS workspace.

Use Slack Pro if/when billing is approved by Samuel/Chris. Do not choose Business+ unless explicitly approved later.

Current setup status:

- Workspace display name has been changed to `International Collective`.
- Workspace URL remains `inc-horizons.slack.com`.
- Workspace is on a free Slack Pro trial through 27 June 2026.
- Paid Pro upgrade checkout has not been completed; Samuel/Chris billing approval is still required.
- Required core INC, business division, and Circle private channels have been created.
- Existing HORIZONS channels have been preserved.
- `#horizons-test` has been verified with a backend website-to-Slack test message.

## Why Slack Pro

Slack Pro is enough for the current HORIZONS / International Collective setup because it supports:

- Unlimited message history.
- Unlimited app integrations.
- Huddles/group meetings.
- External collaboration.
- Website-to-Slack notifications.
- Private channels.
- Searchable event and company history.

Business+ is not needed right now because the team has not requested SAML SSO, SCIM user management, advanced compliance exports, or enterprise governance.

## Privacy Model

Privacy is controlled by channel privacy, not by sidebar sections.

Default new channels to private unless Samuel/Chris approve public access.

Do not invite clients, suppliers, or wider event collaborators into internal INC private channels.

## Workspace Admin Notes

- Rename the workspace display name to `International Collective` if admin settings allow it.
- Do not change the workspace URL unless Samuel/Chris approve it and current links, logins, webhooks, and app integrations have been checked.
- Keep `Horizons Ops Bot` installed and working.
- Keep `#horizons-test` working as the safe website-to-Slack test channel.

## Internal INC Channels

Create or confirm these private channels:

- `#inc-main`
- `#inc-core-team`
- `#inc-red-flags-urgent`
- `#inc-finance`
- `#inc-media-production`
- `#inc-marketing-web-social`
- `#inc-leads-new-deals`
- `#inc-systems-tech`

Status on 1 June 2026: all required internal INC channels above exist as private channels. Similar earlier channels were renamed to approved names where safe.

## Business Division Channels

Create or confirm these private channels:

- `#biz-chris-manoe`
- `#biz-world-main`
- `#biz-singers`
- `#biz-dancers`
- `#biz-artists`
- `#biz-agency-105`
- `#biz-circle`
- `#biz-ip`

Status on 1 June 2026: all required `#biz-*` channels above were created as private channels.

## INC Circle Channels

Create or confirm these private channels:

- `#circle-team-inc`
- `#circle-outreach-inc`
- `#circle-content-inc`

Status on 1 June 2026: all required `#circle-*` channels above were created as private channels. The business side of INC Circle lives in `#biz-circle`.

## HORIZONS Event Channels

Create or confirm these channels inside the same International Collective workspace:

- `#horizons-main`
- `#horizons-red-flags`
- `#horizons-schedule`
- `#horizons-production`
- `#horizons-content`
- `#horizons-podcast`
- `#horizons-suppliers`
- `#horizons-entertainment`
- `#horizons-locations`
- `#horizons-documents`
- `#horizons-decisions`
- `#horizons-test`

Private-by-default is recommended for all HORIZONS channels until the access plan is approved.

Status on 1 June 2026: HORIZONS channels already exist in the workspace and were not renamed or deleted. Their access/privacy should be reviewed before inviting wider users. `#horizons-test` is working and should remain connected to `SLACK_WEBHOOK_TEST`.

Existing channels needing later review:

- `#inc-leadership`
- `#samuel-chris`
- `#all-inc-horizons`
- `#social`
- `#new-channel`

Do not delete or archive these without Samuel/Chris approval.

## Website Integration

The website remains the source of truth. Slack is the notification layer.

Current safe route:

- `#horizons-test`

Website alerts should only route to HORIZONS channels unless Samuel/Chris approve an internal INC route.

Recommended first production routes later:

- `#horizons-red-flags`
- `#horizons-schedule`
- `#horizons-production`
- `#horizons-documents`

Manual Notify Slack buttons should be used before broad automatic alerts.

## Environment Variables

Webhook URLs and tokens must stay in Vercel environment variables, not frontend code.

Keep using:

- `SLACK_WEBHOOK_TEST`

Add production webhooks only after routing is approved:

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

Do not commit `.env`, webhook URLs, bot tokens, signing secrets, or workspace IDs.

## Required Approval Before Wider Use

Samuel/Chris should approve:

- Slack Pro billing.
- Final channel access.
- Which production channels receive website alerts.
- Whether any HORIZONS channel should be public inside the workspace.
- Which clients/suppliers can join which event channels.
- Whether automatic urgent alerts should be enabled beyond manual Notify Slack.
