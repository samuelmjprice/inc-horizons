# CODEX Completion Matrix

Status key: Complete, Partially Complete, Not Started, Blocked, Needs Human Confirmation, Ready for Deploy, Local Only / Not Live.

| Requirement | Status | Evidence / File | Notes | Next Action |
| ----------- | ------ | --------------- | ----- | ----------- |
| Dedicated Call Sheet | Ready for Deploy | `index.html`, `script.js`, `content.json` | Separate top-level section with day tabs, summary, emergency info, schedule, notes, red flags, missing files, print and copy actions. | Push or manually deploy ZIP. |
| Weather module | Ready for Deploy | `script.js`, `content.json` | Open-Meteo live weather with local cache and graceful fallback. | Confirm live after deploy. |
| Emergency / hospital info | Needs Human Confirmation | `content.json` | Placeholder `Nearest Hospital — Needs Confirmation` plus Google Maps search fallback. | Confirm exact hospital, address, route, phone, venue emergency contact. |
| Google Maps links | Partially Complete | `content.json`, `script.js` | Location records support addresses, maps URLs, and placeholders. | Add exact internal venue pins where missing. |
| Data Health Dashboard | Ready for Deploy | `index.html`, `script.js`, `DATA_HEALTH_DASHBOARD.md` | Admin dashboard metrics created. | Push or manually deploy ZIP. |
| Duplicate Review | Ready for Deploy | `index.html`, `script.js`, `DUPLICATE_REVIEW.md` | Review section created with no silent merges. | Continue human review for uncertain names. |
| Site Data & UX Audit | Ready for Deploy | `SITE_DATA_UX_AUDIT.md`, `index.html`, `script.js` | Audit section and report created. | Keep updated after future imports. |
| Brand pass | Partially Complete | `style.css`, `index.html` | Logo, warm palette, soft cards, status chips, and premium layout reinforced. | Final live visual QA after deploy. |
| Centred logo | Ready for Deploy | `index.html`, `style.css` | Hero, call sheet, and footer logo wrappers are centered. | Confirm live after deploy/cache clear. |
| Mobile view | Ready for Deploy | Local Playwright test from prior pass | 390px viewport passed without horizontal overflow before this packaging pass. | Re-test after final package. |
| Navigation hierarchy | Partially Complete | `index.html`, `script.js` | Call Sheet, Contacts, Who Do I Call, admin sections are top-level. | Future pass can group nav into collapsible clusters. |
| Summary-first/detail-second layout | Partially Complete | `script.js` | Call sheet, locations, suppliers, content capture, materials, and admin sections use card/detail patterns. | Continue compacting any long imported lists. |
| Search/filtering | Complete | `script.js`, `index.html` | Global search and section filters remain in place. | Retest after deploy. |
| Smart display rules | Partially Complete | `script.js`, `content.json` | Red flags, missing files, call sheet day tabs, updates, weather fallback, and Slack pending states are smart-displayed. | Backend needed for shared comments and true Slack state. |
| Today at a Glance | Ready for Deploy | `script.js`, `content.json` | Uses event day/current period style summary with quick links. | Confirm live date/time behavior after deploy. |
| Red Flags | Ready for Deploy | `content.json`, `script.js` | Open issues remain visible and Slack-copy ready. | Human-confirm unresolved conflicts before marking resolved. |
| Who Do I Call | Ready for Deploy | `content.json`, `index.html`, `script.js` | Problem-type escalation section exists and is linked from Contacts/Call Sheet. | Verify all phone numbers with team. |
| Contacts | Ready for Deploy | `content.json`, `script.js` | Required known contacts are present with call/WhatsApp actions where available. | Fill Slack handles/user IDs after Slack setup. |
| Daily Schedule | Ready for Deploy | `content.json`, `script.js` | Daily schedule/run sheet remains available. | Continue sync from workbook as source changes. |
| Location Schedules | Partially Complete | `content.json`, `script.js` | Location cards support per-location schedule and map fields. | Add exact venue pins and internal setup details. |
| Restaurant Schedules | Partially Complete | `content.json`, `script.js` | Restaurant data model/view exists. | Confirm final menus and meal-space data. |
| Suppliers | Ready for Deploy | `content.json`, `script.js` | Compact supplier summary/detail pattern exists. | Confirm remaining supplier timing TBCs. |
| Podcast-only schedule | Partially Complete | `content.json`, `script.js` | Podcast view/data exists with Samuel Price as lead where sourced. | Confirm final podcast schedule/guests. |
| Entertainment section | Partially Complete | `content.json`, `script.js` | Performer records/view exist. | Confirm uncertain spellings, riders, arrival and sound check times. |
| Curated Playlists | Partially Complete | `content.json`, `script.js` | Playlist section/model exists. | Add actual playlist links and start/stop ownership. |
| Content Capture | Ready for Deploy | `content.json`, `script.js` | Compact cards and dismiss/updates workflow are present locally. | Backend needed for shared update state. |
| Speaker Content | Partially Complete | `content.json`, `script.js` | Data model/section exists with missing-file placeholders. | Add final speaker copy, bios, deck text. |
| Rehearsals | Partially Complete | `content.json`, `script.js` | Rehearsal records/model exist. | Confirm rehearsal timings/required people. |
| Artwork / Wayfinding / Signage | Partially Complete | `content.json`, `script.js`, assets | Section supports placement/file/status fields and uploaded references. | Add final artwork and placement map. |
| Guest Materials & Experience | Ready for Deploy | `content.json`, assets | Tote bag, crew shirts, signage, swag, room drops, and placeholders included. | Add missing final print files as provided. |
| Documents / Links | Ready for Deploy | `content.json`, assets/documents | Document library includes uploaded source docs and placeholders. | Replace placeholders with final files. |
| Missing Files | Ready for Deploy | `content.json`, `script.js` | Missing files tracker is grouped and visible. | Team to resolve listed missing assets. |
| Cvent Comparison | Partially Complete | `content.json`, `script.js` | Comparison/review layer exists as a placeholder workflow. | Add Cvent exports before comparison can complete. |
| Decisions | Ready for Deploy | `content.json`, `script.js` | Decisions section remains available. | Keep unresolved items open. |
| Staff Lists | Partially Complete | `content.json`, `script.js` | Staff model/section exists with known contacts. | Add Clownfish/INC/hotel staff lists. |
| Canonical data records | Partially Complete | `content.json`, `data-dictionary.md` | Data model fields documented; site mostly renders from `content.json`. | Normalize future imports into canonical IDs. |
| Source trace | Partially Complete | `content.json`, `data-dictionary.md` | Source/archive fields exist in exported data. | Add row-level source trace during next workbook import. |
| Master website data export | Complete | `HORIZONS_FINAL_UPDATED_FILES_2026-05-29/HORIZONS_WEBSITE_DATA_EXPORT_UPDATED.json` | Export is copied from current `content.json`. | Refresh after every content update. |
| Contact data | Complete | `content.json`, final contact workbook | Required contacts are present. | Add Slack IDs after workspace creation. |
| Missing files tracker | Complete | `content.json`, final tracker workbook | Missing files are included in website data and final folder. | Team to resolve. |
| Record updates/comments | Partially Complete | `script.js`, `schemas/record-updates.schema.json` | Frontend supports update metadata, Slack checkbox, local fallback. | Connect shared backend. |
| Backend/API persistence for comments | Local Only / Not Live | `backend/serverless/updates.mjs`, `api/updates/` | Backend scaffold exists but GitHub Pages cannot run it. | Deploy to serverless host/database. |
| Slack activity log | Local Only / Not Live | `script.js`, `schemas/slack-activity-log.schema.json`, backend scaffold | Frontend queues local activity; backend schema/scaffold created. | Connect database and Slack endpoint. |
| Slack environment variable placeholders | Complete | `SLACK_ENVIRONMENT_VARIABLES.md`, `slack-channel-map.json` | Required variables documented. | Add real values in hosting provider only. |
| Git commit | Complete | `git log` | Commit `7f226c0` contains the first local pass. | Commit this packaging/backend pass next. |
| Git push | Blocked | Git remote/SSH auth | Local branch ahead of origin; push rejected by SSH key. | Add SSH key or use PAT, then `git push origin main`. |
| Live deployment | Blocked | GitHub Pages deploy depends on push | Live site is not updated by local changes yet. | Push or manually upload ZIP. |
| Live browser test | Blocked | Live site not updated | Local testing passed; live needs deployed code. | Test `https://inc-horizons.com/` after deploy. |
| Backup | Complete | `/Users/ddm/Desktop/Chris Manoe/INC-Horizons Website/HORIZONS_BACKUP_2026-05-29_1415/`, `/Users/ddm/Desktop/Chris Manoe/INC-Horizons Website/HORIZONS_BACKUP_2026-05-29_1440/` | Backups exist before and after the major pass. | Keep backup folders read-only. |
| ZIP fallback | Ready for Deploy | `inc-horizons-website-update-2026-05-29.zip` | Manual deployment package created because push is blocked. | Upload ZIP contents to GitHub repo if SSH/PAT is not fixed. |
