# Mobile-First UX Review

Date: 2026-06-04

## Viewports Reviewed
- 390px mobile
- iPhone-width behavior
- Android-width behavior
- Tablet/desktop responsive behavior

## Primary Findings
- Complex tools need full-screen or full-width treatment on mobile.
- Horizontal tab rows are risky when labels are long.
- Sticky controls can cover form fields unless scoped carefully.
- Large desktop headings need smaller mobile variants.
- Button rows need to stack or move secondary actions into a “More” control.

## Fixes Applied
- HORIZONS Hall Control Centre now uses a compact mobile header.
- HORIZONS Hall mobile tabs are replaced by a native “Section” selector.
- Global floating section navigation is hidden while the Hall Control Centre is open.
- Mobile action rows, guest controls, and form controls stack full-width.
- Mobile save controls in the table editor remain inline so they do not cover seat fields.
- Complex tool/card grids collapse to single-column on phone.

## Remaining Watch Items
- Capture Log would benefit from a dedicated full-screen add/edit drawer.
- Menus and Signage may benefit from mobile section selectors if content expands further.
- Admin should remain a single entry point on mobile.
