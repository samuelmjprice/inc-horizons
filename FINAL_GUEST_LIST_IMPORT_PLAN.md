# Final Guest List Import Plan

Date: 2 June 2026

## Scope

This is a proposed plan only. No guest data has been imported and no website content has been changed.

## Current Findings

- No dedicated `Guest List`, `Guests`, or `Attendees` section exists in the live site.
- No top-level `guests`, `guestList`, or `attendees` key exists in `content.json`.
- Guest-related data is currently scattered across schedule, travel, podcast, speakers, call sheets, restaurants, location schedules, guest materials, Cvent placeholders, and missing file records.
- The likely final guest-list workbook is `SIX SENSES IBIZA ROOMING LIST .xlsx`, but Samuel/Chris should confirm this before import.
- The workbook has a strong canonical sheet: `MASTER LIST`.
- `MASTER LIST` contains 174 populated names, including guests, VIPs, staff, and crew.
- The workbook also contains sensitive rooming, passport, DOB, travel, PNR, visa, cost, and hotel details that should not be exposed broadly.

## Recommended Guest Data Placement

### 1. Create canonical source data

Add a new canonical source key after approval:

`guests`

Each guest should have one record and one stable ID:

- `guest_001`
- `guest_002`
- etc.

Recommended canonical fields:

```json
{
  "id": "guest_001",
  "name": "",
  "first_name": "",
  "last_name": "",
  "badge_name": "",
  "company": "",
  "role": "",
  "guest_type": "",
  "sector": "",
  "track": "",
  "lanyard": "",
  "dinner_routing": {
    "wednesday": "",
    "thursday": ""
  },
  "invite_status": "",
  "registration_status": "",
  "room_tiering": "",
  "email": "",
  "email_visibility": "admin",
  "visibility": "team",
  "related_schedule_items": [],
  "related_podcast_items": [],
  "related_speaker_sessions": [],
  "related_restaurant_items": [],
  "related_documents": [],
  "notes": "",
  "status": "Confirmed",
  "source_workbook": "",
  "source_sheet": "",
  "source_row": "",
  "last_updated": ""
}
```

### 2. Add a team-facing Guest List section

Recommended section name:

`Guests / Attendees`

Recommended safe visible fields:

- Name
- Company
- Role/title
- Guest type
- Sector / track
- Lanyard / track routing
- Dinner routing
- Registration/invite status
- VIP flag if approved
- Relevant podcast/speaker/session links if approved
- Notes/status that are safe for team visibility

Fields to hide by default:

- personal email unless approved
- phone numbers unless approved
- hotel room / rooming details
- passport details
- DOB
- nationality
- visa details
- PNRs
- travel costs
- private notes

### 3. Keep sensitive data admin-only or exclude it

Recommendation:

- Do not import passport/DOB/PNR/cost fields into public/team-facing `content.json`.
- If Samuel/Chris need those fields preserved, place them in an admin-only/private source file outside the rendered team UI, with clear `visibility: private`.
- Do not make sensitive fields searchable in the live website.

### 4. Cross-reference existing sections

After approval, update cross-references rather than duplicating guest data.

Sections that should be cross-linked:

- `schedule`: link guest arrival/session/dinner records to guest IDs.
- `travel`: link only if travel details are approved for operational use.
- `podcast`: link podcast guests only where explicitly confirmed.
- `speakers`: link speakers/session guests only where explicitly confirmed.
- `callSheets`: use safe guest names/counts/statuses and related IDs.
- `restaurants` / `restaurantSchedules`: update dinner routing and counts if approved.
- `locationSchedules`: link guest movement/arrival records where useful.
- `swag` / `roomDrops`: use counts/statuses for guest materials, not private room data.
- `cventComparison`: use invite/registration/Cvent fields if approved.
- `missingFiles`: mark guest-list-related missing items resolved only where the workbook actually supplies the answer.

## What Should Be Updated After Approval

### `content.json`

Potential updates:

- Add `guests` canonical array.
- Add `guestDataMap` or extend `websiteDataMap`.
- Add cross-reference IDs to schedule/podcast/speaker/travel/restaurant/call sheet records.
- Add or update missing file statuses where the guest list resolves a missing item.
- Add visibility flags for guest data.

### `index.html`

Potential updates:

- Add a new navigation item under People / Teams or Guest Experience:
  - `Guests`
  - or `Guests / Attendees`
- Add a new section container for the guest list if approved.

### `script.js`

Potential updates:

- Render the guest list section.
- Add guest filters:
  - name
  - company
  - type
  - sector
  - track
  - dinner
  - status
- Add cross-link rendering for schedule/podcast/speaker/travel/restaurant records.
- Ensure private fields do not render or search.

### `style.css`

Potential updates:

- Add light styling for guest cards/list rows if needed.
- Keep mobile-first, calm, and compact.

### Admin/source docs

Potential updates:

- Add a guest import report.
- Add skipped/private fields report.
- Update data dictionary with guest model.
- Update website update workflow.

## Recommended Section Placement

Best option:

- Add `Guests / Attendees` under `People / Teams`, near Contacts and Staff.

Alternative:

- Add under `Guest Experience / Assets`, but this is less suitable because the guest list is people data, not materials.

Recommended nav group:

```text
People / Teams
- Contacts
- Staff
- Guests / Attendees
- Suppliers
```

## What Not To Update

Do not automatically update:

- Staff Lists from guest rows marked Staff/Crew without review.
- Contacts from guests unless they are operational contacts.
- Who Do I Call unless a guest is an approved escalation/decision contact.
- Podcast guest names unless explicitly linked/confirmed.
- Speaker Content unless explicitly linked/confirmed.
- Room allocations or hotel room numbers.
- Passport/DOB/visa/frequent flyer/PNR/cost data.
- Production Slack routing.
- Live site deployment.

## Risks

- The workbook includes sensitive personal data.
- The workbook mixes Guests, VIPs, Staff, Crew, internal Aream, rooming, and travel data.
- Importing everything naively would expose private information and create duplicate/conflicting records.
- Current website data has many guest placeholders and may not match final guest names yet.
- Some guest data may overlap with Cvent, podcast, speaker, travel, and dinner routing.

## Proposed Import Approach After Approval

1. Confirm the final workbook path.
2. Back up project again.
3. Read `MASTER LIST` as the canonical guest identity source.
4. Generate stable guest IDs.
5. Exclude or mark private all sensitive fields.
6. Create a preview JSON file first:
   - `data/output/guests.final-guest-list.preview.json`
7. Produce an import preview report:
   - rows imported
   - rows skipped
   - sensitive fields excluded
   - missing fields
   - likely duplicates
8. Wait for approval if any ambiguity remains.
9. Add canonical `guests` data.
10. Add website section only if approved.
11. Add safe cross-references.
12. Validate JSON and test locally.
13. Deploy only after final approval.

## Approval Required

Do not proceed until Samuel/Chris approve:

- final workbook source
- visible section name
- safe fields to display
- whether emails/dietary/travel/dinner/VIP fields are visible
- whether staff/crew rows are imported into guest list
- whether Cvent comparison should be updated
- whether old guest placeholders should be archived/replaced
