# HORIZONS Hall Mobile QA Report

## Mobile test target
- 390px wide mobile viewport.

## Expected behavior
- HORIZONS Hall location card remains compact.
- Hall Control Centre opens as a full-screen sheet.
- Tabs are visible and tappable.
- Round Tables tab shows table selector chips.
- Only one selected table is visible.
- Seat rows are stacked vertically.
- Seat assignment fields are not shown for every seat by default.
- No horizontal overflow.

## QA status
- Passed local mobile browser QA at 390px.
- HORIZONS Hall location card stayed compact and did not contain the round table editor.
- Hall Control Centre opened as a full-screen 390px-wide sheet.
- Round Tables tab showed one selected table with 9 visible seats.
- Seat assignment fields were hidden by default and appeared only after selecting one seat to edit.
- Guest picker source loaded 215 safe guest/namecard options.
- Theatre Seating, Stage / Technical, and Files tabs rendered successfully.
- Control Centre closed successfully.
- No horizontal overflow detected.
- No console errors detected.

## Backend note
- Seating save remains shared through the Vercel backend snapshot fallback.
- Dedicated Supabase seating tables still need migration confirmation.
