# Ask HORIZONS Lite Implementation Report

## Built
- Added a floating `Ask HORIZONS` button.
- Added a branded Ask HORIZONS drawer/panel.
- Mobile opens as a full-screen drawer with safe-area padding.
- Desktop opens as a right-side command panel.
- Added shortcut chips for common onsite questions and sections.
- Added `/` keyboard shortcut to open Ask HORIZONS and Escape to close.
- Added a no-results state with suggested quick links.

## Search/index
- Uses existing website data only.
- No OpenAI API dependency.
- No edit/delete/send Slack actions.
- Indexed people, locations, schedule, call sheet, menus, guests/namecards, attendee directory, suppliers, podcast, content, assets, documents, missing items, and HORIZONS Hall references.

## Open behavior
- Results open the relevant top-level section with sticky-header offset.
- Ask drawer closes when a result opens.
- Homepage search does not remain active after opening a result.

## Privacy
- Sensitive/private field keys are excluded from the searchable text blob.
- Attendee Directory remains labelled confidential/internal.
