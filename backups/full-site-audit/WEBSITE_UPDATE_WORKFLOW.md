# HORIZONS Website Update Workflow

This site has two layers:

- Live comments and the Excel tracker capture questions, missing information, proposed changes, confirmations, and approvals.
- `content.json` is the official source data used by the live website.

Comments and tracker rows do not automatically change the official website. Approved updates are reviewed first, then applied to `content.json`, tested, committed, and deployed.

## Normal Update Process

1. Team fills out `HORIZONS_Website_Update_Tracker.xlsx`.
2. Team adds live comments on the website if discussion is needed.
3. Rows or comments that are ready are marked `Approved` or `Ready for Codex`.
4. Codex reviews the tracker and approved comments.
5. Codex updates `content.json`.
6. Codex tests the website locally.
7. Codex commits and pushes to GitHub.
8. GitHub Pages deploys the updated site.
9. Team reviews the live site.

## Emergency Update Process

1. Add the update to the relevant tracker tab or website comment.
2. Mark priority as `Critical`.
3. Mark status as `Approved` or `Ready for Codex`.
4. Codex updates `content.json`.
5. Test quickly on desktop and mobile widths.
6. Push immediately.
7. Confirm the live site is updated.

## Website Comments

The current website comment system is connected to the shared Vercel/Supabase backend.

This means:

- Comments save to the `record_updates` table through `https://inc-horizons.vercel.app/api/updates`.
- Comments are visible after refresh and across approved browsers/devices.
- Browser `localStorage` remains only as a draft/offline fallback if the backend cannot be reached.
- Test comments should be labelled `TEST - safe to delete` and archived or removed before team handover.

Shared comments capture name, comment, timestamp, status, priority, visibility, related item ID, and Slack send state where relevant.

Supplier updates now also support an `Update Topic` field such as `Arrival time`, `Setup time`, `Contact details`, `Delivery`, `Location`, `Issue`, or `Resolved`.

Content Capture updates now support topics such as `Capture idea`, `Timing`, `Location`, `Assigned person`, `Captured`, or `General note`.

Live Capture Suggestions are also local-only until shared storage is connected. They should be reviewed before being turned into official `content.json` data.

Capture Log entries are a fast onsite lookup tool for photo/video/drone/BTS/audio/social teams. They capture timestamp, person logging, location, camera, media type, subject, tags, file/card reference, priority, status, and notes. Current Capture Log entries use browser storage unless or until a shared capture-log API is approved; important approved capture notes should be copied into the tracker or shared backend before handover.

## New Data Areas

Use the same approval flow for:

- Flights / Travel updates.
- Now / Next schedule timing corrections.
- Daily Call Sheet updates. These should normally be entered as schedule updates because the Call Sheet is rendered from approved schedule data.
- Weather module updates. Until a live source is connected, add the daily weather forecast manually or keep the module marked pending.
- Supplier day/time grouping corrections.
- Content Capture Suggestions.
- Capture Suggestion dismissals are local-only until shared storage exists; approved suggestions should be copied into the tracker before becoming official.
- Visual setup image references.
- Guest Materials & Experience updates for tote bags, menus, easel boards, signage, room drops, and print files.
- Presentation, speech, and event content document links.

If the answer is missing, add it to `HORIZONS_Missing_Info_Questions_Tracker.xlsx` and mark the row `Needs Confirmation`.

## Approved Comments To Official Updates

1. A team member adds a comment/update on the website.
2. The update is saved in the comment system.
3. A project lead reviews the comment.
4. The comment is marked `Approved Change`, `Rejected`, `Needs Confirmation`, or `Resolved`.
5. Codex reviews approved comments.
6. Approved comments are applied to `content.json`.
7. GitHub Pages redeploys.
8. The original comment remains in update history.

Example:

Comment: "Kerstia confirmed Mobile Casino setup is now 5:00 pm."

Approved official data update:

- Mobile Casino setup: `5:00 pm`
- Status: `Confirmed`
- Latest update: `Confirmed by Kerstia`

## Comment Review Method

Review shared comments from Supabase `record_updates`.

Future improvements:

- Export comments as CSV or JSON.
- Create a comments admin/review page.
- Sync approved comments into the Excel tracker.

