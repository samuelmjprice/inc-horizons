# HORIZONS Internal Event Command Centre

This is the internal static website for the HORIZONS Ibiza 2026 event team.

It is a calm operating hub for schedules, priorities, red flags, flights/travel, tasks, contacts, suppliers, podcast, content capture, HORIZONS House, room drops, swag, HORIZONS Studio, decisions, maps, documents, and live team updates.

Live site:

```txt
https://inc-horizons.com/
```

GitHub Pages URL:

```txt
https://samuelmjprice.github.io/inc-horizons/
```

HTTPS is enabled through GitHub Pages. If `http://inc-horizons.com/` does not redirect immediately after a deployment, wait for the GitHub Pages CDN cache to refresh.

## How The Site Gets Its Data

The live website displays official, cleaned event data from:

```txt
content.json
```

The team should not edit HTML, CSS, or JavaScript for normal updates.

Use:

- `content.json` for official approved website data.
- `HORIZONS_Website_Update_Tracker.xlsx` for proposed changes, missing information, questions, approvals, and update intake.
- Website comments for live discussion and feedback.

The website should not directly depend on a messy Excel workbook or unapproved comments.

Current live features include:

- Flights / Travel cards for arrivals, departures, transfer notes, missing flight details, and transport ownership.
- Ibiza-time Now / Next schedule awareness.
- Daily Call Sheets derived from approved schedule data, with day tabs and Now / Next highlighting.
- Supplier timing blocks grouped by day.
- Supplier update topic tagging.
- Content Capture Suggestions for live capture ideas from the team.
- Section progress navigation and active top navigation.
- Document categories for `Presentations / Speeches` and `Event Content Documents`.

## Update Workflow

1. Team adds updates to `HORIZONS_Website_Update_Tracker.xlsx`.
2. Team adds website comments if discussion is needed.
3. Project lead marks rows/comments as `Approved`, `Ready for Codex`, or `Approved Change`.
4. Codex reviews approved tracker rows and approved comments.
5. Codex updates `content.json`.
6. Codex tests locally.
7. Codex commits and pushes to GitHub.
8. GitHub Pages redeploys.
9. Team reviews the live site.

Full SOP:

```txt
WEBSITE_UPDATE_WORKFLOW.md
```

Data rules:

```txt
data-dictionary.md
```

## Excel Update Tracker

The tracker is:

```txt
HORIZONS_Website_Update_Tracker.xlsx
```

It is an update intake system, not the live source of truth.

Use one row per update. Only rows marked `Approved` or `Ready for Codex` should normally be applied to the website.

Tracker tabs include:

- START HERE
- Website Change Requests
- Missing Information
- Questions To Answer
- Schedule Updates
- Task Updates
- Contact Updates
- Supplier Updates
- Podcast Updates
- Content Capture Updates
- Documents + Links
- Red Flags + Decisions
- Image + Asset Updates
- Completed Website Updates

Note: Excel does not allow `/` in tab names, so `Image / Asset Updates` is named `Image + Asset Updates`.

## Missing Info Questions Tracker

The team-facing missing information workbook is:

```txt
data/HORIZONS_Missing_Info_Questions_Tracker.xlsx
```

A copy is also saved in the Desktop handoff folder:

```txt
/Users/ddm/Desktop/Chris Manoe/INC-Horizons Website/HORIZONS_Missing_Info_Questions_Tracker.xlsx
```

The editable team copy is also saved in:

```txt
/Users/ddm/Desktop/Chris Manoe/INC-Horizons Website/LIVE DOC/HORIZONS_Missing_Info_Questions_Tracker.xlsx
```

Use this workbook to collect the answers still needed to finish the website and make the event information complete.

The tracker has been formatted for team use:

- `TEAM VIEW` is the simplest place to start.
- Green columns are for team answers and confirmations.
- Grey columns are reference-only and should usually be left alone.
- Status dropdowns show whether a row is missing, waiting, answered, approved, already added, or not needed.
- Only rows marked `Approved` should be used for website updates.
- Rows marked `EXAMPLE - DO NOT IMPORT` are examples only and should never be imported into the website.

It is different from `HORIZONS_Website_Update_Tracker.xlsx`:

- `HORIZONS_Website_Update_Tracker.xlsx` is for requested website changes and approved update intake.
- `HORIZONS_Missing_Info_Questions_Tracker.xlsx` is for questions, missing files, missing contact details, unclear schedule items, supplier confirmations, image needs, and CEO approvals.

How to use it:

1. Fill in `Answer / Final Info` or `Final Answer` where known.
2. Add the right person under `Who Should Answer` or `Who Should Confirm`.
3. Do not guess missing emails, phone numbers, files, timings, or approvals.
4. Mark uncertain rows `Needs Confirmation`.
5. Mark final rows `Answered` or `Approved`.
6. Codex should only use `Answered` or `Approved` rows to update `content.json`.

Website review notes are saved in:

```txt
WEBSITE_REVIEW_NOTES.md
```

Short team instructions are saved in:

```txt
TEAM_TRACKER_INSTRUCTIONS.md
```

