# HORIZONS Slack Setup Guide

Slack is prepared but not live. Human admin setup required.

The website remains the source of truth. Slack is the communication and alert layer.

## Workspace

Workspace name: `inc-horizons 2026`

Do not invite the wider team until testing is complete and approved.

## Private Build Invite List

- Samuel Price
- Chris Manoe
- Technical admin/developer access only

## Core Testing Invite List

- Samuel Price
- Chris Manoe
- Dawn Ramsden
- Pili Lopez
- Samuel Hosier
- Tamy Hosier
- Dean Whitehead
- Joshua Gavin
- Fede Tamburini

## Channels

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

Optional private:

- `#horizons-leadership`
- `#horizons-client-approvals`

## Slack App

App name: `Horizons Ops Bot`

Use `slack-app-manifest.json` as the starting manifest.

Phase 1 uses Incoming Webhooks. Phase 2 can use `chat.postMessage` with `chat:write` if dynamic posting or direct messages are needed. Slash commands are Phase 3 only.

## Environment Variables

Set the variables listed in `SLACK_ENVIRONMENT_VARIABLES.md` in the backend/serverless host, not in frontend code.

Never commit webhook URLs, bot tokens, signing secrets, or workspace IDs.

## Website Integration

The frontend now supports:

- Slack channel previews.
- Notify Slack checkbox on team updates.
- Local Slack activity queue/pending state.
- Copy-to-Slack summary actions.
- Backend-ready schemas and serverless scaffolds.

Live Slack sending requires:

- Backend endpoint: `POST /api/slack/send`
- Database-backed Slack Activity Log
- `SLACK_WEBHOOK_*` environment variables

## Test Plan

Use `#horizons-test` first for:

- Red flag alert.
- Schedule update.
- Call sheet summary.
- Missing file request.
- Podcast update.
- Supplier update.
- Entertainment update.
- Location update.
- Decision request.
- Normal comment with no Slack notification.
- Comment with Notify Slack checked.
- Private/admin comment blocked from public Slack.

## Approval Gate

Before wider invite, confirm:

- Channels are correct.
- Alerts route correctly.
- Website buttons work.
- No duplicate alerts are created.
- Private/admin notes do not post publicly.
- Message formatting is clear.
- BeGood and Aream & Co. spellings are correct.
- Samuel Price and Samuel Hosier are separate.
- Initials are replaced with full names where possible.
