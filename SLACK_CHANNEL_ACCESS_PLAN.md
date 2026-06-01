# Slack Channel Access Plan

Last updated: 1 June 2026

## Workspace Decision

- Workspace display name: `International Collective`
- Workspace model: one Slack workspace only.
- HORIZONS event operations live inside the International Collective workspace.
- Privacy separation is handled by private channels, not by a second workspace.
- Recommended plan: Slack Pro.
- Do not upgrade to Business+ unless Samuel Price / Chris Manoe explicitly approve it later.
- Do not change the workspace URL unless Samuel/Chris approve it and existing links, webhooks, logins, and app integrations have been checked.

## Setup Rules

- Default new channels to private unless Samuel/Chris approve public access.
- Do not invite the wider team until this access plan is approved.
- Do not invite clients, suppliers, or wider event collaborators into internal INC private channels.
- Website alerts should route only to HORIZONS channels unless Samuel/Chris explicitly approve otherwise.
- `#horizons-test` remains the safe website-to-Slack test channel.
- Production webhooks should be enabled gradually, starting with manual notifications only.
- Setup status on 1 June 2026: workspace display name changed to `International Collective`; workspace URL left unchanged at `inc-horizons.slack.com`; workspace is on a Slack Pro trial through 27 June 2026; required private INC channels were created; existing HORIZONS channels and `#horizons-test` were preserved.

## Suggested Access Groups

| Group | Suggested Members | Primary Channels |
| --- | --- | --- |
| Core leadership | Samuel Price, Chris Manoe | `#samuel-chris`, `#inc-leadership`, `#inc-main`, `#inc-ops`, `#horizons-main`, `#horizons-red-flags`, `#horizons-decisions`, `#horizons-schedule`, `#horizons-production`, `#horizons-documents`, `#horizons-test` |
| INC production team | Approved INC production/content team | `#inc-production`, `#horizons-production`, `#horizons-content`, `#horizons-schedule` |
| Event operations team | Approved event operations/logistics leads | `#inc-ops`, `#horizons-main`, `#horizons-schedule`, `#horizons-red-flags`, `#horizons-locations`, `#horizons-documents` |
| Podcast team | Approved podcast leads/support | `#horizons-podcast`, `#horizons-production`, `#horizons-schedule` |
| Suppliers | Specific approved supplier contacts only | `#horizons-suppliers`, possibly `#horizons-documents` |
| Client / Aream team | Approved client/Aream contacts only | `#horizons-main`, `#horizons-schedule`, `#horizons-documents`, possibly `#horizons-decisions` if approved |

## Channel Plan

