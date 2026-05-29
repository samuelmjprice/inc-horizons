# HORIZONS Data Dictionary

`content.json` is the official display data for the HORIZONS command centre. The Excel tracker and website comments are intake/review tools. They do not become official until approved updates are applied to `content.json`.

## Global Rules

### Chris Name Rule

There is only one Chris:

`Chris Manoe`

Do not use `Chris Minot`, `CM`, `Chris M`, or any other Chris variation.

### HORIZONS Hall Rule

Use:

`HORIZONS Hall`

Do not use:

`Farmers Market Stage`

### Supplier Duplication Rule

Suppliers should appear once. Multiple questions, timings, or unresolved notes should be grouped as `openItems` under the supplier.

### Brand Spelling Rule

Use `BeGood` and `Clownfish` exactly.

Do not use old variants such as `BE GOOD`, `Be-Good`, `Be good`, `BGood`, `Clown Fish`, or `ClownFish`.

### Missing Info Rule

Use clear missing-info labels:

- `Email needed`
- `Phone needed`
- `File needed`
- `Time needed`
- `Needs Confirmation`

Do not invent data.

## Accepted Status Labels

- `Needs Confirmation`
- `Confirmed`
- `On Track`
- `Watch`
- `Problem`
- `Waiting`
- `Resolved`
- `Decision Needed`
- `File Needed`
- `Info Needed`

## Accepted Priority Labels

- `Critical`
- `Watch`
- `Important`
- `Must Capture`
- `Nice to Capture`
- `Needs Confirmation`

Do not use raw spreadsheet labels such as `Yellow - Needs Confirmation` or `Red - Problem`.

## Accepted Departments

- `Food & Beverage`
- `Health & Wellness`
- `Content`
- `Entertainment`
- `Mentality`
- `Podcast`
- `Production`
- `Leadership`
- `Operations / Logistics`
- `Suppliers`

## Latest Workbook Sync Fields

The latest schedule sync uses these display records:

- `schedule`: includes `date`, `dayLabel`, `timeStart`, `timeEnd`, `timeDisplay`, `period`, `title`, `owner`, `support`, `location`, `status`, `priority`, `category`, `department`, `source`, and `notes`.
- `dailyRunSheets`: generated from approved schedule rows for each event day, including Saturday 6 June.
- `locations`: card-first records with `primaryUse`, `mainDays`, `keyOwner`, `watchOut`, `status`, and expandable `scheduleItems`.
- `suppliers`: one supplier card per supplier, with `timelineBlocks` for connected day/time/location records and `openItems` for unresolved questions.
- `menus`: menu and catering reference records sourced from the latest workbook.
- `swag`: now includes broader Guest Materials & Experience records such as swag, menus, tote bags, easel boards, printed signage, and guest touchpoints.
- `weather`: placeholder weather module fields until a live weather source or daily forecast is connected.

Do not publish unresolved timings, podcast slots, supplier setup windows, or documents as final. Use `Needs Confirmation`, `At Risk`, or `File Needed`.

## Owner / Person / Support

- `personInvolved`: the person the item is about.
- `owner`: the person accountable for the item.
- `support`: supporting people, companies, or teams.
- `department`: operational category for filtering.
- `location`: where the item happens.

Example:

```json
{
  "title": "Arrival at Six Senses",
  "personInvolved": "Chris Manoe",
  "owner": "Chris Manoe",
  "support": "I.N.C",
  "location": "Six Senses Ibiza"
}
```

## Data Sections

### `event`

Top-level event identity and display settings.

Required fields: `name`, `subtitle`, `location`, `dates`, `lastUpdated`, `description`, `logo`, `countdownTarget`.

### `today`

Short dashboard view for the current event day.

Required fields: `date`, `focus`, `priorities`, `criticalItems`, `meetings`, `deadlines`, `lead`, `notes`.

### `redFlags`

Leadership-level issues and risks.

Required fields: `issue`, `whyItMatters`, `owner`, `status`, `decisionNeeded`, `deadline`, `updateId`.

### `schedule`

Timeline/run sheet items.

Required fields: `date` or `dayLabel`, `timeDisplay`, `title`, `location`, `owner`, `status`, `updateId`.

