# Lanyards and Namecards Structure Review

Date: 2 June 2026

## File Used

`/Users/ddm/Downloads/Lanyards and Namecards Final 9.xlsx`

## Sheets Found

- `MASTER LIST`
- `LANYARDS`
- `ROOMING LAYOUT`
- `SITE MAP`

Only `MASTER LIST` contains populated guest/namecard data. The other sheets are empty in the inspected workbook.

## Columns Found

`MASTER LIST` columns:

- `BADGE NAME`
- `Company Name`

## Rows Found

- Total populated guest/namecard rows: 215
- Missing badge/namecard names: 0
- Missing company names: 1
- Duplicate names found: 1

## Duplicate Names

- `ryan lowe` appears 2 times

## Fields Safe To Display

- Badge/namecard display name
- Company display name
- Namecard/lanyard readiness status generated from missing/duplicate checks
- Source row for admin trace if needed

## Fields Excluded From Display

No sensitive columns were present in this workbook. The import still excludes sensitive fields by design, including passport, DOB, room allocation, PNR, travel cost, visa, medical, or private notes from any older rooming/travel files.

## Questions After Import

1. Should the duplicate `Ryan Lowe` row remain as two lanyards/namecards or be deduplicated?
2. Should the one row with missing company be corrected?
3. Should role/title, VIP/category, speaker, or podcast involvement be added from another approved source later?
