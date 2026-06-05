# HORIZONS Hall Control Centre Bug Audit

## Source
- Review date: 2026-06-05
- Area: HORIZONS Hall Control Centre
- Files inspected: `script.js`, `style.css`, `content.json`, Hall layout/document records

## Bugs Found
- Mobile section selector was rendered inside the scroll body and styled as sticky, causing content to pass underneath it.
- Hall tab/table actions re-rendered the whole Locations section without restoring the Hall panel scroll position, causing table changes to feel jumpy.
- Assign Guest controls were disabled in view mode without a clear explanation.
- Clear controls were shown for empty seats, making them look broken.
- Files tab used `url/file` fields only, while HORIZONS Hall PDFs are stored as `link/download`, so valid files could appear as missing.
- Desktop header used absolute close positioning, which allowed the More control and close button to crowd each other.

## Root Causes
- Mixed fixed/sticky layers inside a nested modal scroll container.
- Re-rendering the Hall Control Centre from global Locations render functions.
- Edit mode and view mode were not visually distinct enough.
- Document-link rendering did not support the current canonical document fields.

## Files Changed
- `script.js`
- `style.css`

