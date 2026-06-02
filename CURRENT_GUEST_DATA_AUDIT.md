# Current Guest Data Audit

Date: 2 June 2026

## Scope

This is an audit only. No guest data has been imported and no live website content has been changed.

Live site checked: `https://inc-horizons.com/`

Local source checked:

- `content.json`
- `script.js`
- `index.html`
- `/data`
- current audit/report files
- missing-file and Cvent records
- travel, podcast, speaker, restaurant, location, call sheet, staff, contacts, documents, and materials data

## High-Level Finding

There is no dedicated `Guest List`, `Guests`, or `Attendees` section in the current live site or `content.json`.

Current guest-related information is scattered across operational sections:

- Schedule
- Travel / Flights
- Podcast
- Speaker Content
- Call Sheet
- Restaurant Schedules
- Location Schedules
- Guest Materials / Experience
- Room Drops
- Contacts
- Staff Lists
- Documents / Missing Files
- Cvent Comparison
- Who Do I Call
- Admin / Data Health

The final guest list should become a canonical source rather than being copied into every section as separate records.

## Live Site Structure

The deployed navigation currently includes:

- Overview
- Today
- Red Flags
- Decisions
- Who Do I Call
- Call Sheet
- Schedule
- Flights
- Daily Focus
- Location Schedules
- Restaurants
- Tasks
- Contacts
- Staff
- Suppliers
- Podcast
- Speakers
- Entertainment
- Playlists
- Rehearsals
- Content
- Guest Materials
- Room Drops
- HORIZONS House
- Signage
- Documents
- Locations
- Admin Data

No `Guest List` or `Attendees` navigation item is currently present.

Live `content.json` also has no top-level `guests`, `guestList`, or `attendees` key.

## Current Source Sections With Guest-Related Data

### `schedule`

Records: 310 total.

Guest-related hits: 107.

Guest-related data appears in schedule titles/notes for:

- Aream arrivals
- test guest check-in
- guest arrivals
- welcome reception
- podcast subject arrivals
- speaker/session moments
- dinner/reception moments
- HORIZONS Connect and guest-led sessions

Examples:

- `schedule-27`: `Test check-in & onboarding — Aream staff as test guests`
- `schedule-31`: `Carlo, Julian, Simon & Irem arrive at Six Senses`
- `schedule-150`: podcast guest arrival/holding references
- guest arrival and dinner flow records across 9-12 June

Risk:

- Guest names and placeholder “Subject 1/2/3/4” data are mixed into schedule records.
- The final guest list should cross-reference schedule items instead of duplicating guest details in schedule text.

### `travel`

Records: 40 total.

Guest-related hits: 40.

Travel records currently include guest/client/staff names, vague placeholders, and flight/transfer gaps.

Examples:

- Eve Dusek / Poppy Luck
- Aream staff arrivals
- Carlo, Julian, Simon & Irem
- Anjan Sarangi
- podcast `Subject 1`, `Subject 2`, `Subject 3`, `Subject 4`
- generic `On site`, `Check-in`, and unclear travel records

Risk:

- Travel data is incomplete and not canonical.
- The final guest list may help resolve person names, but detailed travel should remain controlled and not automatically displayed broadly.

### `podcast`

Records: 29 total.

Guest-related hits: 29.

Podcast records currently use mostly placeholders:

- `Guest / subject TBC`
- `Presenter TBC`
- `Guest company: Needs Confirmation`
- guest runner/prep owner/checklist placeholders

Risk:

- Podcast guest identities are not final in current source data.
- Final guest list may identify possible guests, but podcast records should only be updated if the workbook or approval explicitly confirms podcast participation.

### `speakers`

Records: 12 total.

Guest-related hits: 12.

Current speaker records mostly show:

- `Needs Name Confirmation`
- `Awaiting Content`
- HORIZONS Hall / Studio / Podcast grouping placeholders
- HORIZONS Connect / guest-led panel references

Risk:

- Speaker records should not be populated from the guest list unless the guest list includes explicit speaker/session mapping or Samuel/Chris approve the link.

### `callSheets`

Records: 7 total.

Guest-related hits: 7.

Call sheet notes include:

- guest arrivals
- guest departures
- podcast guest arrival / mic fitting
- dinner and reception guest counts
- HORIZONS Connect / all guests
- missing guest/podcast confirmations

Risk:

- Call sheet needs operational guest flow, but not sensitive personal details.
- It should consume safe guest status/counts and named VIP/speaker/podcast links only where useful.

