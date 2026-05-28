# HORIZONS Internal Event Command Centre

This is the internal static website for the HORIZONS Ibiza 2026 event team.

It is a calm operating hub for schedules, priorities, red flags, tasks, contacts, suppliers, podcast, content capture, HORIZONS House, room drops, swag, HORIZONS Studio, decisions, maps, documents, and live team updates.

Live site:

```txt
http://inc-horizons.com/
```

GitHub Pages URL:

```txt
https://samuelmjprice.github.io/inc-horizons/
```

HTTPS is pending GitHub Pages certificate issuance. Once GitHub marks the certificate as issued in Settings > Pages, enable **Enforce HTTPS** and use:

```txt
https://inc-horizons.com/
```

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
