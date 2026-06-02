# SWAG Image Diagnostic Report

Date: 2026-06-02

Official source: `HORIZONS_Swag_Delivery_Brief (3).pdf`

## Diagnosis Summary

The image issue is not primarily a deployment or browser cache problem. The live site is loading the updated JavaScript and CSS, but `content.json` still points many swag records at a mixed set of old standalone assets and PDF page/grid screenshots.

The result is that some sections look cleaner structurally, but the product-level image mapping is still wrong. In particular, the NORD fragrance records use old standalone files (`cent.jpeg` and `cent-2.jpeg`) instead of individual crops from official PDF page 10.

## Current Active Image Sources

### HORIZONS House / Reception Display

Current paths:

- `assets/images/swag/horizons-house-display-cabinet-reference.jpg`
- `assets/images/swag/horizons-house-swag-reference-grid.jpg`
- `assets/images/swag/hats.jpeg`
- `assets/images/swag/hats-2.jpeg`
- `assets/images/swag/hats-3.jpeg`

Assessment:

- `horizons-house-display-cabinet-reference.jpg` is a generated PDF page/reference crop.
- `horizons-house-swag-reference-grid.jpg` is a page/grid reference, not an individual item image.
- `hats.jpeg`, `hats-2.jpeg`, and `hats-3.jpeg` are older standalone assets that visually correspond to PDF page 12, but were not systematically stored as page-sourced crops.

### Room Drops

Current paths:

- `assets/images/swag/room-drop-brief-reference.jpg`
- `assets/images/swag/room-drop-items-reference-grid.jpg`
- `assets/images/swag/bag.jpeg`
- `assets/images/swag/bottle.jpeg`
- `assets/images/swag/charger.jpeg`
- `assets/images/swag/cent-2.jpeg`
- `assets/images/swag/cent.jpeg`
- `assets/images/swag/massage-gun.jpeg`
- `assets/images/swag/eye-mask-1.jpeg`
- `assets/images/swag/eye-mask-2.jpeg`

Assessment:

- `room-drop-brief-reference.jpg` and `room-drop-items-reference-grid.jpg` are full-page/grid references, not item images.
- `bag.jpeg`, `bottle.jpeg`, `charger.jpeg`, `massage-gun.jpeg`, `eye-mask-1.jpeg`, and `eye-mask-2.jpeg` are older standalone assets.
- `cent-2.jpeg` and `cent.jpeg` are not crops from official PDF page 10. They are large standalone image files and should be replaced with PDF page 10 crops.

### Chair Drop

Current paths:

- `assets/images/swag/horizons-connect-chair-drop-brief.jpg`
- `assets/images/swag/chair-drop-items-reference-grid.jpg`
- `assets/images/swag/fan.jpeg`
- `assets/images/swag/book.jpeg`
- `assets/images/swag/pen.jpeg`

Assessment:

- `horizons-connect-chair-drop-brief.jpg` and `chair-drop-items-reference-grid.jpg` are page/grid references.
- `fan.jpeg`, `book.jpeg`, and `pen.jpeg` are older standalone assets rather than explicit crops from official PDF page 11.

### Lanyards

Current paths:

- `assets/images/swag/lanyard-oatmeal.jpeg`
- `assets/images/swag/lanyards-reference-grid.jpg`

Assessment:

- `lanyard-oatmeal.jpeg` is an older standalone lanyard asset.
- `lanyards-reference-grid.jpg` is reused for Ochre, Black, Blue, and Sage. This is the core mapping problem: four separate lanyard records are all pointing to one grid image instead of individual colour crops from PDF page 13.

## Source Page Map

- Page 4: Reception Display Cabinet
- Page 10: Room Drop item images
- Page 11: Chair Drop item images
- Page 12: HORIZONS House cap/display images
- Page 13: Lanyard images

## NORD Fragrance Finding

Current NORD paths:

- NORD Day Fragrance: `assets/images/swag/cent-2.jpeg`
- NORD Night Fragrance: `assets/images/swag/cent.jpeg`

Finding:

These are not crops from official PDF page 10. They are standalone 3024 x 4032 files from an older asset pass. They should be replaced by:

- `assets/swag/pdf-extracted/room-drop-nord-day-fragrance.jpg`
- `assets/swag/pdf-extracted/room-drop-nord-night-fragrance.jpg`

## Full-Page / Grid Screenshots In Active Display

The site is currently using some full-page or grid reference images in active galleries:

- `assets/images/swag/room-drop-brief-reference.jpg`
- `assets/images/swag/room-drop-items-reference-grid.jpg`
- `assets/images/swag/horizons-connect-chair-drop-brief.jpg`
- `assets/images/swag/chair-drop-items-reference-grid.jpg`
- `assets/images/swag/horizons-house-swag-reference-grid.jpg`
- `assets/images/swag/lanyards-reference-grid.jpg`

These can be kept only as source/archive references, not as active product item images.

## Cache / Deployment Finding

