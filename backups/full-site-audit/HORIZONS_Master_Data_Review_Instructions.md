# HORIZONS Master Website Data Review Instructions

This document explains how to use `HORIZONS_Master_Website_Data_Review.xlsx`.

The workbook is the master review file for the current HORIZONS website data. It is designed for Samuel and Chris Manoe to go through the website information line by line, correct anything wrong, fill in missing information, attach or reference updated documents, and mark final answers as approved.

Codex should not use this workbook to update the live website until Samuel/Chris have filled it in and marked rows as `Approved`.

## Where To Start

Start with the `MASTER REVIEW` tab.

That tab contains one canonical review row per important website item. If the same item appears in multiple website sections, it should appear once in `MASTER REVIEW` with the cross-used sections listed.

The most important tabs are:

1. `MASTER REVIEW`
2. `Human Confirmation`
3. `Schedule + Call Sheet`
4. `Podcast`
5. `Speaker Content`
6. `Artwork + Signage`
7. `Documents + Missing`
8. `Contacts + Who Calls`

## How To Fill It In

For each row:

1. Read the current website display.
2. Check whether it is correct.
3. If it is correct, set `Status` to `Approved`.
4. If it is wrong, write the corrected version in the green correction/final-answer columns.
5. If information is missing, add the answer if known.
6. If someone else needs to confirm it, write their name in `Who Should Confirm?`.
7. If a document or asset is needed, add the file/link in `Document / File Link` or `Final Link / File Location`.
8. If unsure, do not guess. Use `Needs Confirmation`.
9. Use `Approved` only when the answer is final and ready for the live website.

## Voice Note References

If Samuel/Chris answer by voice recording, write a reference in the `Voice Note Reference` column.

Examples:

- `Voice Note 1`
- `Chris Review Audio 01`
- `Timestamp 12:40`
- `See transcript line 18`

This lets Codex match spoken corrections to the right workbook row later.

## Attaching Documents

The workbook is Google Sheets compatible, so simple links are safest.

For documents/assets, add one of these:

- A local file path
- A Google Drive link
- A Dropbox/SharePoint link
- A clear note such as `File supplied separately: final menu PDF`

Use `File Needed`, `Link Needed`, `Image Needed`, or `Map Needed` if the item is still missing.

## Status Meanings

Use these statuses consistently:

- `Missing Data`: required information is absent.
- `Needs Confirmation`: likely information exists but is not final.
- `Waiting on Person`: someone specific needs to answer.
- `Answered`: an answer has been supplied but is not approved yet.
- `Approved`: ready for Codex to apply to the live website.
- `Added to Website`: Codex has applied it to the live website.
- `Not Needed`: no longer needed.
- `Conflict — Needs Review`: sources disagree and a human must decide.

## Why Cross-Used Items Are Not Repeated

Many website items appear in several places.

For example, a podcast item may appear in:

- Schedule
- Podcast
- Call Sheet
- Location Schedule
- Content Capture
- Slack alerts

The workbook asks about that item once, then lists the other sections in `Cross-Used In` or `Cross-Used In Sections`. This prevents Samuel and Chris from answering the same question multiple times.

## How Codex Will Use This Later

After Samuel/Chris review the workbook:

1. Give Codex the completed workbook.
2. Include any referenced voice notes or transcripts.
3. Include any linked or newly supplied files/assets.
4. Codex will read only rows marked `Approved` unless instructed otherwise.
5. Codex will update `content.json`, website records, docs, and the live website from those approved rows.
6. Codex will then mark applied rows as `Added to Website` where appropriate.

## Important Rule

This workbook is for review. It does not update the website by itself.

Do not delete source information. Do not guess. Mark unresolved items clearly.
