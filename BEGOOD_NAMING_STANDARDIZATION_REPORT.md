# BeGood Naming Standardization Report

Date: 5 June 2026

## Approved Display Name

- Company display name: `BeGood`
- Valid email domains were intentionally left unchanged, including `Ben@be-good.co.uk`.

## Files Updated

- `content.json`
- `script.js`
- `README.md`
- `MISSING_IMAGES_FILES_QUESTIONS_FOR_SAMUEL.md`

## Changes Made

- Replaced visible spaced legacy company display text with `BeGood`.
- Updated the Staff List category label to `BeGood`.
- Updated guest company display fields that were stored as lowercase `be-good` to `BeGood`.
- Updated the missing-questions tracker to mark BeGood spelling as confirmed and added to the website.

## Preserved

- Email addresses and domains were not renamed to match the display name.
- Source/history files in old backup folders were not rewritten.

## QA

- `node --check script.js` passed.
- `python3 -m json.tool content.json` passed.
- Active website files no longer contain visible spaced legacy company display strings.
