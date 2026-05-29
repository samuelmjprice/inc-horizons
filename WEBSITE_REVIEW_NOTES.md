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
- BeGood room-drop and logistics responsibilities.
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

## Round Two Review Notes

Latest review items now reflected in the website and trackers:

- Side section progress tracking was reworked so the active section updates while scrolling down and back up.
- The live countdown remains pointed at `8 June 2026` using the event timezone.
- Flights / Travel cards are now compact by default, with full details inside an expandable panel.
- Day-Specific Focus spacing has been opened up, and simple `Open today` / `Collapse all` controls were added.
- A Daily Call Sheet view was added and is rendered from approved schedule data.
- Supplier cards are compact by default, with timing blocks, contacts, open items, and updates inside expandable details.
- Content Capture cards are compact by default and can be filtered by day.
- The official main HORIZONS logo is used for the header/hero source: `assets/logos/horizons-main-logo-black.png`.
- New swag reference images were added for tote bag, notebook, bottle, charger, Nord fragrances, eye mask, fan, caps, Pulsio massager, pen, and oatmeal lanyard.
- `BeGood` and `Clownfish` spelling rules were rechecked across text source files.

Items still needing team confirmation:

- Final call sheet owner/support details for any TBC schedule rows.
- Final travel flight numbers and transfer details.
- Final supplier timing confirmations where source data is still marked `Needs Confirmation`.
- Additional reception display, venue, room layout, menu, map, and presentation/speech files.

## Brand Guide Refinement Notes

The latest refinement pass applies the HORIZONS presentation style guide more consistently across the live command centre:

- The official main HORIZONS logo remains the only hero/header logo source: `assets/logos/horizons-main-logo-black.png`.
- The visible countdown markup no longer defaults to zero before JavaScript loads, and the deployed script/content paths now use a fresh cache-busting version.
- Live-facing developer copy has been removed from the website UI; update instructions stay in the README and workflow documents.
- Soleil is used for headings, navigation, labels, buttons, countdown numerals, and brand-style section typography.
- Gill Sans Nova is used for the body/UI reading layer to keep dense operational content legible.
- The CSS palette now follows the official guide more closely: warm ivory, blush, bronze, soft greens, soft blues, and pale sand.
- Cards, call sheet rows, schedule items, travel cards, supplier cards, content capture cards, document cards, and status tags now use softer surfaces, borders, and spacing.
- Accordion and menu controls use simple line-style UI, not emoji or browser-default disclosure icons.
- The footer copy is non-technical and uses the official logo image rather than typed brand text.

Remaining brand/watch items:

- Keep checking live cache after deploys; if the old logo, script, or countdown appears, hard refresh or confirm the version query in `index.html`.
- Do not introduce new fonts, loud dashboard colours, emoji icons, or full-card status colour fills in future updates.
- Any new section should reuse existing card, tag, tab, filter, details, and section-heading patterns.

## Final Schedule Sync Notes - 29 May

Latest workbook sync applied from `HORIZONS_Website_Final_Schedule_Sync_For_Codex.xlsx`:

- Schedule and Call Sheet now use the 310-row latest sync source, including Saturday 6 June pre-event logistics.
- Contacts now pull from `CONTACTS_SITE` with provided phone and WhatsApp links.
- Locations now use a card-first model from `LOCATION_CARDS`, with detailed schedule rows tucked into expandable panels.
- Menus and catering records from `MENU_CATERING_SITE` are represented in Documents and Guest Materials & Experience.
- Supplier records are grouped by supplier with connected day/time blocks and open items, rather than disconnected timing fields.
- BeGood is now the required company spelling across website data and docs.
- Known initials were expanded; unresolved initials are flagged as `Name confirmation needed` instead of guessed.
- Call Sheet includes a weather placeholder for Six Senses Ibiza / Ibiza until live forecast data is connected.
- Capture Suggestions now have local Accept/Dismiss controls.
- Guest Materials & Experience now includes tote bags, crew shirts, easel boards, signage, menus, room drops, and swag references.