## Optional Import Helper

The non-destructive helper is:

```txt
tools/import-updates.py
```

Suggested use:

1. Place the latest tracker in `data/input/`.
2. Run `tools/import-updates.py`.
3. Review `data/output/approved-updates.json`.
4. Manually apply approved updates to `content.json`.
5. Test, commit, and deploy.

The script does not overwrite `content.json`.

## Common Content Updates

- Change event dates: edit `event.dates`.
- Change last updated text: edit `event.lastUpdated`.
- Change last updated owner/source: edit `event.updatedBy`.
- Add a contact: add a new object to `contacts`.
- Add a task: add a new object to `tasks`.
- Add a travel item: add a new object to `travel`.
- Update the Call Sheet: update the matching item in `schedule`; the Call Sheet is rendered from approved schedule data.
- Add a supplier question: add it under that supplier's `openItems`.
- Add supplier day/time detail: add or update that supplier's `timelineBlocks`.
- Add a presentation or speech file: add a document with category `Presentations / Speeches`.
- Add event content files: add a document with category `Event Content Documents`.
- Add a swag image: place it in `assets/images/swag/` and reference the path in the matching `swag`, `roomDrops`, or `horizonsHouse` item in `content.json`.
- Add a live capture seed item: add it under `captureSuggestions`.

## Comments And Status Updates

The current website comments are a local-only prototype using browser `localStorage`.

This means:

- Comments save only on the current device/browser.
- Other team members cannot see them.
- They are useful for UI testing and personal notes only.

Before event use, connect shared storage such as Firebase Firestore, Supabase, Airtable, or Google Sheets if the team needs shared comments.

Local comments can be exported from the browser console:

```js
copy(localStorage.getItem("horizons-card-updates-v1"))
```

Do not treat local comments as official data. Approved comments must be reviewed and applied to `content.json`.

## Main Files

- `index.html`: page structure.
- `style.css`: visual design.
- `script.js`: rendering, filters, countdown, tabs, accordions, and local update UI.
- `content.json`: official website display data.
- `HORIZONS_Website_Update_Tracker.xlsx`: team update intake tracker.
- `WEBSITE_UPDATE_WORKFLOW.md`: update process.
- `data-dictionary.md`: data rules and field guidance.
- `assets/`: logos, fonts, documents, and image folders.

## Content Updates

Common updates in `content.json`:

- Change event dates: edit `event.dates`.
- Change active live day: edit `today.date`.
- Change last updated label: edit `event.lastUpdated`.
- Change countdown target: edit `event.countdownTarget`.
- Add a contact: add an object to `contacts`.
- Mark a task resolved: change `status` to `Resolved`.
- Add a supplier issue: add it to the supplier’s `openItems`.
- Add a map or menu: place the file in `assets/documents/` and add a document card.
- Add an image: place it in the right `assets/images/` folder and reference it in `content.json`.

## Data Rules

- There is only one Chris: `Chris Manoe`.
- Use `HORIZONS Hall`, not `Farmers Market Stage`.
- Use `B Good` consistently.
- Use `Clownfish` consistently.
- Use the official main HORIZONS logo at `assets/logos/horizons-main-logo-black.png` for the hero/header logo. Do not recreate it with text.
- Do not invent emails, phone numbers, times, spellings, files, or approvals.
- Missing files should use `File Needed`.
- Missing contact details should be left blank or noted as `Email needed` / `Phone needed`.
- Suppliers should appear once, with open questions grouped under `openItems`.
- HORIZONS Studio must be written as `HORIZONS Studio`.

## Documents And Images

Document categories include:

- Menus
- Maps
- Site Map
- Seating Plans
- Room Layouts
- Brand Files
- Supplier Documents
- Runbooks
- Production Documents
- Guest Experience
- HORIZONS House
- Room Drops
- Swag

Image folders:

- `assets/images/swag/`
- `assets/images/room-drops/`
- `assets/images/horizons-house/`
- `assets/images/venue/`
- `assets/images/production/`

Images should be practical references, not decoration.

Current swag references include tote bag, notebook, bottle, foldable charger, Nord fragrances, silk eye mask, fan, caps, Pulsio massager, pen, and oatmeal lanyard. If a replacement image is provided, keep the same filename convention or update the path in `content.json`.

## Deployment

1. Test locally.
2. Commit changes.
3. Push to `main`.
4. GitHub Pages deploys from `main` at repository root.
5. Confirm the live domain loads.

GoDaddy DNS for `inc-horizons.com`:

- `A @ 185.199.108.153`
- `A @ 185.199.109.153`
- `A @ 185.199.110.153`
- `A @ 185.199.111.153`
- `CNAME www samuelmjprice.github.io`

Do not delete nameserver, SOA, DMARC, or DomainConnect records.

## Files To Avoid Editing Unless Necessary

- `index.html`
- `style.css`
- `script.js`
- files in `assets/fonts/`
- official logo files in `assets/logos/`

Do not redraw, recolour, distort, stretch, modify, or recreate official HORIZONS logos.