The last deployment was loading the updated `style.css` and `script.js` cache version, so the remaining image mismatch is not mainly stale browser cache. The active data still points to old paths. New extracted image paths should use fresh filenames under `assets/swag/pdf-extracted/`, which will naturally avoid old browser image cache.

## Visual Image Mapping Table

| Website Item | Current Website Image Path | Correct PDF Page | Correct Crop Needed | Status | Action |
| ------------ | -------------------------- | ---------------- | ------------------- | ------ | ------ |
| Tote Bag | `assets/images/swag/bag.jpeg` | Page 10 | `room-drop-tote-bag.jpg` | Old standalone asset | Replace active path |
| LARQ Bottle | `assets/images/swag/bottle.jpeg` | Page 10 | `room-drop-larq-bottle.jpg` | Old standalone asset | Replace active path |
| Foldable Charger | `assets/images/swag/charger.jpeg` | Page 10 | `room-drop-foldable-charger.jpg` | Old standalone asset | Replace active path |
| NORD Day Fragrance | `assets/images/swag/cent-2.jpeg` | Page 10 | `room-drop-nord-day-fragrance.jpg` | Wrong source | Replace active path |
| NORD Night Fragrance | `assets/images/swag/cent.jpeg` | Page 10 | `room-drop-nord-night-fragrance.jpg` | Wrong source | Replace active path |
| Pulsio Massager | `assets/images/swag/massage-gun.jpeg` | Page 10 | `room-drop-pulsio-massager.jpg` | Old standalone asset | Replace active path |
| Silk Eye Mask | `assets/images/swag/eye-mask-2.jpeg` | Page 10 | `room-drop-silk-eye-mask.jpg` | Old standalone asset | Replace active path |
| Silk Eye Mask Packaging | `assets/images/swag/eye-mask-1.jpeg` | Page 10 | `room-drop-silk-eye-mask-packaging.jpg` | Old standalone asset | Replace active path |
| Reception Display Cabinet | `assets/images/swag/horizons-house-display-cabinet-reference.jpg` | Page 4 / Page 12 | `horizons-house-reception-display-cabinet.jpg` | Page/reference crop | Replace with clean crop |
| Caps Stone / Black | `assets/images/swag/hats.jpeg` | Page 12 | `horizons-house-caps-stone-black.jpg` | Old standalone asset | Replace active path |
| Cap Mockup Olive | `assets/images/swag/hats-2.jpeg` | Page 12 | `horizons-house-cap-olive.jpg` | Old standalone asset | Replace active path |
| Cap Mockup Black | `assets/images/swag/hats-3.jpeg` | Page 12 | `horizons-house-cap-black.jpg` | Old standalone asset | Replace active path |
| Hand Fan | `assets/images/swag/fan.jpeg` | Page 11 | `chair-drop-hand-fan.jpg` | Old standalone asset | Replace active path |
| HORIZONS Notepad | `assets/images/swag/book.jpeg` | Page 11 | `chair-drop-horizons-notepad.jpg` | Old standalone asset | Replace active path |
| HORIZONS Pen | `assets/images/swag/pen.jpeg` | Page 11 | `chair-drop-horizons-pen.jpg` | Old standalone asset | Replace active path |
| Lanyard Oatmeal | `assets/images/swag/lanyard-oatmeal.jpeg` | Page 13 | `lanyard-oatmeal.jpg` | Old standalone asset | Replace active path |
| Lanyard Ochre | `assets/images/swag/lanyards-reference-grid.jpg` | Page 13 | `lanyard-ochre.jpg` | Grid image reused | Replace active path |
| Lanyard Black | `assets/images/swag/lanyards-reference-grid.jpg` | Page 13 | `lanyard-black.jpg` | Grid image reused | Replace active path |
| Lanyard Blue | `assets/images/swag/lanyards-reference-grid.jpg` | Page 13 | `lanyard-blue.jpg` | Grid image reused | Replace active path |
| Lanyard Sage | `assets/images/swag/lanyards-reference-grid.jpg` | Page 13 | `lanyard-sage.jpg` | Grid image reused | Replace active path |

## Fix Plan

1. Extract individual product crops from official PDF pages 4, 10, 11, 12, and 13.
2. Save them under `assets/swag/pdf-extracted/`.
3. Create a visual proof sheet showing every extracted crop and source page.
4. Update `content.json` active references to the extracted product images.
5. Remove full-page/grid images from active product galleries.
6. Keep old assets in place but document them as inactive/replaced.

## Fix Applied

Status: Applied on 2026-06-02.

- Created 20 individual PDF-derived crops in `assets/swag/pdf-extracted/`.
- Created `SWAG_IMAGE_PROOF_SHEET.md` and `SWAG_IMAGE_PROOF_SHEET.html`.
- Created a quick visual proof sheet image at `assets/swag/pdf-extracted/swag-image-proof-sheet.jpg`.
- Updated active `content.json` references for Room Drops, HORIZONS House / Reception Display, HORIZONS Connect Chair Drop, and Lanyards.
- Removed old page/grid screenshots from active product galleries.
- Updated cache/version strings to `20260602-swag-image-crops1`.
