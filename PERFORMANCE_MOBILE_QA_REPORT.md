# Performance Mobile QA Report

Date: 2026-06-04

## Fixes Applied
- Heavy admin and long menu sections use `content-visibility: auto` on mobile.
- HORIZONS Hall mobile selector avoids rendering/scrolling through clipped tab controls.
- Round Table editor continues to show one selected table rather than all 90 seats open.
- Seat fields are rendered only for the active seat editor.

## Preserved
- Existing image lazy-loading remains.
- Existing data and backend calls were not expanded.

## Remaining
- Larger future improvement: avoid rendering hidden admin data until Admin is opened.
- Larger future improvement: generate real thumbnails for any oversized galleries.