Optional fields: `personInvolved`, `support`, `department`, `category`, `priority`, `notes`, `source`.

### `callSheet`

The website's Daily Call Sheet view is rendered from approved `schedule` items. To update a call sheet item, update the matching `schedule` object rather than creating a separate duplicate.

Recommended schedule fields for call sheet clarity: `timeDisplay`, `title`, `location`, `owner`, `support`, `department`, `category`, `status`, `notes`, `relatedSupplier`, and `relatedContentCapture`.

### `travel`

Flight, arrival, departure, airport, and transfer cards.

Required fields: `person`, `team`, `status`, `updateId`.

Optional fields: `arrivalDate`, `arrivalTime`, `arrivalAirport`, `arrivalFlight`, `departureDate`, `departureTime`, `departureAirport`, `departureFlight`, `hotelTransferNotes`, `transportOwner`, `notes`.

If details are missing, use `Flight info needed`, `Arrival time needed`, `Departure time needed`, `Transfer notes needed`, or `Owner needed`.

### `tasks`

Owner-focused actions.

Required fields: `action`, `person`, `day`, `time`, `location`, `status`, `updateId`.

Optional fields: `personInvolved`, `support`, `department`, `priority`, `notes`.

### `contacts`

Mobile-ready team contact list.

Required fields: `name`, `role`, `group` or `category`, `responsibility`, `updateId`.

Optional fields: `phone`, `whatsappLink`, `email`, `notes`, `visibility`.

Hide missing email/phone buttons in the UI. Do not invent contact details.

### `locations`

Operational location cards.

Required fields: `locationName`, `locationType`, `primaryUse`, `mainDays`, `keyOwner`, `status`, `updateId`.

### `suppliers`

Deduplicated supplier cards.

Required fields: `supplierName`, `responsibility`, `internalOwner`, `status`, `openItems`, `updateId`.

Each `openItems` entry should include `item`, `owner`, `status`, and optional `latestUpdate`.

Use `timelineBlocks` when a supplier has more than one relevant day/time. Each block should keep `day`, `arrival`, `setup`, `active`, `location`, `summary`, and `status` together.

Supplier update topics should use: `Arrival time`, `Setup time`, `Contact details`, `Delivery`, `Payment`, `Location`, `Open question`, `Issue`, `Resolved`, or `General update`.

### `podcast`

Podcast recording schedule.

Required fields: `day`, `time`, `guest` or `guestSubject`, `location`, `status`, `updateId`.

Use `Needs Confirmation` if timing is not locked.

### `contentCapture`

Photo, video, interview, social, and production capture plan.

Required fields: `moment`, `day`, `time`, `contentType`, `lead`, `location`, `priority`, `status`, `updateId`.

### `captureSuggestions`

Live capture ideas for the production/content team.

Required fields: `idea`, `name`, `status`, `updateId`.

Optional fields: `suggestedTime`, `location`, `priority`, `assignedTo`, `notes`.

Accepted suggestion statuses: `Suggested`, `Needs Review`, `Approved to Capture`, `Captured`, `Not Captured`, `Not Needed`.

Content update topics should use: `Capture idea`, `Timing`, `Location`, `Assigned person`, `Status update`, `Captured`, `Issue`, or `General note`.

### `workstreams`

Operating groups that connect people, tasks, schedule items, supplier notes, and decisions.

Required fields: `name`, `description`, `owner`, `status`, `topOpenItems`, `updateId`.

### `documents` and `siteMaps`

Document/link cards.

Required fields: `title`, `category`, `description`, `owner`, `status`, `updateId`.

If no file exists, leave `link` blank and use `File Needed`.

Document categories include `Menus`, `Maps`, `Site Map`, `Seating Plans`, `Room Layouts`, `Brand Files`, `Supplier Documents`, `Runbooks`, `Production Documents`, `Guest Experience`, `HORIZONS House`, `Room Drops`, `Swag`, `Podcast`, `Content Capture`, `Presentations / Speeches`, and `Event Content Documents`.

### `roomDrops`, `swag`, `horizonsHouse`, `horizonsStudio`

Visual operational sections for guest experience and setup.

