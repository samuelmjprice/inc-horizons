# Name Spelling Correction: Lyndsay Evans + Parris Taylor

Date: 2026-06-09

## Approved Spellings

- Lyndsay Evans
- Parris Taylor

## Summary

Corrected active/team-facing HORIZONS website data so the live display uses `Lyndsay Evans` and `Parris Taylor`.

Search aliases were added so common incorrect spellings still return the correct records, while rendered results continue to show the approved names.

## Variants Found And Corrected

| Variant Found | Corrected To | Files / Areas | Active Team-Facing? | Status | QA Result |
| --- | --- | --- | --- | --- | --- |
| DJ Lindsay Evans | DJ Lyndsay Evans | `content.json`, visual review files, skipped import report, staff cleanup report | Yes | Corrected | Active scan clean |
| Lindsay Evans | Lyndsay Evans | `content.json`, visual review files | Yes | Corrected | Active scan clean |
| DJ Lindsey Evans | DJ Lyndsay Evans | missing-file / visual review files, import preview output | Yes where rendered | Corrected | Active scan clean |
| Lindsey Evans | Lyndsay Evans | visual review / import traces | Yes where rendered | Corrected | Active scan clean |
| DJ Paris Taylor | DJ Parris Taylor | `content.json`, visual review files, staff cleanup report | Yes | Corrected | Active scan clean |
| Paris Taylor | Parris Taylor | `content.json`, visual review files | Yes | Corrected | Active scan clean |
| DJ Paris farewell | DJ Parris farewell | `content.json`, import preview output | Yes | Corrected | Active scan clean |
| Spelling corrected from Paris. | Spelling corrected from prior source variant. | `content.json`, import preview output | Potentially visible in admin/source detail | Corrected | No old spelling remains in active files |

## Files Changed

- `content.json`
- `script.js`
- `data/output/content.final-master-import.preview.json`
- `FINAL_MASTER_IMPORT_SKIPPED_ROWS.md`
- `MISSING_IMAGES_FILES_QUESTIONS_FOR_SAMUEL.md`
- `STAFF_CONTACT_CLOWNFISH_CLEANUP_REPORT.md`
- `WHAT_WE_HAVE_AND_STILL_NEED_VISUAL_REVIEW.csv`
- `WHAT_WE_HAVE_AND_STILL_NEED_VISUAL_REVIEW.html`
- `WHAT_WE_HAVE_AND_STILL_NEED_VISUAL_REVIEW.md`
- `WHAT_WE_HAVE_STILL_NEED_VISUAL.html`
- `WHAT_WE_HAVE_STILL_NEED_VISUAL.md`

## Search Alias Update

Added aliases in `script.js`:

| Search Input | Canonical Result |
| --- | --- |
| Lindsay Evans | Lyndsay Evans |
| Lyndsey Evans | Lyndsay Evans |
| Lindsey Evans | Lyndsay Evans |
| Paris Taylor | Parris Taylor |
| Parriss Taylor | Parris Taylor |
| Parris Tailor | Parris Taylor |

## QA

Validation run:

- `node --check script.js`
- `python3 -m json.tool content.json`
- targeted spelling scan across active website files
- browser QA on local site homepage search

Expected remaining wrong-spelling matches:

- Only this correction report and the intentional search alias keys in `script.js`.

Browser QA queries tested:

- `Lyndsay Evans`
- `Lindsay Evans`
- `Parris Taylor`
- `Paris Taylor`

Result:

- Each query returned relevant results.
- Display text used `Lyndsay Evans` and `Parris Taylor`.
- Incorrect display spellings were not present in the rendered result excerpts.