Still needing confirmation from Samuel / relevant owners:

- Final podcast guest names, slot count, and agenda wording.
- Mobile Casino / Poker setup timing and 33 poker chairs.
- Supplier contacts and timing TBCs.
- Final maps, seating plans, room layouts, call-sheet PDFs, print files, signage files, and presentation/speech docs.
- Weather source or daily forecast input method.

## Leadership Revision Additions

Latest leadership brief items now reflected in the website records:

- Location-specific and restaurant-specific schedule sections.
- Slack integration stub with recommended channels, event/channel mapping, and copy-ready update actions. No Slack secrets are stored in frontend code.
- Speaker Content, Rehearsals, Entertainment, Curated Playlists, Artwork / Wayfinding / Signage, Cvent Comparison, Staff Lists, and Missing Files Tracker sections.
- Samuel Price role update: Podcast Lead, Executive Assistant to Chris Manoe, Website Development & Software Lead, and Infrastructure & Systems Support Lead.
- Latest spelling rules: use `BeGood`, `Aream & Co.`, and `Clownfish` exactly.
- Known initials should be expanded to full names; unknown initials remain flagged as `Needs Name Confirmation`.

Still needed:

- Slack backend/webhook owner and environment setup.
- Cvent exports.
- Speaker list, bios, session titles, deck copy, notes, and rehearsal timings.
- Signage placement map, print specs, artwork files, and Clownfish setup instructions.
- Performer riders, hospitality requirements, arrival/sound check/performance confirmations.
- Playlist names, links, music usage schedule, start/stop owner, and backup plan.

## Call Sheet / Emergency / Audit Update

Implemented in this pass:

- Dedicated `CALL SHEET` page section with Today and day tabs.
- Call Sheet now includes daily focus, crew call, live weather, emergency/medical, schedule, production/supplier/entertainment/podcast/transport/meal notes, documents, red flags, and missing files.
- Print Call Sheet and Copy Slack Summary actions added.
- Live weather now uses Open-Meteo with cached browser requests and a graceful fallback.
- Emergency medical location added to Locations and Call Sheet as `Nearest Hospital — Needs Confirmation`.
- Major locations now support Google Maps links or explicit `Google Maps Link Needed` placeholders.
- Data Health Dashboard, Duplicate Review, and Site Data & UX Audit admin sections added.
- Comment/update forms now include priority, visibility, Notify Slack, and Slack-channel preview fields. Live Slack posting remains pending backend/webhook setup.

Still needs confirmation:

- Exact nearest hospital / medical location, route, travel time, venue medical contact, and emergency protocol.
- Exact Google Maps links for internal venue spaces such as HORIZONS House, HORIZONS Hall, HORIZONS Studio, The Situation Room, Orchard, Partel, Arcade, and Tommy's Tunnel.
- Whether Call Sheet should include Saturday 6 June setup day in team-facing tabs or keep it as admin/setup reference only.

## Comment / Slack QA - 29 May 2026

Verified against `https://inc-horizons.com` and `https://inc-horizons.vercel.app`:

- Shared update save works through `/api/updates` into Supabase `record_updates`.
- Shared update read works after live site refresh, proving the visible comment is coming from the shared backend rather than browser-only storage.
- A normal comment did not create Slack activity and no longer displays a misleading Slack-pending tag.
- A Notify Slack test comment posted only to `#horizons-test` and wrote a `Sent` record to `slack_activity_log`.
- A deliberately unconfigured production route failed safely with `Slack notifications pending setup.` while preserving the website update.
- Production Slack webhooks remain disabled and should not be activated without Samuel/Chris approval.

Remaining polish:

- Replace the native confirm dialog with a branded confirmation modal and explicit resend warning.
- Add an admin-visible Slack activity viewer if the team wants to review Slack logs inside the website rather than Supabase.
