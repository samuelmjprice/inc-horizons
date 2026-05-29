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
4. Add Google Maps URLs to `locations.googleMapsUrl`; use `Google Maps Link Needed` when unknown.
5. Weather is loaded from Open-Meteo in the browser and cached locally. Do not add API keys.
6. Print the Call Sheet from the dedicated `#call-sheet` page.
7. Slack buttons/copy actions are safe stubs until a backend webhook endpoint is added.

## Audit / Deduplication Workflow

- Use Data Health Dashboard to check missing owners, TBC times, unknown initials, missing files, and open red flags.
- Use Duplicate Review for possible duplicate records. Do not delete or merge uncertain records without human review.
- Use Site Data & UX Audit to track layout, source, navigation, mobile, and density issues from each revision pass.
