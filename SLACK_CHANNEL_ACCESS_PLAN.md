# Slack Channel Access Plan

Last updated: 1 June 2026

## Workspace Decision

- Workspace display name: `International Collective`
- Workspace URL: `inc-horizons.slack.com`
- Workspace model: one Slack workspace only.
- HORIZONS event operations live inside the International Collective workspace.
- Privacy separation is handled by private channels, not by a second workspace.
- Recommended plan: Slack Pro.
- Do not upgrade to Business+ unless Samuel Price / Chris Manoe explicitly approve it later.
- Do not change the workspace URL unless Samuel/Chris approve it and existing links, webhooks, logins, and app integrations have been checked.

## Setup Status

- Workspace display name changed from `INC-HORIZONS` to `International Collective`.
- Workspace URL was not changed.
- Workspace is on a free Slack Pro trial through 27 June 2026.
- Paid Pro checkout/billing still needs Samuel/Chris approval.
- Required core INC, business division, and Circle channels were created as private channels.
- Similar earlier channels were renamed to the approved names where safe:
  - `#inc-ops` -> `#inc-core-team`
  - `#inc-production` -> `#inc-media-production`
  - `#inc-business-growth` -> `#inc-leads-new-deals`
  - `#inc-admin` -> `#inc-systems-tech`
- Existing HORIZONS channels were preserved and not renamed.
- `#horizons-test` remains connected to the website-to-Slack test integration and was verified after the rename.
- No wider team, clients, or suppliers were invited.

## Naming Logic

- `inc-` = core company operations.
- `biz-` = business divisions.
- `circle-` = INC Circle team/content/outreach.
- `horizons-` = HORIZONS event operations.

## Privacy Rules

- Default new channels to private.
- Slack sidebar sections are visual only; channel privacy controls access.
- Do not invite clients, suppliers, or wider event collaborators into internal INC private channels.
- Do not invite anyone until Samuel/Chris approve this access plan.
- Website alerts should route only to HORIZONS event channels unless Samuel/Chris explicitly approve otherwise.

## Suggested Access Groups

| Group | Suggested Members | Primary Channels |
| --- | --- | --- |
| Samuel + Chris | Samuel Price, Chris Manoe | `#inc-main`, `#inc-core-team`, `#inc-red-flags-urgent`, `#inc-finance`, `#inc-leads-new-deals`, `#inc-systems-tech`, `#biz-chris-manoe`, relevant `#biz-*`, relevant `#horizons-*` |
| Core International Collective team | Approved INC core team only | `#inc-main`, `#inc-core-team`, relevant department channels only |
| Production team | Approved production/content team | `#inc-media-production`, `#horizons-production`, `#horizons-content`, `#horizons-schedule` |
| Marketing / web / social team | Approved marketing/web/social team | `#inc-marketing-web-social`, `#inc-systems-tech` if needed, `#horizons-documents` if working on event files/assets |
| Sales / business development | Approved sales/business team | `#inc-leads-new-deals`, relevant `#biz-*` channels |
| INC Circle team | Approved Circle team | `#circle-team-inc`, `#circle-outreach-inc`, `#circle-content-inc`, `#biz-circle` if involved in Circle business |
| HORIZONS event team | Approved event collaborators only | Approved `#horizons-*` channels only |
| Suppliers / external people | Specific approved contacts only | `#horizons-suppliers`, possibly `#horizons-documents` |
| Client / Aream team | Approved client/Aream contacts only | `#horizons-main`, `#horizons-schedule`, `#horizons-documents`, possibly `#horizons-decisions` if approved |

## Channel Plan

