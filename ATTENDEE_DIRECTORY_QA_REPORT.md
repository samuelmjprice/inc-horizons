# Attendee Directory QA Report

## Verified
- People includes Attendee Directory as part of the People group.
- Directory count is rendered from safe imported records.
- Search, category filter, company filter, and reset controls are wired.
- Cards are summary-first; profile detail opens on tap.
- Confidential/internal-only note is visible.
- Source PDF is linked as a confidential document/source.
- Automated browser QA confirmed the section exists and no horizontal overflow appeared at tested mobile/desktop widths.

## Privacy
- Attendee records intentionally use safe fields only: name, company, category, status, source page, directory page, visibility, and optional safe summary.
- DOB, PNR, passport, rooming, private notes, and private travel data were not imported into attendee display records.
