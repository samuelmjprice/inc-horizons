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

## Follow-up QA - 2026-06-03 23:49 BST
- Reproduced the Hall Control Centre control clipping issue from the supplied screenshots.
- Fixed the sticky Hall tab row so it keeps a stable 60px height and no longer clips tab buttons while scrolling.
- Reduced the Hall Control Centre title scale on desktop and mobile so the working controls appear sooner.
- Changed the mobile round-table save bar from floating/sticky to inline/static so it no longer covers seat assignment fields.
- Re-tested at 2048px desktop width and 390px mobile width.
- Confirmed tab controls remain visible while scrolled.
- Confirmed mobile edit mode has no horizontal overflow.
- Confirmed mobile save controls do not overlap the active seat form.
