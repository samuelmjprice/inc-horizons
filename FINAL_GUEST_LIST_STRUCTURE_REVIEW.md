# Final Guest List Structure Review

Date: 2 June 2026

## Scope

This is an audit only. No guest data has been imported and no website content has been changed.

## Final Excel File Found

No workbook in the project is named exactly `Final Guest List`.

The strongest candidate found is:

`/Users/ddm/Documents/Codex/2026-05-31/codex-instructions-horizons-master-review-voice/SIX SENSES IBIZA ROOMING LIST .xlsx`

The same file also exists in `/Users/ddm/Downloads/SIX SENSES IBIZA ROOMING LIST .xlsx`.

Reason it appears to be the final guest-list source:

- It contains a `MASTER LIST` sheet with guest names, Cvent status, sectors, dinner routing, registration type, room tiering, company, title, and email columns.
- It contains rooming, no-room-allocation, Aream internal, travel, site map, and capacity-related sheets.
- It contains 174 populated rows in the `MASTER LIST` sheet.

Before import, Samuel/Chris should confirm this is the final approved guest list workbook.

## Sheets Found

Workbook sheets:

- `Sheet1`
- `WIP ROOMING LIST`
- `MASTER LIST`
- `LANYARDS`
- `No Room Allocation`
- `BREAKDOWN`
- `ROOMING LAYOUT`
- `SITE MAP`
- `CAPACITIES`
- `INTERNAL AREAM`
- `Detail1-09062026 1315`
- `Outbound Per DayPer Flight Summ`
- `Inbound Per DayPer Flight Summa`
- `US team travel`
- `Sheet10`

## Primary Sheet: MASTER LIST

Rows found:

- 174 populated rows with a `Full Name`.

Columns found:

- `Full Name`
- `First Name`
- `Last Name`
- `Primary Email`
- `Sector`
- `LANYARD`
- `TRACK - APP`
- `WED DINNER`
- `Tiering (Ibiza)`
- `Room Tiering`
- `Invite Status`
- `PL Notes - Cvent`
- `Invitee Status`
- `Registration Type`
- `Passport First Name`
- `Passport Last Name`
- `PASSPORT NAME`
- `Badge First Name`
- `Badge Last Name`
- `BADGE NAME`
- `Company Name`
- `Title`
- `Cvent Email Address`
- `Wednesday Dinner`
- `Thursday Dinner`

Observed counts:

- `Guest`: 124
- `VIP`: 12
- `Staff`: 31
- `Crew`: 1
- Accepted invitees: 164
- No response: 5

Missing field counts in `MASTER LIST`:

- `Primary Email`: 34 missing
- `Sector`: 35 missing
- `LANYARD`: 3 missing
- `TRACK - APP`: 3 missing
- `WED DINNER`: 3 missing
- `Tiering (Ibiza)`: 34 missing
- `Room Tiering`: 36 missing
- `Invite Status`: 34 missing
- `Invitee Status`: 3 missing
- `Registration Type`: 6 missing

## Other Important Sheets

### WIP ROOMING LIST

Contains room allocations across floors/buildings and room/tier data. This sheet appears useful for operations/admin, but room-level information should not be broadly displayed on the team website unless explicitly approved.

### INTERNAL AREAM

Contains Aream internal travel and identity details.

Columns include:

- Given name / surname
- Gender
- Email address for confirmation
- Passport number
- Passport issue/expiry dates
- Place of issue
- Nationality
- DOB
- Frequent flyer number
- Visa required
- Travel class
- Job title
- Fly in / fly out
- Preferred airport
- Notes
- Flight dates/times/numbers
- PNRs
- Costs

This sheet contains highly sensitive personal data and should be admin/private only.

### US team travel

Contains outbound/return flight, hotel, check-in/check-out, and cost information. Treat as admin-only unless Samuel/Chris approve a limited operational view.

### No Room Allocation

Columns:

- Registration Type
- Invitee Status
- Name
- Company Name
- Tiering
- Comments

No populated guest rows were found during this inspection.

## Sensitive Data Fields

The workbook contains sensitive fields that should not be displayed on the team-facing website:

- Passport numbers
- Passport issue dates
- Passport expiry dates
- Place of issue/authority
- Nationality
- DOB
- Frequent flyer numbers
- Visa requirement
- PNRs
- Travel costs
- Hotel/room allocation details
- Private notes
- Personal travel routing where not operationally required
- Personal email/phone data unless explicitly approved for team display

## Fields Safe To Show, Subject To Approval

Recommended team-facing fields:

- Name
- Company
- Title / role
- Guest type: Guest / VIP / Staff / Crew
- Sector / track
- Badge name if needed
- Lanyard / track routing
- Dinner routing at a high level
- Invite/registration status
- Podcast/speaker relevance if cross-linked later
- Broad arrival/departure status if operationally useful
- Non-sensitive status notes

## Suggested Canonical Guest Data Model

Recommended canonical model before import:

```json
{
  "id": "guest_001",
  "name": "",
  "first_name": "",
  "last_name": "",
  "badge_name": "",
  "company": "",
  "role": "",
  "guest_type": "Guest / VIP / Staff / Crew",
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
  "travel_status": "",
  "related_schedule_items": [],
  "related_podcast_items": [],
  "related_speaker_sessions": [],
  "related_restaurant_items": [],
  "related_documents": [],
  "visibility": "team/admin/private",
  "notes": "",
  "status": "Confirmed / Needs Confirmation / Missing Data",
  "source_workbook": "",
  "source_sheet": "",
  "source_row": "",
  "last_updated": ""
}
```

## Questions Before Import

1. Confirm whether `SIX SENSES IBIZA ROOMING LIST .xlsx` is the final approved guest list source.
2. Should staff/crew rows in `MASTER LIST` be imported as guests, or cross-linked to existing Staff Lists only?
3. Should guest emails be displayed to the team, hidden, or admin-only?
4. Should dinner routing be visible on the team site?
5. Should room tiering be visible, or admin-only?
6. Should room allocations ever display on the website?
7. Should travel details from `INTERNAL AREAM` and `US team travel` update the Travel section, or remain admin-only?
8. Should Cvent status become part of the live Guest List section?
9. Should VIP status be visible to the team or admin-only?
10. Should passport/DOB/PNR/cost fields be excluded entirely from website data?