Use official HORIZONS logos only. Do not alter or recreate logos.

The primary hero/header logo is `assets/logos/horizons-main-logo-black.png`.

Swag reference images live in `assets/images/swag/`. Each `swag` item should include `image`, `alt`, and `imageCaption` when an approved reference image exists. Practical reference images can also be reused in `roomDrops.referenceImages` and `horizonsHouse.referenceImages`.

## Comments And Official Data

Comments are updates and discussion. They are not official display data until reviewed and approved.

Approved comments should be applied to `content.json`, then committed and deployed through GitHub Pages.

## Brand Data Rules

- `event.logo` should point to `assets/logos/horizons-main-logo-black.png` unless an approved replacement official logo file is supplied.
- Do not create logo text in data fields. The website should render official logo image files only.
- Use official section names and brand wording exactly: `HORIZONS`, `HORIZONS House`, `HORIZONS Hall`, and `HORIZONS Studio`.
- Keep status values plain and clean, such as `Needs Confirmation`, `Confirmed`, `On Track`, `Watch`, `Problem`, `Waiting`, `Resolved`, `Decision Needed`, `File Needed`, and `Info Needed`.
- Avoid raw spreadsheet labels like `Yellow - Needs Confirmation` or `Green - Confirmed`; the UI supplies the colour treatment.
- Brand colours are managed in `style.css` through CSS variables. Content data should not contain colour values unless a future approved design need requires it.
- New document, schedule, supplier, or capture items should use concise summary fields first, with longer notes saved for expandable details.

## Expanded Operating Models

### `locationSchedules`

Location-filtered schedule records. Use these when the team needs to answer "what is happening in this location?"

Required fields: `id`, `locationName`, `day`, `timeDisplay`, `activity`, `whoIsPresent`, `owner`, `contentTopic`, `setupRequirements`, `status`, `notes`, `updateId`.

### `restaurants` and `restaurantSchedules`

Restaurant/meal-space schedules for Partel, Orchard, Beach Caves, Pool Deck, The Rocks, and any additional meal space.

Required fields: `restaurantName`, `day`, `meal`, `timeDisplay`, `groupAttending`, `entertainment`, `owner`, `contentCapture`, `menuFile`, `status`, `notes`.

### `speakers`

Speaker/session/deck content. Do not expose private notes unless visibility is explicitly suitable for the live team.

Statuses: `Awaiting Content`, `Draft`, `In Review`, `Approved`, `Added to Deck`.

### `rehearsals`

Rehearsal records for speakers, HORIZONS Hall, HORIZONS Studio, show running, technical, screen/deck, and podcast.

Statuses: `Confirmed`, `Needs Confirmation`, `At Risk`, `Complete`.

### `entertainment`

Performer records for DJs and entertainment professionals.

Required fields: `performerName`, `type`, `day`, `arrivalTime`, `soundCheckTime`, `performanceTime`, `location`, `internalOwner`, `technicalNeeds`, `hospitalityNeeds`, `status`, `notes`.

### `curatedPlaylists`

Every point where curated music/background music is needed.

Required fields: `day`, `time`, `location`, `playlistName`, `playlistLink`, `owner`, `startStopResponsibility`, `status`, `notes`.

### `artworkSignage`

Artwork, wayfinding, signage, easel boards, A1 boards, natural totems, print files, and placement notes.

Statuses: `File Needed`, `Artwork Uploaded`, `In Review`, `Approved`, `Sent to Print`, `Delivered`, `Installed`, `Needs Confirmation`.

### `cventComparison`

Human-review comparison between the website source of truth and Cvent exports. Never auto-overwrite website data from Cvent.

Statuses: `Match`, `Conflict`, `Needs Review`, `Corrected`, `Ignore`.

### `missingFiles`

Files/assets still needed for call sheet, Cvent, speaker/deck content, artwork/signage, staff/suppliers, entertainment, playlists, podcast, venue/restaurants, and production.

### `slackAlerts` and `meta.slackEventMapping`

Slack records are stubs until a backend/serverless endpoint exists. Do not store webhook URLs or Slack tokens in `content.json`, `script.js`, or any GitHub Pages frontend file.
