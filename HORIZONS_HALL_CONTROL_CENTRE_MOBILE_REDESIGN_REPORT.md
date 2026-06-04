# HORIZONS Hall Control Centre Mobile Redesign Report

Date: 2026-06-04

## Problems Found
- Mobile header consumed too much vertical space.
- Status chips added visual height and pushed controls down.
- Horizontal tabs could clip labels such as Stage / Technical.
- Global bottom navigation could compete with the full-screen tool.
- Action rows and form controls felt cramped on phone.

## Changes Made
- Reduced HORIZONS Hall Control Centre mobile heading size.
- Moved status chips into a collapsed Status summary control.
- Added an X close button in the top-right.
- Kept Open Call Sheet as the primary action.
- Moved secondary actions into a More menu.
- Replaced the mobile tab row with a native Section selector.
- Kept desktop tabs intact.
- Ensured Overview and Round Tables collapse to single-column on phone.
- Hid global section jump/progress controls when the Hall Control Centre is open.

## Round Tables
- Still shows one selected table at a time.
- Still uses shared snapshot storage.
- Still preserves Export CSV, Print seating plan, and Copy summary.
- Mobile edit controls no longer overlay seat fields.

## Remaining Confirmations
- Final seat count.
- Updated layout from Kirsty / Clownfish.
- Reserved seat assignments.