### `restaurantSchedules`, `restaurants`, and `menus`

Guest-related data includes:

- dinner locations
- guest counts
- sector dinner routing
- welcome reception
- Gala dinner
- Beach Caves / Orchard / Farmers Market routing
- menus and dietary placeholders

Risk:

- The final guest list includes dinner routing and likely should update restaurant/dinner counts and routing.
- Dietary data should be handled carefully and not overexposed.

### `locationSchedules` and `locations`

Guest-related data includes:

- arrivals at Six Senses / HORIZONS House
- guest flow at HORIZONS House
- HORIZONS Hall / Studio session locations
- dinner/reception locations
- podcast guest movement to Cliffhanger Mansion

Risk:

- Location schedules should reference guest groups/counts and VIP/speaker movements, not duplicate guest records.

### `contacts`

Records: 29 total.

Guest-related hits: 20, mostly because contacts include event team, Aream, B Good, Clownfish, podcast, and escalation notes.

Risk:

- Guests should not be merged into Contacts unless they are operational contacts, speakers, VIP/client decision-makers, or approved contacts.
- The guest list should not overwrite existing contacts/staff without approval.

### `staffLists`

Six staff groups exist:

- International Collective / I.N.C
- Clownfish
- Aream & Co.
- B Good
- Performers
- Hotel / Venue

Risk:

- The guest workbook includes `Staff` and `Crew` registration types.
- These rows should be cross-checked against existing Staff Lists, not blindly imported as guests.

### `swag`, `roomDrops`, `horizonsHouse`

Guest-related data includes:

- guest materials
- tote bags
- room drops
- reception display
- room drop references
- guest-facing signage/materials

Risk:

- Final guest list may be useful for room drops, badge/lanyard counts, and guest materials counts.
- It should not expose room allocation or private notes.

### `cventComparison`

Records: 5 total.

Current Cvent records are placeholders awaiting:

- Cvent agenda export
- Cvent speaker/session export
- Cvent venue/location list
- Cvent meal/restaurant schedule
- Cvent attendee-facing copy

Risk:

- The final guest list contains Cvent status fields (`PL Notes - Cvent`, `Invitee Status`, Cvent email).
- It should update or enrich Cvent comparison only after approval.

### `missingFiles`

Records: 84 total.

Guest-related missing file records include:

- Cvent exports
- speaker list/bios/session details
- podcast guest list
- guest arrival/holding notes
- dietary notes
- menus
- venue maps/floor plans

Risk:

- Some missing file placeholders may be resolved by the final guest list.
- Others still require separate files/documents.

### `whoDoICall`

Contains limited guest-related escalation references:

- Aream/client approvals
- podcast escalation
- technology / web hub

Risk:

- A guest list should not expand Who Do I Call unless named people have decision-making, VIP, speaker, or operational escalation relevance.

## Duplicates / Cross-Use Risk

Guest names and guest concepts currently repeat across:

- `schedule`
- `travel`
- `callSheets`
- `locationSchedules`
- `restaurantSchedules`
- `podcast`
- `speakers`
- `swag`
- `missingFiles`
- `cventComparison`

Examples:

- Eve Dusek / Poppy Luck appear in contacts, travel, schedule, call sheets, and Slack invite context.
- Podcast guests are currently represented as placeholders in podcast, schedule, call sheet, travel, and missing files.
- Dinner guest counts appear in menus, swag/materials, restaurant schedules, call sheets, and Cvent placeholders.

Recommendation:

- Create one canonical guest record per person and connect sections through IDs/cross-references.
- Do not duplicate guest details into each section manually.

## Sensitive Data Exposure

Current source data has staff dietary requirements in `staffLists`, but the inspected final guest workbook contains more sensitive categories:

- Passport details
- DOB
- nationality
- visa details
- frequent flyer numbers
- PNRs
- travel costs
- rooming/hotel allocation

These should not be added to team-facing `content.json` or displayed on the website without a strict admin-only/private model.

## Outdated / Missing Guest Data

Current website still has:

- `Guest / subject TBC`
- `Needs Name Confirmation`
- `Subject 1/2/3/4`
- Cvent export placeholders
- podcast guest list missing
- guest arrival/holding notes missing
- dietary notes missing
- unclear travel records
- no dedicated guest list section

## Conclusion

The site currently treats guests as operational notes scattered across other sections. The final guest list should become the canonical source for guest identity, type, company, title, registration/Cvent status, track/dinner routing, and safe operational cross-references.

Do not import sensitive fields or push guest data into every section directly.
