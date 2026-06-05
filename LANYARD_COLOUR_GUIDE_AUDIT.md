# Lanyard Colour Guide Audit

Date: 5 June 2026

## Sources Checked

- `Lanyards and Namecards Final 9.xlsx`
- `Horizons - Merchandise 2026 copy 3.pdf`
- `content.json`
- `script.js`
- `index.html`
- `README.md`
- `MISSING_IMAGES_FILES_QUESTIONS_FOR_SAMUEL.md`
- `assets/swag/final/`

## Current Website Findings

- The website already had a Guests / Namecards section sourced from the approved lanyards workbook.
- The active visual guide was still using the older labels: Oatmeal, Ochre, Black, Blue, and Sage.
- The final uploaded separate lanyard images already existed in `assets/swag/final/`.
- Guest records in `content.json` do not currently include per-person lanyard colour assignments; group meanings remain unconfirmed.
- The merchandise reference shows a dark/navy example for Other, but the latest instruction says the live guide should use five colours only: Black, Brown, Blue, Green, and Oatmeal.

## Source Notes

- The workbook contains the approved safe guest/namecard master list. The `LANYARDS` sheet has no usable colour assignment rows in the accessible workbook.
- The live site should not use full PDF/deck screenshots as final lanyard visuals because separate uploaded lanyard image assets exist.
- Brown is mapped to the uploaded file `assets/swag/final/lanyard-ochre.png`.
- Green is mapped to the uploaded file `assets/swag/final/lanyard-sage.png`.
- Oatmeal uses the existing plain oatmeal image: `assets/swag/final/lanyard-oatmeal.png`.

## Correction Required

- Update the live guide to show exactly five colour cards:
  - Black
  - Brown
  - Blue
  - Green
  - Oatmeal
- Link the guide to Guests / Namecards.
- Keep group meanings as `Group Meaning Needed`.
- Flag the dark/navy vs oatmeal discrepancy for confirmation instead of adding a sixth colour.
