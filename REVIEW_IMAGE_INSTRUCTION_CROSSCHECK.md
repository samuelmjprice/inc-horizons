# Review Image + Instruction Cross-Check

Date: 6 June 2026

Source inputs:
- Samuel review transcript pasted in the current Codex thread.
- Numbered screenshots in `/Users/ddm/Downloads/REVIEW IMAGES/REVIEW IMAGES 1.png` through `REVIEW IMAGES 46.png`.
- Latest pushed recovery commit: `d7b618f Complete Samuel review recovery fixes`.

Contact sheets generated for review:
- `review-image-contact-sheets/review_images_1_16.jpg`
- `review-image-contact-sheets/review_images_17_32.jpg`
- `review-image-contact-sheets/review_images_33_46.jpg`

## Cross-Check Table

| Image | Section shown | Samuel instruction / issue | Current outcome |
| --- | --- | --- | --- |
| 1 | Today / What Matters Now | Buttons too close to cards; unresolved history needs delete after archive | Partially fixed. Archived local updates now have `Delete archived update`. Spacing remains covered by global CSS, needs final visual browser QA. |
| 2 | Red Flags | Spacing issues; remove unknown initials, hospital route, podcast slot, casino/chairs if resolved | Fixed in active data. Those complaint cards are archived/filtered from active Red Flags. |
| 3 | Decisions Needed | Spacing around status chips; remove completed podcast/Slack/Cvent decisions; add decision card | Fixed functionally. Completed decisions are filtered from active view and local `Add Decision Needed` panel was added. Spacing needs visual browser QA. |
| 4 | Call Sheet | Highlighted tags/buttons spacing issue | Partially fixed via global tag/card CSS. Needs visual browser QA for exact layout. |
| 5 | Call Sheet linked menus / file needed | Linked menu and file-needed chips spacing issue | Partially fixed via global tag/card CSS. Needs visual browser QA. |
| 6 | Call Sheet schedule cards | Needs Confirmation should be confirmable | Fixed functionally. Update modules now include `Mark Confirmed`. |
| 7 | Call Sheet summary columns | File-needed/status chips repeating spacing issue | Partially fixed via global tag/card CSS. Needs visual browser QA. |
| 8 | Schedule | Open today's call sheet spacing; travel cross-check needed | Partially fixed. Navigation/cache fixes applied. Poppy/Pili travel rules were already in prior data pass; needs live browser spot check. |
| 9 | Schedule cards | RB/repeating text / dense card layout | Partially fixed. Generic ambiguous records are now marked `Needs Clarification`; exact visual spacing needs browser QA. |
| 10 | Schedule cards | Repeated dense owner/status chip alignment | Partially fixed via CSS and active-data cleanup; needs browser QA. |
| 11 | Schedule | `On site`, `Subject 2`, `Subject 3`, `Subject 4` unclear | Fixed safely. Subject 2/3/4 records are marked `Needs Clarification`; not guessed. Added to `WHAT_WE_NEED_FROM_TEAM.md`. |
| 12 | Day-specific focus | Date card alignment; day cards should match | Partially fixed through global card/header styles; needs final visual browser QA. |
| 13 | My Tasks | Ben/Chris cards and tags have spacing problems | Partially fixed through global status/tag CSS; needs final visual browser QA. |
| 14 | Locations | Needs Confirmation chip alignment, especially Six Senses / Reception | Partially fixed via global tag/card CSS. |
| 15 | Location schedules | Massive spacing issue when opened | Partially fixed through action/header CSS; needs browser QA. |
| 16 | HORIZONS Hall Control Centre | More / Call Sheet / Close alignment issue | Partially fixed by previous Hall centre layout work; needs live visual QA. |
| 17 | HORIZONS Hall Control Centre | White border/background artifact behind overview | Needs visual browser QA. No source-only confirmation possible from screenshot alone. |
| 18 | Round seating | Notes table font off-brand; remove `Updated by Codex` | Fixed/verified in source scan: active `Updated by Codex` text not found. Table layout styling still needs visual QA. |
| 19 | Hall Control Centre scroll | Content scrolls behind sticky tabs/header | Partially fixed by previous Hall scroll preservation/sticky work; needs live visual QA. |
| 20 | Locations | HORIZONS Hall control button should be clearer/higher; maps/location schedule button alignment | Partially fixed from previous pass; exact placement needs browser QA. |
| 21 | Locations | Tommy's Tunnel / Needs Confirmation spacing | Partially fixed via global tag/card CSS. |
| 22 | Locations | Nearest hospital repeated and spacing issue | Fixed in active Red Flags; hospital remains as a single team need. Needs final location-card scan for duplicates. |
| 23 | Location schedules | Open maps/location schedule buttons go funky after opening | Partially fixed through action row CSS; needs browser QA. |
| 24 | Location schedules | Repeated nearest hospital confirmation | Partially fixed. Emergency/hospital moved to `WHAT_WE_NEED_FROM_TEAM.md`; duplicate location display needs visual check. |
| 25 | Who Do I Call | Hashtag chips alignment issue | Partially fixed via tag-stack CSS; needs browser QA. |
| 26 | Who Do I Call | Photography word wraps badly | Partially fixed via global wrapping rules; needs browser QA. |
| 27 | Who Do I Call | Health & Safety word/tag wrapping issue | Partially fixed via global wrapping rules; needs browser QA. |
| 28 | Suppliers | BeGood / Clownfish spacing issue | Partially fixed via display normalization and CSS. Needs browser QA for exact wrapping. |
| 29 | Podcast / Programme | Programme layout is liked; reuse closed organized style | Already mostly done from prior pass: podcast/date cards are collapsed. |
| 30 | Speaker Content | HORIZONS Hall logo missing/rendering issue | Needs source/logo confirmation if still visually missing. Added as remaining item in recovery tracker. |
| 31 | Curated Playlists | Long title/status spacing issue | Partially fixed by global card/title/tag CSS; needs browser QA. |
| 32 | Capture Suggestions | Spacing issue | Partially fixed by CSS; status/update workflow present. |
| 33 | Capture Log | Needs delete button; log too long/hard to use | Fixed functionally for local logs: `Delete log` added. Further grouping by day/person/moment remains a future UX improvement. |
| 34 | Menus | Asset controls off-brand; date groups need open/close | Partially fixed in previous pass. Menu details support open/close; visual styling needs browser QA. |
| 35 | Lanyards / Swag | Image loading; lanyard meanings under cards | Verified source asset paths exist. Lanyard meaning helper maps Black=Aream & Co, Brown=Crew, Blue=PC & console, Green=mobile consumer, Oatmeal=other. |
| 36 | Swag delivery timeline | Date/table spacing touches edges | Partially fixed via global spacing; needs browser QA. |
| 37 | HORIZONS House gifts | Card spacing issues | Partially fixed via global card/action CSS; needs browser QA. |
| 38 | Swag shoot | Image loading issue | Verified source asset paths exist locally; browser refresh likely resolves. Needs live browser check if still intermittent. |
| 39 | Room Drops | Image loading issue | Verified source asset paths exist locally; needs live browser check if still intermittent. |
| 40 | HORIZONS House / Reception Display | Visual images not coming through | Verified referenced source asset paths exist locally; needs live browser check if still intermittent. |
| 41 | Artwork / Wayfinding / Signage | Spacing; remove Ben/Cheryl/non-artwork records | Fixed safely where records were present: obvious non-artwork/person records archived from live artwork/signage data. |
| 42 | Documents / Links | Spacing; open reference new tab | Open reference already uses new tab. Spacing partially fixed via global CSS. |
| 43 | Documents / Links | Breakfast, dinner, snacks, people should not be documents | Fixed safely. Obvious non-file operational/person records without links are hidden from live Documents. |
| 44 | Documents / Seating | Seating card spacing issue; more logos needed | Spacing partially fixed; extra logos remain a source-file upload/confirmation item if not present. |
| 45 | Missing Files Tracker | Remove done items; keep Cvent export; speaker decks/notes remain | Fixed. Done items marked `Resolved`; `Cvent agenda export`, speaker deck copy and speaker notes remain active. |
| 46 | Missing Files Tracker | Wayfinding spelling and spacing issues | Fixed spelling in data cleanup where present; spacing covered by CSS and needs browser QA. |

