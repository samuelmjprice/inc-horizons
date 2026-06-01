# HORIZONS Software Upgrade Audit

Audit date: 1 June 2026

Live website: https://inc-horizons.com/
Backend/API: https://inc-horizons.vercel.app/

## Summary

This audit checks whether the software stack that powers the HORIZONS live operations site is safe for event use by a small onsite team of approximately 10-20 users.

No paid upgrades were completed during this audit. Supabase Pro and Vercel Pro are strongly recommended before event use, but both require Samuel approval before purchase. Slack is already on a Pro trial and is scheduled to renew as paid Pro unless cancelled.

## Production Readiness Table

| Service | Dashboard URL | Current Plan | Current Billing Status | Free / Test / Trial? | Risk If Left As-Is | Recommended Plan | Monthly Cost | Annual Cost | Upgrade Needed? | Upgraded? | Who Approved | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Supabase | https://supabase.com/dashboard/project/fmsjroqffcsihgucirrk | Free | No payment method shown in Supabase billing | Yes, Free | Free projects can pause after inactivity, no scheduled backups, and spend cap/quota limits can make the project unresponsive/read-only. This would affect shared comments and Slack activity logs. | Pro | USD 25/mo base | USD 300/yr if paid monthly | Yes, strongly recommended | No | Pending Samuel approval | Current usage is low: database approx. 0.026 GB of 0.5 GB, egress approx. 0 of 5 GB, MAU 0 of 50,000 in dashboard. Backups page says Free Plan does not include project backups. |
| Vercel | https://vercel.com/samuelmjprices-projects/inc-horizons | Hobby | No payment method shown in Vercel billing | Yes, Hobby | Backend/API is supporting shared comments, Supabase writes/reads, and Slack notifications. Hobby usage is low, but Pro gives production-oriented capacity, build priority, team collaboration, and spend controls. | Pro | USD 20/mo platform fee with 1 deploying seat included | USD 240/yr if paid monthly | Yes, strongly recommended | No | Pending Samuel approval | Usage is very low: Fast Data Transfer 4.59 MB / 100 GB, Edge Requests 272 / 1M, Function Invocations 185 / 1M in current dashboard range. |
| Slack | https://inc-horizons.slack.com/admin/billing | Pro trial | Pro trial through 27 June 2026; billing page shows renewal on 28 June 2026 with one paid user | Trial | If the workspace does not remain on Pro, message history/integrations may be limited after the trial. | Pro only | EUR 8.25/mo estimated for current 1 active paid user, inclusive of applicable tax | EUR 99/yr at current 1-user monthly estimate | Yes, keep Pro before inviting team | Trial active; no new upgrade action taken | Billing already appears configured; final team-size approval pending | Do not choose Business+. Wider team has not been invited. Cost will scale by active paid users. |
| GitHub | https://github.com/samuelmjprice/inc-horizons | Free / standard repo access | No paid plan required for current use | Free | Low. Current workflow is simple GitHub repo plus Pages deployment. Main risk is auth/access management, not plan limits. | Keep current | USD 0 | USD 0 | No | Not applicable | Not needed | Remote is `git@github.com:samuelmjprice/inc-horizons.git`; branch is `main`; no secrets found by local scan. |
| GitHub Pages | https://github.com/samuelmjprice/inc-horizons/settings/pages | GitHub Pages from `main` branch root | Included | Free | Low. Main risk is DNS/custom-domain/caching, not plan limits. | Keep current | USD 0 | USD 0 | No | Not applicable | Not needed | Settings show live site at https://inc-horizons.com/, source `main` / root, HTTPS enforce option visible. Live headers return GitHub Pages. |
| GoDaddy / domain / DNS | https://dcc.godaddy.com/manage/inc-horizons.com/dns | Domain registration + DNS | Domain renews 28 May 2027; renewal cost shown as EUR 21.99/year | Paid domain | Low before the event because renewal date is after event. DNS changes could break GitHub Pages if edited incorrectly. | Keep current | Approx. EUR 1.83/mo equivalent | EUR 21.99/yr renewal shown | No immediate upgrade | Not applicable | Not needed | DNS records point root A records to GitHub Pages and `www` CNAME to `samuelmjprice.github.io`. Do not change DNS without approval. |
| Open-Meteo | https://open-meteo.com/en/pricing | Free/open-access API usage | No account/API key used | Free/open-access | Low for current light forecast use. If commercial volume or dedicated capacity is required later, a paid API plan may be needed. | Keep current for event forecast card | USD 0 currently | USD 0 currently | No | Not applicable | Not needed | Weather API test succeeded for Six Senses Ibiza / Xarraca Bay approximate coordinates. No API key is stored. |

## Required Approval Prompts

Use these exact approval gates before upgrading:

- Supabase: "Supabase is currently on Free. Recommended action is to upgrade to Pro for event reliability, daily backups, and no inactivity pause. Do you approve?"
- Vercel: "Vercel is currently on Hobby. Recommended action is to upgrade to Pro for backend/API reliability. Do you approve?"
- Slack: "Slack is currently on a Pro trial and is scheduled to renew as paid Pro. Recommended action is to continue with Pro only, not Business+. Do you approve the active user count and billing before inviting the wider team?"

## Supabase Findings

- Project: `samuelmjprice's Project`
- Project reference: `fmsjroqffcsihgucirrk`
- API URL: `https://fmsjroqffcsihgucirrk.supabase.co`
- Current plan: Free
- Current billing cycle observed: 29 May 2026 - 29 June 2026
- Database usage observed: approx. 0.026 GB / 0.5 GB
- Egress observed: approx. 0 / 5 GB
- MAU observed: 0 / 50,000
- Scheduled backups: not included on Free plan
- Required tables: `record_updates`, `slack_activity_log`
- Service role key location: configured as a sensitive Vercel environment variable, not committed to frontend source

Recommendation: upgrade to Supabase Pro before the team relies on shared comments during the event.

## Vercel Findings

- Project: `inc-horizons`
- Backend URL: `https://inc-horizons.vercel.app`
- Current plan: Hobby
- Latest deployment is connected to `samuelmjprice/inc-horizons` on `main`
- Environment variables confirmed present as sensitive values for Production and Preview:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SLACK_WEBHOOK_TEST`
- Usage is currently very low, but the backend is now operationally important.

Recommendation: upgrade to Vercel Pro before onsite use.

## Slack Findings

- Workspace: `International Collective`
- Workspace URL: `inc-horizons.slack.com`
- Current plan: Pro trial through 27 June 2026
- Billing page shows renewal on 28 June 2026
- Estimated renewal cost observed: EUR 8.25/month for one active paid user, inclusive of applicable tax
- Paying users observed: 1
- `#horizons-test` is private and remains the website-to-Slack test channel
- Production Slack routes remain pending approval
- Wider team has not been invited

Recommendation: continue with Slack Pro only. Do not select Business+ unless Samuel/Chris later approve a specific enterprise need.

## GitHub And Pages Findings

- Remote: `git@github.com:samuelmjprice/inc-horizons.git`
- Branch: `main`
- GitHub Pages settings show the site live at `https://inc-horizons.com/`
- GitHub Pages source is `main` branch, root folder
- Live site returns HTTP 200 from GitHub Pages
- No GitHub billing upgrade is recommended.

## GoDaddy / DNS Findings

- Domain: `inc-horizons.com`
- Renewal date shown: 28 May 2027
- Renewal cost shown: EUR 21.99/year
- Root A records point to GitHub Pages:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- `www` CNAME points to `samuelmjprice.github.io`

Recommendation: no DNS or domain change needed before the event. Do not alter nameserver, SOA, DMARC, DomainConnect, GitHub Pages A records, or `www` CNAME without explicit approval.

## Weather / Open-Meteo Findings

- Current weather integration uses Open-Meteo without an API key.
- Direct API test succeeded with Europe/Madrid timezone.
- No upgrade is required for current light forecast-card use.
- Exact weather coordinate/location still depends on final venue pin confirmation in event data.

## Tests Run

| Test | Result | Notes |
| --- | --- | --- |
| `node --check script.js` | Passed | No syntax errors. |
| `python3 -m json.tool content.json` | Passed | JSON parses. |
| Live site headers | Passed | `https://inc-horizons.com` returns HTTP 200 from GitHub Pages. |
| Backend headers | Passed | `https://inc-horizons.vercel.app` returns HTTP 200 from Vercel. |
| `/api/updates` read | Passed | Safe parent ID returned `ok: true`. |
| `/api/updates` write/read | Passed | Test comment saved and read back from shared backend. Test record is labelled safe to delete. |
| `/api/slack/send` test route | Passed | Test message sent to `#horizons-test`; backend returned `status: Sent` and activity payload. |
| Open-Meteo API | Passed | Forecast endpoint returned current and daily weather data. |
| Secret scan | Passed | No Slack webhooks, Supabase service keys, GitHub tokens, private keys, or `.env` secrets found in source scan. |

## Remaining Risks

- Supabase Free is the biggest operational risk because Free lacks scheduled backups and can pause after inactivity.
- Vercel Hobby is acceptable for light testing but should be upgraded before the backend becomes live operations infrastructure.
- Slack cost will rise as active paid users are invited; confirm invite plan before wider rollout.
- Production Slack webhooks are not fully enabled and should remain phased/manual until approved.
- GoDaddy renewal is safely after the event, but payment/auto-renew should still be checked by Samuel in the account before handover.
- Weather location should be confirmed against the final Six Senses Ibiza / event hotel pin.

## Next Recommended Action

Before inviting the team or using the site onsite, Samuel should approve:

1. Supabase Pro.
2. Vercel Pro.
3. Continuing Slack Pro and the expected active-user count.
4. Keeping GoDaddy DNS unchanged and confirming auto-renew/payment status.