Codex should only apply comments marked `Approved Change` or tracker rows marked `Approved` / `Ready for Codex`.

## Master Data Review Workbook Workflow

Use `data/HORIZONS_Master_Website_Data_Review.xlsx` when Samuel and Chris need to review the full website data set rather than one-off changes.

Workflow:

1. Samuel/Chris start in the `MASTER REVIEW` tab.
2. They correct data in the green columns and use `Voice Note Reference` when an answer is given verbally.
3. They mark final rows as `Approved`.
4. They attach or link documents/files in the document/file columns.
5. Codex later imports/applies only approved rows unless told otherwise.
6. Codex updates `content.json`, supporting docs, and the live site from the approved corrections.

The master review workbook avoids duplicate questions by using canonical records and `Cross-Used In` columns. For example, a podcast row can show that it is used in Podcast, Schedule, Call Sheet, Location Schedule, Content Capture, and Slack alerts without asking the same correction question multiple times.

## What Not To Do

- Do not edit live HTML directly unless necessary.
- Do not add unconfirmed info as final.
- Do not invent missing details.
- Do not duplicate suppliers.
- Do not change official brand wording.
- Do not show developer notes on the live site.
- Do not let every comment automatically change official data.

## Key Data Rules

- There is only one Chris: `Chris Manoe`.
- Use `HORIZONS Hall`, not `Farmers Market Stage`.
- Use `BeGood` and `Clownfish` exactly.
- Use full names instead of initials where known. Unknown initials should be written as `Needs name confirmation`.
- Use `assets/logos/horizons-main-logo-black.png` as the official main hero/header logo.
- Suppliers should appear once; open questions belong inside the supplier card.
- Do not publish clothing measurements on the website.
- Use `File needed`, `Email needed`, `Phone needed`, `Time needed`, or `Needs Confirmation` when information is missing.

## Slack Workflow

The website is the source of truth. Slack is the communication and alert layer.

Workspace decision as of 1 June 2026:

- Use one Slack workspace only: `International Collective`.
- Do not create a second HORIZONS workspace.
- Use Slack Pro if billing is approved; do not choose Business+ without explicit Samuel/Chris approval.
- Core INC work belongs in private `#inc-*` channels.
- Business division work belongs in private `#biz-*` channels.
- INC Circle team/content/outreach work belongs in private `#circle-*` channels.
- HORIZONS event alerts belong in private `#horizons-*` channels inside the same workspace.
- Sidebar groups are visual only; channel privacy controls access.
- Do not invite the wider team, clients, or suppliers until `SLACK_CHANNEL_ACCESS_PLAN.md` is approved.

Current implementation is partially live in test mode:

1. Website users can save shared team updates through the Vercel/Supabase backend.
2. Notify Slack actions are enabled only for `#horizons-test` while `content.json` has `meta.slackTestMode: true`.
3. The Slack section shows recommended channels and event mapping.
4. `slack-config.example.json` documents the channel/event mapping without credentials.
5. Webhook URLs and tokens live in Vercel environment variables, not frontend code.

Suggested environment variables:

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

Comment / Slack QA on 29 May 2026:

- Non-Slack website comments save to Supabase and reload on the live site.
- Notify Slack comments save to Supabase and post to `#horizons-test` when Slack test mode is active.
- Slack send attempts are written to `slack_activity_log`.

## Production Readiness / Upgrade Workflow

Before the team relies on the site onsite, review:

```txt
HORIZONS_SOFTWARE_UPGRADE_AUDIT.md
HORIZONS_SOFTWARE_COST_SUMMARY.md
```

Upgrade gates:

1. Supabase should be upgraded from Free to Pro only after Samuel approval.
2. Vercel should be upgraded from Hobby to Pro only after Samuel approval.
3. Slack should stay on Pro only; do not choose Business+ unless Samuel/Chris explicitly approve it.
4. GoDaddy DNS should not be changed unless there is a specific domain issue.
5. GitHub/GitHub Pages should remain as-is unless deployment is blocked.
6. Open-Meteo should remain as-is for current light weather-card usage.

After any upgrade, test:

- `https://inc-horizons.com/`
- `https://inc-horizons.vercel.app/api/updates`
- `https://inc-horizons.vercel.app/api/slack/send`
- Website comment save/read.
- Slack test message to `#horizons-test`.
- Supabase `record_updates` and `slack_activity_log`.

Never paste passwords, card details, API keys, webhook URLs, service role keys, or tokens into chat or docs. Secrets belong only in Vercel environment variables.
- Missing production webhook routes return `Slack notifications pending setup.` without breaking comment save.
- The current send confirmation is a native browser confirmation. A branded resend/duplicate modal is still a polish item.

## New Intake Areas

Use the missing-info tracker for:

- Cvent exports.
- Speaker/session/deck content.
- Rehearsal schedules.
- Signage placement maps and print specs.
- Staff lists.
- Entertainment riders and timings.
- Playlist links and start/stop ownership.
- Podcast final guest/run-sheet files.
- Venue maps, restaurant schedules, menus, and seating plans.

## Brand Implementation Notes

- Keep the live site aligned with the HORIZONS presentation style guide: warm Mediterranean canvas, refined spacing, minimal typography, and quiet operational clarity.
- Use Soleil for headings, navigation, labels, and buttons; use Gill Sans Nova for body and UI text. Do not introduce unrelated fonts.
- Use the official palette in `style.css`: warm ivory `#F3EAE1`, blush `#E1C4AF`, bronze `#C28952`, soft greens, soft blues, and pale sand.
- New status treatments should be small pills/tags using soft brand colours. Do not use aggressive full-card colour fills.
- Interface icons should be simple line-style controls or CSS chevrons. Avoid emoji and mismatched icon styles.
- New sections should reuse existing card, tab, details, and filter patterns so the page remains spacious and easy to scan on mobile.

## Call Sheet / Emergency / Weather Workflow

1. Update canonical schedule, daily run sheet, location, document, red flag, and missing-file records first.
2. Use `callSheets` only as the daily operational view that references those records.
3. Keep emergency medical location as `Needs Confirmation` until the exact hospital, route, venue contact, and protocol are confirmed.
4. Use the central Six Senses Ibiza event property coordinate for weather unless Samuel/Chris provide a more precise approved weather point.
5. Use exact Google Maps coordinate links for confirmed event locations; keep unconfirmed hospital and venue detail rows marked `Needs Confirmation`, `Map Needed`, or `Exact pin needed`.

## Admin / Developer Data

The main team flow should stay focused on onsite operations. Admin-heavy areas are now grouped behind the `Admin Data` footer/nav entry:

- Cvent Comparison
- Missing Files Tracker
- Slack Integration
- Data Health Dashboard
- Duplicate Review
- Site Data / UX Audit

These sections remain available for Samuel/developer review, but they should not be treated as the primary onsite navigation for the wider team.
4. Add Google Maps URLs to `locations.googleMapsUrl`; use `Google Maps Link Needed` when unknown.
5. Weather is loaded from Open-Meteo in the browser and cached locally. Do not add API keys.
6. Print the Call Sheet from the dedicated `#call-sheet` page.
7. Slack buttons/copy actions route through the backend. Production channel webhooks stay disabled until Samuel/Chris approve them.

## Audit / Deduplication Workflow

- Use Data Health Dashboard to check missing owners, TBC times, unknown initials, missing files, and open red flags.
- Use Duplicate Review for possible duplicate records. Do not delete or merge uncertain records without human review.
- Use Site Data & UX Audit to track layout, source, navigation, mobile, and density issues from each revision pass.

## Onsite UX Review Workflow

For Chris/Samuel review passes, apply the same source-of-truth rule:

1. Keep operational data in `content.json`.
2. Show each record in the most useful view rather than duplicating conflicting rows.
3. Use summary-first cards and grouped expandable details for mobile.
4. Move admin/developer tooling lower in the navigation unless leadership specifically needs it live.
5. Mark unresolved data as `Needs Confirmation`, `File Needed`, `Info Needed`, or `Map Needed`.
6. Do not remove HORIZONS Studio from source records when hiding the standalone operational section.
7. Keep Entertainment for live performers; keep Curated Playlists for background/ambient music.
8. Use Eve Dusek as the current display name and `COO of Aream & Co.` as the tracked role until final contact confirmation is supplied.
