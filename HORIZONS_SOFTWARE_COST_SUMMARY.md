# HORIZONS Software Cost Summary

Updated: 1 June 2026

These subscriptions support the HORIZONS live operations website, shared comments/updates, backend/API, Slack notifications, and event communication reliability.

## Invoice-Ready Cost Table

| Software | Plan | Monthly Cost | Annual Cost / Equivalent | Purpose | Needed For | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Supabase | Pro | USD 25/month base | USD 300/year if paid monthly | Database and shared operational records | Website comments, Slack activity log, reliable database, daily backups | Recommended; pending Samuel approval |
| Vercel | Pro | USD 20/month platform fee, 1 deploying seat included | USD 240/year if paid monthly | Backend/API hosting | `/api/updates`, `/api/slack/send`, Supabase writes/reads, Slack notification backend | Recommended; pending Samuel approval |
| Slack | Pro | EUR 8.25/month observed for current 1 active paid user, inclusive of applicable tax | EUR 99/year at current 1-user monthly estimate | Team communication and event alerts | Private INC/HORIZONS channels, website-to-Slack notifications, searchable history | Pro trial active; paid renewal scheduled 28 June 2026 |
| GitHub | Current/free repo plan | USD 0 | USD 0 | Code repository | Version control and deployment source | Keep as-is |
| GitHub Pages | Included with GitHub Pages | USD 0 | USD 0 | Static website hosting | Live `inc-horizons.com` frontend | Keep as-is |
| GoDaddy | Domain registration/DNS | Approx. EUR 1.83/month equivalent | EUR 21.99/year renewal shown | Domain and DNS | `inc-horizons.com` custom domain | Active; renews 28 May 2027 |
| Open-Meteo | Free/open-access weather API | USD 0 currently | USD 0 currently | Weather forecast data | Call Sheet weather card | Keep as-is for current light usage |

## Current Minimum Monthly Stack If Recommended Upgrades Are Approved

Mixed-currency subtotal at current observed rates:

- USD 45/month for Supabase Pro + Vercel Pro.
- EUR 8.25/month for Slack Pro at the current 1 active paid user shown in Slack billing.
- GoDaddy domain is annual, shown as EUR 21.99/year.
- Open-Meteo, GitHub, and GitHub Pages are currently USD 0 for this setup.

Slack will scale by active paid users. At the current observed EUR 8.25/month/user rate:

| Active Paid Slack Users | Estimated Slack Monthly Cost |
| --- | --- |
| 1 | EUR 8.25/month |
| 10 | EUR 82.50/month |
| 20 | EUR 165.00/month |

These Slack examples use the current workspace billing estimate and should be rechecked immediately before inviting the wider team.

## Approval Needed Before Purchase

- Supabase Pro: pending Samuel approval.
- Vercel Pro: pending Samuel approval.
- Slack Pro: trial active and billing appears configured; Samuel/Chris should approve the active user count before wider invites.
- GoDaddy: no upgrade needed, but Samuel should confirm auto-renew/payment status in the account.

## Notes For Invoice

- Supabase Pro and Vercel Pro are reliability upgrades for the live event operations stack.
- Slack Pro is the communication layer and should remain one workspace only: `International Collective`.
- GitHub Pages remains the static frontend host.
- Vercel remains the secure backend layer for Supabase and Slack secrets.
- No Slack webhook URLs, Supabase service role keys, GitHub tokens, or private keys should ever be included on invoices, screenshots, or source files.