| Channel name | Group | Private/Public | Purpose | Who should be invited | Who should not have access | Website alert connected? | Slack webhook needed? | Current status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `#inc-main` | Core INC | Private | Main company updates. | Approved INC core team. | Clients, suppliers, HORIZONS-only collaborators unless approved. | No | No | Created private | Primary company channel. |
| `#inc-core-team` | Core INC | Private | Team execution. | Samuel/Chris and approved core team. | Clients, suppliers, HORIZONS-only collaborators. | No | No | Renamed from `#inc-ops`; private | Approved replacement for broad ops/team channel. |
| `#inc-red-flags-urgent` | Core INC | Private | Urgent blockers. | Samuel/Chris and relevant senior owners. | Wider team, clients, suppliers unless approved. | No | No | Created private | Internal urgent company blockers. |
| `#inc-finance` | Core INC | Private | Finance. | Samuel/Chris and approved finance/admin owners. | Wider team, clients, suppliers. | No | No | Created private | Keep sensitive. |
| `#inc-media-production` | Core INC | Private | Production. | Approved production/media team. | Clients/suppliers unless explicitly approved. | No | No | Renamed from `#inc-production`; private | Avoid duplicate `inc-production`. |
| `#inc-marketing-web-social` | Core INC | Private | Marketing + digital. | Approved marketing/web/social team. | Unapproved wider team, clients, suppliers. | No | No | Created private | Covers web/social/marketing. |
| `#inc-leads-new-deals` | Core INC | Private | Sales + deals. | Samuel/Chris and approved business-development team. | Event-only team, clients/suppliers unless approved. | No | No | Renamed from `#inc-business-growth`; private | Approved deals channel. |
| `#inc-systems-tech` | Core INC | Private | Software, access + tools. | Samuel/Chris and approved systems owners. | Clients, suppliers, wider team. | No | No | Renamed from `#inc-admin`; private | Internal systems/access/tools. |
| `#biz-chris-manoe` | Business divisions | Private | Chris business direction. | Samuel/Chris and approved leadership. | Wider team, clients, suppliers. | No | No | Created private | Strategic direction. |
| `#biz-world-main` | Business divisions | Private | All world businesses. | Samuel/Chris and approved business owners. | Event-only team, clients, suppliers. | No | No | Created private | Business umbrella. |
| `#biz-singers` | Business divisions | Private | Singers INC business. | Approved Singers business team. | Event-only team, clients/suppliers unless approved. | No | No | Created private | Business division. |
| `#biz-dancers` | Business divisions | Private | Dancers INC business. | Approved Dancers business team. | Event-only team, clients/suppliers unless approved. | No | No | Created private | Business division. |
| `#biz-artists` | Business divisions | Private | Artist business. | Approved artist business team. | Event-only team, clients/suppliers unless approved. | No | No | Created private | Business division. |
| `#biz-agency-105` | Business divisions | Private | Agency 105 business. | Approved Agency 105 business team. | Event-only team, clients/suppliers unless approved. | No | No | Created private | Business division. |
| `#biz-circle` | Business divisions | Private | Circle business. | Samuel/Chris and approved Circle business owners. | Circle content/outreach-only users unless approved. | No | No | Created private | Business side of INC Circle. |
| `#biz-ip` | Business divisions | Private | INC IP + assets. | Samuel/Chris and approved IP/assets owners. | Wider team, clients, suppliers. | No | No | Created private | Sensitive business/IP channel. |
| `#circle-team-inc` | INC Circle | Private | Circle team. | Approved Circle team. | Non-Circle team unless approved. | No | No | Created private | Team coordination. |
| `#circle-outreach-inc` | INC Circle | Private | Circle outreach. | Approved Circle outreach team. | Non-Circle team unless approved. | No | No | Created private | Outreach pipeline. |
| `#circle-content-inc` | INC Circle | Private | Circle content. | Approved Circle content team. | Non-Circle team unless approved. | No | No | Created private | Content planning and delivery. |
| `#horizons-main` | HORIZONS event | Privacy review needed | Main event. | Approved HORIZONS team. | Unapproved suppliers/clients. | Possible later | `SLACK_WEBHOOK_MAIN` later | Already existed; preserved | Review privacy before wider invite. |
| `#horizons-red-flags` | HORIZONS event | Privacy review needed | Urgent event issues. | Leadership, ops leads, relevant owners. | Wider team unless approved. | Later, phased | `SLACK_WEBHOOK_RED_FLAGS` later | Already existed; preserved | Recommended first production alert channel after approval. |
| `#horizons-schedule` | HORIZONS event | Privacy review needed | Schedule. | Leadership, ops, production, podcast as needed. | Unapproved external collaborators. | Later, phased | `SLACK_WEBHOOK_SCHEDULE` later | Already existed; preserved | Manual notify first. |
| `#horizons-production` | HORIZONS event | Privacy review needed | Production. | Production team, ops leads, leadership. | Unapproved clients/suppliers. | Later, phased | `SLACK_WEBHOOK_PRODUCTION` later | Already existed; preserved | Manual notify first. |
| `#horizons-content` | HORIZONS event | Privacy review needed | Content capture. | Content/production team and relevant leads. | Unapproved clients/suppliers. | Later | `SLACK_WEBHOOK_CONTENT` later | Already existed; preserved | HORIZONS content only. |
| `#horizons-podcast` | HORIZONS event | Privacy review needed | Podcast. | Podcast team, Samuel Price, production support. | Unapproved wider team. | Later | `SLACK_WEBHOOK_PODCAST` later | Already existed; preserved | Manual notify first. |
| `#horizons-suppliers` | HORIZONS event | Privacy review needed | Suppliers. | Supplier managers and approved supplier contacts only. | Internal INC-only roles unless relevant. | Later | `SLACK_WEBHOOK_SUPPLIERS` later | Already existed; preserved | Use limited supplier access. |
| `#horizons-entertainment` | HORIZONS event | Privacy review needed | Entertainment. | Entertainment owner, production/ops leads, approved performers as needed. | Unapproved suppliers/clients. | Later | `SLACK_WEBHOOK_ENTERTAINMENT` later | Already existed; preserved | Performer details contained. |
| `#horizons-locations` | HORIZONS event | Privacy review needed | Locations. | Ops, venue/production leads, relevant owners. | Unapproved suppliers/clients. | Later | `SLACK_WEBHOOK_LOCATIONS` later | Already existed; preserved | Useful for onsite logistics. |
| `#horizons-documents` | HORIZONS event | Privacy review needed | Files + docs. | Leadership, ops, production, document owners. | Suppliers/clients unless approved for specific needs. | Later, phased | `SLACK_WEBHOOK_DOCUMENTS` later | Already existed; preserved | Recommended first production alert channel after approval. |
| `#horizons-decisions` | HORIZONS event | Privacy review needed | Approvals. | Samuel/Chris, leadership, approved decision-makers. | Wider team, suppliers, clients unless approved. | Later | `SLACK_WEBHOOK_DECISIONS` later | Already existed; preserved | Sensitive leadership event channel. |
| `#horizons-test` | HORIZONS event | Privacy review needed | Testing. | Samuel Price, Chris Manoe, technical admin/testers. | Wider team. | Yes, test only | `SLACK_WEBHOOK_TEST` | Works; verified 1 June 2026 | Do not delete or rename without updating Vercel env. |

## Existing Channels Needing Review

| Channel | Status | Notes |
| --- | --- | --- |
| `#inc-leadership` | Existing private channel | Created in previous pass. Not part of the latest approved naming list; keep until Samuel/Chris decide whether to archive, rename, or retain. |
| `#samuel-chris` | Existing private channel | Useful private working channel. Latest naming list does not require removal. |
| `#all-inc-horizons` | Existing default channel | Review before inviting anyone; likely default/public workspace channel. |
| `#social` | Existing channel | Review purpose and privacy before use. |
| `#new-channel` | Existing channel | Review/archive later if not needed. Do not delete without approval. |

## Production Alert Rollout

Phase 1:

- Keep website Slack routing in test mode.
- Use `#horizons-test` for QA.
- Do not invite wider team.

Phase 2:

- Enable only the first approved production channels, likely:
  - `#horizons-red-flags`
  - `#horizons-schedule`
  - `#horizons-production`
  - `#horizons-documents`
- Keep manual Notify Slack buttons first.
- Do not enable broad auto-alerts.

Phase 3:

- Add additional production channel webhooks after Samuel/Chris approve routing and access.

