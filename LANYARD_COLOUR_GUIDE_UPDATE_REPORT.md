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
| Black | Aream & Co | `assets/swag/final/lanyard-black.png` | Confirmed |
| Brown | Crew | `assets/swag/final/lanyard-ochre.png` | Confirmed |
| Blue | PC & console | `assets/swag/final/lanyard-blue.png` | Confirmed |
| Green | mobile consumer | `assets/swag/final/lanyard-sage.png` | Confirmed |
| Oatmeal | other | `assets/swag/final/lanyard-oatmeal.png` | Confirmed |

## Website Sections Updated

- Guests / Namecards
- Swag & Delivery / Visual References
- README source notes
- Missing confirmations tracker

## Meaning Update

- Samuel confirmed the operational meanings on 5 June 2026:
  - Black = Aream & Co
  - Brown = Crew
  - Blue = PC & console
  - Green = mobile consumer
  - Oatmeal = other
- Brown continues to use the uploaded ochre image asset.
- Green continues to use the uploaded sage image asset.
- Oatmeal is confirmed as `other` for the live site.

## QA

- `node --check script.js` passed.
- `python3 -m json.tool content.json` passed.
- Local mobile render at 390px passed.
- Lanyard guide is collapsed by default.
- Open guide shows exactly five cards: Black, Brown, Blue, Green, Oatmeal.
- No horizontal overflow detected in the local mobile check.
