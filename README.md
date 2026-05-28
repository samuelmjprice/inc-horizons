# HORIZONS Internal Event Command Centre

This is the internal static website for the HORIZONS Ibiza 2026 event team.

It is designed as a calm, premium live operating hub for schedules, red flags, responsibilities, contacts, suppliers, podcast, content capture, HORIZONS House, room drops, swag, HORIZONS Studio, decisions, maps, documents, and updates.

## Important Note About Comments And Status Updates

The site is currently a static GitHub Pages-ready website.

Comments and status updates are implemented as a working prototype using browser `localStorage`.

That means:

- Updates save only on the current device and browser.
- Updates are not yet shared with the whole team.
- The UI is built so it can later be connected to Firebase, Supabase, or another shared backend without rebuilding the interface.

Do not treat local comments as globally shared until a backend is connected.

The storage adapter lives in `script.js` as `updateStore`.

## Main Files

- `index.html` controls the page structure.
- `style.css` controls the visual design.
- `script.js` renders content, filters, countdown, tabs, and local updates.
- `content.json` contains the editable event data.
- `assets/` contains logos, fonts, documents, and image folders.

Most content updates should happen in `content.json`.

## How To Update Event Details

Open `content.json` and edit the `event` object.

Common updates:

- Change event dates: edit `event.dates`.
- Change the last updated label: edit `event.lastUpdated`.
- Change the countdown target: edit `event.countdownTarget`.
- Change hero copy: edit `event.description`.

Countdown target is currently set to 8 June 2026.

## How To Update Contacts

Edit the `contacts` array in `content.json`.

Each contact can include:

- `name`
- `category`
- `group`
- `role`
- `responsibility`
- `phone`
- `whatsappLink`
- `email`
- `notes`

Email buttons only appear when an email is provided. Do not invent missing emails.

Current contact categories include:

- Leadership
- Production
- Content
- Hotel
- Suppliers
- Irene
- INC / International Collective
- Clownfish
- B Good
- Remote

## How To Update Tasks

Edit the `tasks` array.

Each task can include:

- `action`
- `day`
- `time`
- `person`
- `support`
- `department`
- `location`
- `status`
- `notes`

To mark a task complete, change `status` to `Resolved` or `Complete`.

## How To Update The Schedule

Edit the `schedule` array.

Each schedule item can include:

- `dayLabel`
- `timeDisplay`
- `title`
- `shortDescription`
- `owner`
- `support`
- `department`
- `location`
- `status`
- `priority`
- `category`
- `notes`

The schedule day tabs are sticky in the Schedule section.

## How To Update Supplier Open Items

Edit the `suppliers` array.

Supplier cards are grouped so each supplier appears once.

Each supplier can include:

- `supplierName`
- `responsibility`
- `internalOwner`
- `contactPerson`
- `phone`
- `email`
- `day`
- `arrivalTime`
- `setupTime`
- `activeTime`
- `location`
- `status`
- `openItems`

Each `openItems` entry can include:

- `item`
- `status`
- `owner`
- `latestUpdate`
- `comments`

Use status labels such as `Resolved`, `Problem`, `Needs Confirmation`, `Waiting`, or `On Track`.

## How To Update Podcast

Edit the `podcast` array.

Podcast timing is currently marked `Needs Confirmation` where final timing is not locked.

Each podcast card can include:

- `day`
- `date`
- `time`
- `slot`
- `guest`
- `presenter`
- `productionLead`
- `technicalTeam`
- `location`
- `productionNeeds`
- `status`
- `notes`

## How To Update Content Capture

Edit the `contentCapture` array.

Each item can include:

- `day`
- `time`
- `moment`
- `contentType`
- `priority`
- `lead`
- `support`
- `department`
- `location`
- `status`
- `notes`

Priority labels include `Must Capture`, `Important`, `Nice to Capture`, and `Needs Confirmation`.

## How To Add Documents, Menus, Maps, And Seating Plans

Edit the `documents` array.

Each document can include:

- `title`
- `category`
- `day`
- `description`
- `type`
- `owner`
- `status`
- `link`

Document categories include:

- Menus
- Maps
- Seating Plans
- Room Layouts
- Brand Files
- Supplier Documents
- Runbooks
- Production Documents
- Guest Experience
- Other

If a file is missing, leave `link` blank and set `status` to `File Needed`.

Put hosted files in `assets/documents/`.

## How To Add Images

Use these folders:

- `assets/images/swag/`
- `assets/images/room-drops/`
- `assets/images/horizons-house/`
- `assets/images/venue/`
- `assets/images/production/`

Reference images should help the team understand setup, room drops, swag, display cabinet, venue notes, or production needs.

Current missing image/reference needs are listed in `content.json` under `referenceImageNeeds`.

## GitHub Publishing

When connected to GitHub:

1. Commit changes.
2. Push to the `main` branch.
3. In GitHub, open repository settings.
4. Go to Pages.
5. Set source to `main` and folder to `/root`.
6. Save.

GitHub Pages URL:

```txt
https://samuelmjprice.github.io/inc-horizons/
```

Custom domain URL:

```txt
https://inc-horizons.com/
```

## DNS Notes

Custom domain requested: `inc-horizons.com`.

GitHub Pages is configured from the `main` branch at repository root.

For an apex/root domain, GitHub Pages typically uses these A records:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

For a subdomain, use a CNAME pointing to the GitHub Pages host, usually:

```txt
USERNAME.github.io
```

Do not guess or delete existing DNS records without confirming the actual domain and any conflicts.

## Files To Avoid Editing Unless Necessary

Most editors should avoid changing:

- `index.html`
- `style.css`
- `script.js`
- files in `assets/fonts/`
- official logo files in `assets/logos/`

Do not redraw, recolour, distort, stretch, modify, or recreate official HORIZONS logos.

## Common Updates

- Change event dates: edit `event.dates`.
- Change active live day: edit `today.date`.
- Add a contact: add an object to `contacts`.
- Mark a task resolved: change `status` to `Resolved`.
- Add a supplier issue: add it to that supplier’s `openItems`.
- Add a map: place the file in `assets/documents/` and add a document card with category `Maps`.
- Add an image: place it in the correct `assets/images/` folder and reference it in `content.json`.
