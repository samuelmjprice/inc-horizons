# HORIZONS Hall Mobile Scroll Fix Report

## Fixes Made
- Moved the mobile section selector out of the scrolling content area.
- Changed the Hall panel shell to use separate rows: header, section selector, scroll body.
- Updated mobile panel sizing to use `100dvh`.
- Kept the page behind the Hall Control Centre locked while the panel is open.
- Removed sticky selector behavior that was covering tab content.
- Added `data-hall-scroll` as the single Hall scroll container.

## QA Result
- Mobile 390px: no horizontal overflow.
- Mobile 390px: content begins below the section selector.
- Stage / Technical, Theatre Seating, Files and Overview tabs no longer visibly scroll behind the header/selector.

