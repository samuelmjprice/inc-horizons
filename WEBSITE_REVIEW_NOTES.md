# HORIZONS Website Review Notes

Review date: 28 May 2026

Live site: https://inc-horizons.com/

## What Is Working Well

- The site is live on the custom domain with HTTPS enabled.
- The experience is calm, premium, mobile-friendly, and structured as an internal operating hub rather than a spreadsheet.
- Countdown is working against 8 June 2026.
- The top dashboard now surfaces real data rather than generic section links only.
- Schedule day tabs, mobile menu, and chevron accordions are working.
- Schedule cards are easier to scan, with extra detail tucked away.
- Comments/update UI exists across key cards.
- The comments system is clearly documented as local-only until a shared backend is connected.
- Supplier cards are grouped by supplier name rather than duplicated per note.

## Confirmed Fixed

- Chris Manoe correction: fixed.
- Removal of Chris Minot: fixed in current official data.
- Removal of `CM`: fixed in current official data.
- Removal of live-facing `content.json` developer text: fixed.
- Countdown working: fixed.
- Accordion icon consistency: fixed with CSS chevrons.
- Mobile menu polish: fixed.
- Schedule card density: improved.
- Supplier grouping: fixed at the supplier-card level.
- Documents section: present, but several document cards still need files.
- Comments/update workflow: documented and functional as a local-only prototype.

## What Still Needs Improvement

- Shared comment storage is not connected yet. Current comments save only to the user’s browser.
- Image/reference folders are still empty for HORIZONS House, reception display, room drops, swag, venue, and production.
- Several document cards are marked `File Needed`.
- Many schedule, task, supplier, podcast, and content capture items still need final confirmation.
- Several contacts and suppliers are missing phone numbers, email addresses, or clear confirmation of responsibility.
- Some owner fields still contain teams or initials from the source workbook and should be confirmed by leads.

## Information Missing

The full list of missing information and questions is in:

```txt
data/HORIZONS_Missing_Info_Questions_Tracker.xlsx
```

The workbook includes:

- Missing contact details.
- Schedule time/location/owner confirmations.
- Task owner/support confirmations.
- Supplier contact, setup, active time, and open item questions.
- Podcast timing, guest, location, and crew confirmations.
- Content capture owner, time, priority, and deliverable questions.
- Missing maps, site maps, seating plans, and room layouts.
- Missing menus and document links.
- Missing HORIZONS House, reception display, room drop, swag, venue, and production images.
- CEO and leadership approval items.

## Needs Team Answers

- Confirm final owners for tasks marked missing or unclear.
- Confirm whether TBC schedule times are final or still placeholders.
- Confirm final location names where source data says TBC or various locations.
- Confirm contact phone/email details where missing.
- Confirm supplier contact details and arrival/setup/active timings.
- Provide missing maps, menus, seating plans, room layouts, and production documents.
- Provide approved reference images for visual sections.

## Needs CEO / Leadership Approval

- Open red flags.
- Decisions marked `Decision Needed`.
- Podcast schedule conflicts and final slot plan.
- HORIZONS House / reception display final setup.
- Room-drop and swag standards where final approval is required.
- Content capture priorities where leadership wants specific must-capture moments.

## Needs Supplier / Venue Confirmation

- Six Senses hotel contacts, maps, layouts, room drop coordination, and venue timings.
- B Good room-drop and logistics responsibilities.
- Mobile Casino / Poker setup and open items.
- Clownfish production, install, and setup details.
- Podcast location access and setup requirements.

## Technical Issues Remaining

- Shared comments backend is not implemented yet.
- Local comments can be exported from `localStorage`, but this is not a team-wide workflow.
- The optional import helper creates a review JSON file from approved tracker rows, but it does not automatically merge updates into `content.json`.
- HTTP may briefly serve from cache after deployments even though HTTPS is enabled.

## Before Next Deployment

1. Fill in `HORIZONS_Missing_Info_Questions_Tracker.xlsx`.
2. Mark answers as `Answered` or `Approved`.
3. Codex should review approved rows.
4. Codex should update `content.json`.
5. Test locally on desktop, iPhone width, and Android width.
6. Commit and push.
7. Confirm the live site reflects the approved answers.
