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

## Comments And Official Data

Comments are updates and discussion. They are not official display data until reviewed and approved.

Approved comments should be applied to `content.json`, then committed and deployed through GitHub Pages.