| Channel name | Private/Public | Purpose | Who should be invited | Who should not have access | Website alert connected? | Slack webhook needed? | Current status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `#inc-main` | Private | General International Collective internal company updates. | Approved INC core team. | Clients, suppliers, wider event collaborators unless approved. | No | No | Created private | Internal company channel. |
| `#inc-leadership` | Private | Leadership decisions, strategy, sensitive company direction. | Samuel Price, Chris Manoe, approved leadership only. | Non-leadership, clients, suppliers. | No | No | Created private | Sensitive internal channel. |
| `#inc-ops` | Private | Operations, planning, logistics, company execution. | Approved INC operations/core team. | Clients/suppliers unless specifically approved. | No | No | Created private | Internal operations channel. |
| `#inc-production` | Private | Production team, filming, editing, creative production, content delivery. | Approved INC production/content team. | Clients/suppliers unless specifically approved. | No | No | Created private | Internal production channel. |
| `#inc-business-growth` | Private | Business development, partnerships, growth opportunities, sales, proposals. | Samuel/Chris and approved business-growth team. | Event-only collaborators, clients/suppliers unless approved. | No | No | Created private | Internal commercial channel. |
| `#inc-admin` | Private | Admin, systems, access, finance/admin notes, internal documentation. | Samuel/Chris and approved admin/system owners. | Clients, suppliers, wider team. | No | No | Created private | Keep sensitive. |
| `#samuel-chris` | Private | Private working channel for Samuel Price and Chris Manoe. | Samuel Price, Chris Manoe. | Everyone else unless explicitly approved. | No | No | Created private | CEO/Samuel execution channel. |
| `#horizons-main` | Private recommended | Main event notices and approved event-wide updates. | Approved HORIZONS team. | Unapproved suppliers/clients. | Possible later | `SLACK_WEBHOOK_MAIN` later | Already existed; privacy review still recommended | Could become public inside workspace only if approved. |
| `#horizons-red-flags` | Private recommended | Urgent risks, issues, blockers, fast attention items. | Leadership, operations leads, relevant owners. | Wider team unless approved. | Later, phased | `SLACK_WEBHOOK_RED_FLAGS` later | Already existed; privacy review still recommended | Recommended first production alert channel after approval. |
| `#horizons-schedule` | Private recommended | Schedule changes, timing updates, call-time changes. | Leadership, ops, production, podcast as needed. | Unapproved external collaborators. | Later, phased | `SLACK_WEBHOOK_SCHEDULE` later | Already existed; privacy review still recommended | Manual notify first. |
| `#horizons-production` | Private recommended | Call sheet, run of show, crew call, rehearsals, technical flow. | Production team, ops leads, leadership. | Unapproved clients/suppliers. | Later, phased | `SLACK_WEBHOOK_PRODUCTION` later | Already existed; privacy review still recommended | Manual notify first. |
| `#horizons-content` | Private recommended | Photo, video, drone, BTS, social content capture. | Content/production team and relevant leads. | Unapproved clients/suppliers. | Later | `SLACK_WEBHOOK_CONTENT` later | Already existed; privacy review still recommended | HORIZONS content only. |
| `#horizons-podcast` | Private recommended | Podcast schedule, guests, recording setup, presenter/guest logistics. | Podcast team, Samuel Price, production support. | Unapproved wider team. | Later | `SLACK_WEBHOOK_PODCAST` later | Already existed; privacy review still recommended | Manual notify first. |
| `#horizons-suppliers` | Private recommended | Supplier arrivals, setup, open questions, logistics. | Supplier managers and approved supplier contacts only. | Internal INC-only roles unless relevant. | Later | `SLACK_WEBHOOK_SUPPLIERS` later | Already existed; privacy review still recommended | Use limited supplier access. |
| `#horizons-entertainment` | Private recommended | DJs, performers, live entertainment, sound checks, timing. | Entertainment owner, production/ops leads, approved performers as needed. | Unapproved suppliers/clients. | Later | `SLACK_WEBHOOK_ENTERTAINMENT` later | Already existed; privacy review still recommended | Keep performer details contained. |
| `#horizons-locations` | Private recommended | Location-specific updates, venue movements, map/location issues. | Ops, venue/production leads, relevant owners. | Unapproved suppliers/clients. | Later | `SLACK_WEBHOOK_LOCATIONS` later | Already existed; privacy review still recommended | Useful for onsite logistics. |
| `#horizons-documents` | Private recommended | Missing files, uploaded documents, menus, maps, artwork, links. | Leadership, ops, production, document owners. | Suppliers/clients unless approved for specific needs. | Later, phased | `SLACK_WEBHOOK_DOCUMENTS` later | Already existed; privacy review still recommended | Recommended first production alert channel after approval. |
| `#horizons-decisions` | Private recommended | Event decisions requiring approval. | Samuel/Chris, leadership, approved decision-makers. | Wider team, suppliers, clients unless approved. | Later | `SLACK_WEBHOOK_DECISIONS` later | Already existed; privacy review still recommended | Sensitive leadership channel. |
| `#horizons-test` | Private recommended | Website-to-Slack test messages only. | Samuel Price, Chris Manoe, technical admin/testers. | Wider team. | Yes, test only | `SLACK_WEBHOOK_TEST` | Works; verified 1 June 2026 | Do not delete or rename without updating Vercel env. |

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
