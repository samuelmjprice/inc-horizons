# Search Behavior QA Before / With Ask Lite

## Confirmed behavior
- Homepage search renders a results panel instead of filtering/hiding the whole website.
- Result buttons use shared navigation that activates the correct app group and scrolls with sticky-header offset.
- Clearing/resetting search returns the page to normal.
- Ask HORIZONS uses the same safe result builder and alias matching.

## Queries covered by automated/implementation QA
- who do i call
- Samuel Price
- HORIZONS Hall
- menus
- podcast
- lanyard
- room drops
- what do we still need
- attendee directory

## Privacy
- Search excludes sensitive keys before creating searchable blobs.
- No OpenAI API or external AI call is used.
