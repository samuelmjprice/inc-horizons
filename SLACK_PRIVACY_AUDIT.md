# Slack Privacy Audit

Last updated: 1 June 2026

Workspace: `International Collective`

Important: Sidebar sections are not security. Channel privacy controls access.

## Summary

- One workspace only: confirmed.
- Core INC channels: private.
- Business division channels: private.
- INC Circle channels: private.
- HORIZONS channels: currently appear public in Slack and need privacy conversion/review before inviting wider users.
- `#horizons-test`: still connected to website-to-Slack test integration; do not rename.
- No wider team, clients, or suppliers were invited during this pass.

## Channel Audit

| Channel name | Current privacy | Recommended privacy | Needs change? | Risk if public | Notes |
| --- | --- | --- | --- | --- | --- |
| `#inc-main` | Private | Private | No | Internal updates visible to non-INC users. | In `INTERNATIONAL COLLECTIVE`. |
| `#inc-core-team` | Private | Private | No | Team execution visible to non-core users. | Renamed from `#inc-ops`. |
| `#inc-red-flags-urgent` | Private | Private | No | Urgent blockers visible too widely. | Sensitive company issues. |
| `#inc-finance` | Private | Private | No | Finance information exposed. | Keep tightly limited. |
| `#inc-media-production` | Private | Private | No | Production information exposed. | Renamed from `#inc-production`. |
| `#inc-marketing-web-social` | Private | Private | No | Internal marketing plans exposed. | Approved internal channel. |
| `#inc-leads-new-deals` | Private | Private | No | Sales/deal information exposed. | Renamed from `#inc-business-growth`. |
| `#inc-systems-tech` | Private | Private | No | Access/tooling details exposed. | Renamed from `#inc-admin`. |
| `#biz-chris-manoe` | Private | Private | No | Chris business direction exposed. | Business division channel. |
| `#biz-world-main` | Private | Private | No | Business strategy exposed. | Business division channel. |
| `#biz-singers` | Private | Private | No | Division information exposed. | Business division channel. |
| `#biz-dancers` | Private | Private | No | Division information exposed. | Business division channel. |
| `#biz-artists` | Private | Private | No | Division information exposed. | Business division channel. |
| `#biz-agency-105` | Private | Private | No | Division information exposed. | Business division channel. |
| `#biz-circle` | Private | Private | No | Circle business information exposed. | Business side of Circle. |
| `#biz-ip` | Private | Private | No | IP/assets information exposed. | Keep tightly limited. |
| `#circle-team-inc` | Private | Private | No | Circle team information exposed. | Circle team channel. |
| `#circle-outreach-inc` | Private | Private | No | Outreach information exposed. | Circle outreach channel. |
| `#circle-content-inc` | Private | Private | No | Content plans exposed. | Circle content channel. |
| `#horizons-main` | Public currently | Private unless approved public | Yes | Wider workspace members may see event updates. | Convert before wider invite unless approved. |
| `#horizons-red-flags` | Public currently | Private | Yes | Risks/blockers visible too widely. | High priority privacy change. |
| `#horizons-schedule` | Public currently | Private | Yes | Schedule changes visible too widely. | Convert before event team invite. |
| `#horizons-production` | Public currently | Private | Yes | Production/call sheet details exposed. | Convert before wider invite. |
| `#horizons-content` | Public currently | Private | Yes | Content capture plans exposed. | Convert before wider invite. |
| `#horizons-podcast` | Public currently | Private | Yes | Guest/podcast logistics exposed. | Convert before wider invite. |
| `#horizons-suppliers` | Public currently | Private | Yes | Supplier logistics exposed. | Convert before supplier/client invite. |
| `#horizons-entertainment` | Public currently | Private | Yes | Performer logistics exposed. | Convert before wider invite. |
| `#horizons-locations` | Public currently | Private | Yes | Venue/location movements exposed. | Convert before wider invite. |
| `#horizons-documents` | Public currently | Private | Yes | Files/links may be visible too widely. | Convert before wider invite. |
| `#horizons-decisions` | Public currently | Private | Yes | Approval/leadership decisions exposed. | High priority privacy change. |
| `#horizons-test` | Public currently | Private | Yes | Website test messages visible too widely. | Do not rename; convert carefully to preserve webhook. |
| `#inc-leadership` | Private | Review | No | If used, sensitive leadership notes remain protected. | Existing earlier channel; decide keep/archive later. |
| `#samuel-chris` | Private | Private | No | Private Samuel/Chris notes exposed if public. | Existing private working channel. |
| `#all-inc-horizons` | Public/default likely | Review | Yes | Default channel may expose old event/company context. | Review before inviting anyone. |
| `#social` | Public/status unknown | Review | Yes | Could expose casual/internal posts. | Review purpose and privacy. |
| `#new-channel` | Public/status unknown | Review/archive | Yes | Unclear channel can confuse users. | Do not delete without approval. |

## Recommended Next Privacy Actions

1. Convert all `#horizons-*` channels to private unless Samuel/Chris approve a specific public exception.
2. Prioritize `#horizons-red-flags`, `#horizons-decisions`, `#horizons-production`, `#horizons-documents`, and `#horizons-test`.
3. Confirm whether `#horizons-main` should remain public inside the workspace or become private like the rest.
4. Review `#all-inc-horizons`, `#social`, and `#new-channel` before inviting wider users.