## What Is Definitely Fixed In Source

- Active Red Flags no longer show the completed podcast slot, unknown initials, 33 casino/poker chairs, or emergency/hospital route as active cards.
- Active Decisions no longer show completed podcast, Slack integration, or Cvent owner decisions.
- Missing Files no longer shows the done StudioBinder/current production/weather/final schedule/Ben/crew/speaker list/bios/rehearsal items as active.
- `Cvent agenda export`, speaker decks, and speaker notes remain active where Samuel said they may still be needed.
- Archived local updates can now be deleted.
- Local updates can be marked Confirmed, Resolved, Archived, or deleted once archived.
- Local Red Flag and Decision cards can be added.
- Local capture log entries can be deleted.
- Documents open references in a new tab.
- Cache bust strings now point at `20260606-samuel-recovery1`.
- All asset paths referenced in `content.json` exist locally.

## Still Needs Live Visual QA

The screenshot sheet is mostly layout/spacing feedback. Source fixes and CSS were applied, but a proper browser pass is still needed for:

- tag/chip spacing on mobile and desktop
- HORIZONS Hall Control Centre white-border artifact
- HORIZONS Hall Control Centre sticky scroll overlap
- exact button alignment in Locations and Location Schedules
- HORIZONS Hall logo rendering in Speaker Content / Programme
- intermittent image loading on the deployed site

## Important Note

Playwright was not available in the current Node runtime during the recovery pass, so browser QA was limited to local HTTP/source/asset checks. The next pass should use the in-app browser or an available Playwright install to visually verify the remaining spacing items against images 1-46.

