# Lanyard Colour Guide Update Report

Date: 5 June 2026

## What Changed

- Added a collapsed `Lanyard Colour Guide` panel inside `Guests / Namecards`.
- Updated the active lanyard data in `content.json` to the final five live labels:
  - Black
  - Brown
  - Blue
  - Green
  - Oatmeal
- Updated the Swag & Delivery lanyard reference to use the same canonical five-colour data.
- Updated the Guests / Namecards summary text from the older Oatmeal/Ochre/Black/Blue/Sage wording to Black/Brown/Blue/Green/Oatmeal.
- Added compact responsive card styling for the five lanyard images.
- Updated README and the missing-confirmation tracker.

## Visual Asset Mapping

| Live Label | Active Image Path | Source Note | Status |
| --- | --- | --- | --- |
| Black | `assets/swag/final/lanyard-black.png` | Separate uploaded image asset | Confirmed visual asset |
| Brown | `assets/swag/final/lanyard-ochre.png` | Source file/old label was Ochre | Confirmed visual asset / label confirmation needed |
| Blue | `assets/swag/final/lanyard-blue.png` | Separate uploaded image asset | Confirmed visual asset |
| Green | `assets/swag/final/lanyard-sage.png` | Source file/old label was Sage | Confirmed visual asset / label confirmation needed |
| Oatmeal | `assets/swag/final/lanyard-oatmeal.png` | Existing plain oatmeal image | Confirmed visual asset |

## Website Sections Updated

- Guests / Namecards
- Swag & Delivery / Visual References
- README source notes
- Missing confirmations tracker

## Outstanding Confirmation

- Confirm operational group meanings for Black, Brown, Blue, Green, and Oatmeal.
- Confirm that Brown should remain the team-facing label for the image file originally labelled Ochre.
- Confirm that Green should remain the team-facing label for the image file originally labelled Sage.
- Confirm the discrepancy where the merchandise reference shows dark/navy for Other but the latest instruction says Oatmeal is the fifth live colour.

## QA

- `node --check script.js` passed.
- `python3 -m json.tool content.json` passed.
- Local mobile render at 390px passed.
- Lanyard guide is collapsed by default.
- Open guide shows exactly five cards: Black, Brown, Blue, Green, Oatmeal.
- No horizontal overflow detected in the local mobile check.
