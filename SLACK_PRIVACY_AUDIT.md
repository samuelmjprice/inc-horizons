# Slack Privacy Audit

Last updated: 1 June 2026

Workspace: `International Collective`

Important: Sidebar sections are not security. Channel privacy controls access.

## Summary

- One workspace only: confirmed.
- Core INC channels: private.
- Business division channels: private.
- INC Circle channels: private.
- DIRECT WORK: `#samuel-chris-direct` is private and Chris was added.
- HORIZONS channels: required `#horizons-*` channels are private/invite-only.
- `#horizons-web-hub`: private HORIZONS website/data/admin channel.
- `#horizons-test`: private and still connected to website-to-Slack test integration; do not rename.
- Backend test message to `#horizons-test` passed after private-channel conversion.
- `#all-inc-horizons` was reviewed on 1 June 2026. It is public/default, has only Samuel Price and Christopher Manoe visible as members, contains no useful operational content beyond default join/onboarding history, has no visible app/webhook integration in the channel UI, and has no active website/backend routing reference. Slack did not expose normal leave/archive/private controls, so it remains for workspace-admin/default-channel review and should not be used for HORIZONS operations.
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
| `#samuel-chris-direct` | Private | Private | No | Private Samuel/Chris work would be visible if public. | Created under `DIRECT WORK`; Chris added. |
| `#horizons-main` | Private | Private unless approved public | No | Wider workspace members may see event updates if made public later. | Converted private; invite-only by default. |
| `#horizons-red-flags` | Private | Private | No | Risks/blockers visible too widely if made public later. | Converted private. |
| `#horizons-schedule` | Private | Private | No | Schedule changes visible too widely if made public later. | Converted private. |
| `#horizons-production` | Private | Private | No | Production/call sheet details exposed if made public later. | Converted private. |
| `#horizons-content` | Private | Private | No | Content capture plans exposed if made public later. | Converted private. |
| `#horizons-podcast` | Private | Private | No | Guest/podcast logistics exposed if made public later. | Converted private. |
| `#horizons-suppliers` | Private | Private | No | Supplier logistics exposed if made public later. | Converted private. |
| `#horizons-entertainment` | Private | Private | No | Performer logistics exposed if made public later. | Converted private. |
| `#horizons-locations` | Private | Private | No | Venue/location movements exposed if made public later. | Converted private. |
| `#horizons-documents` | Private | Private | No | Files/links may be visible too widely if made public later. | Converted private. |
| `#horizons-decisions` | Private | Private | No | Approval/leadership decisions exposed if made public later. | Converted private. |
| `#horizons-web-hub` | Private | Private | No | Website/backend/admin details exposed if public. | Created private under HORIZONS EVENT. |
| `#horizons-test` | Private | Private | No | Website test messages visible too widely if made public later. | Converted private; backend test passed after conversion. |
| `#inc-leadership` | Private | Review | No | If used, sensitive leadership notes remain protected. | Existing earlier channel; decide keep/archive later. |
| `#samuel-chris` | Private | Private | No | Private Samuel/Chris notes exposed if public. | Existing private working channel. |
| `#all-inc-horizons` | Public/default | Workspace-admin/default-channel review | Yes | Public catch-all/default channel could expose event/company context if used. | Reviewed 1 June 2026. Visible members: Samuel Price and Christopher Manoe. Content: only default join/onboarding history. No visible app/webhook integration in channel UI. No active website/backend routing reference found. Normal Slack UI did not allow leave/archive/private conversion. Not part of approved HORIZONS structure; do not use for operations or website alerts. |
| `#social` | Public/status unknown | Review | Yes | Could expose casual/internal posts. | Review purpose and privacy. |
| `#new-channel` | Public/status unknown | Review/archive | Yes | Unclear channel can confuse users. | Do not delete without approval. |

## Recommended Next Privacy Actions

1. Keep all HORIZONS channels private unless Samuel/Chris approve a specific public exception.
2. Approve the per-channel invite list before adding wider event users, clients, or suppliers.
3. Ask a workspace admin to review whether `#all-inc-horizons` can be archived, renamed, or repurposed as the mandatory/default workspace channel. Do not use it for HORIZONS operations meanwhile.
4. Decide whether Chris should also be manually added to `#horizons-web-hub`; Slack did not surface a selectable Chris result during the add attempt.
