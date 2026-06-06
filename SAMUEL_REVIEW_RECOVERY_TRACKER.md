# Samuel Review Recovery Tracker

Recovery pass date: 6 June 2026

Source used: Samuel's pasted review transcript in the current Codex thread. `Pasted text.txt` was requested but was not present locally, so the pasted transcript is treated as the source of truth.

## Fixed

| Area | Samuel note | Outcome |
| --- | --- | --- |
| Today / updates | Archived updates still show with no delete option | Added `Delete archived update` for archived local update history. Source records are not silently deleted. |
| Updates workflow | Need a Confirmed toggle | Added `Mark Confirmed` beside `Mark Resolved` and `Archive` in update modules. |
| Slack wording | Remove HORIZONS test-channel wording from team-facing forms | Removed the test-mode copy branch from the active update form. Forms now show the suggested channel and allow changes. |
| Red Flags | Remove resolved/confirmed items from active leadership view | Active Red Flags now filter out resolved, confirmed, archived and not-needed records. |
| Red Flags | Need Add Red Flag card | Added a local Add Red Flag panel with local persistence and a backend-needed note. |
| Decisions | Remove completed decision cards | Active Decisions now filter out resolved, confirmed, archived and not-needed records. |
| Decisions | Need Add Decision card | Added a local Add Decision panel with local persistence and a backend-needed note. |
| Capture Log | Need delete button | Added `Delete log` for local capture log entries. Source capture records are retained. |
| Missing Files | Remove items Samuel marked done | Marked done placeholders resolved: StudioBinder, current production sheet, weather sheet, final master schedule, Ben's document, production hierarchy, crew call sheet, speaker list/bios/descriptions and rehearsal schedules. |
| Missing Files | Keep Cvent export if still relevant | Kept `Cvent agenda export` active as File Needed. Other Cvent comparison placeholders were resolved. |
| HORIZONS Hall files | Updated table layout from Kirsty appears but is done | Marked the table layout missing action resolved and removed the action-needed card from active Hall files. |
| Documents / Links | Non-file placeholders appearing in Documents | Documents now render only live records. Known resolved placeholders and obvious non-file/person records are hidden from live display. |
| Documents / Links | Open reference should open in a new tab | Verified active document links use `target="_blank"` and `rel="noopener noreferrer"`. |
| People | Eve Dusek and Dawn Ramsden should be Leadership | Updated both active contact records to Leadership. |
| Samuel Price | Remove old clutter and keep Technology responsibility clean | Samuel remains International Collective / I.N.C with the correct title, contact details, Podcast Lead and Technology escalation wording. |
| Schedule / Podcast | Subject 2/3/4 labels are unclear | Marked Subject 2/3/4 schedule/task/content records as `Needs Clarification` with notes for Samuel/Chris review. |
| Artwork / Wayfinding | People/menu/schedule items should not be artwork files | Archived obvious non-artwork records from live artwork/signage data where present. |
| Lanyards | Group Meaning Needed should not be main label | Existing live guide mapping remains: Black = Aream & Co, Brown = Crew, Blue = PC & console, Green = mobile consumer, Oatmeal = other. |
| Cache bust | Need latest deployment/build update | Updated app cache bust string to `20260606-samuel-recovery1`. |

## Already Done And Verified

| Area | Verification |
| --- | --- |
| Ibiza time | Call sheet uses `Europe/Madrid` timezone logic for current event time. |
| Search behaviour | Existing Ask/search implementation uses a results panel and no longer uses homepage search as a destructive global filter. |
| Homepage/section jumps | Existing `scrollToSectionTarget` logic handles sticky-header offset and section targets. |
| Print call sheet | Per-day call sheet has `Print Call Sheet` and `Copy Slack Summary` controls. |
| BeGood display | Existing display normalisation maps B Good / Be Good to BeGood without changing `@be-good.co.uk` email domains. |
| Attendee directory | Previously imported as safe internal records; no DOB/PNR/passport fields were added by this pass. |

## Moved To WHAT_WE_NEED_FROM_TEAM.md

| Item | Why |
| --- | --- |
| Confirm exact hospital / emergency route | Samuel said the hospital still needs writing down. This should be one canonical emergency record, not repeated across multiple cards. |
| Confirm nearby pharmacy | Samuel requested a pharmacy reference for the area. |
| Confirm generic Subject 2/3/4 podcast arrival labels | These labels cannot be safely guessed. |
| Confirm final speaker deck files and speaker notes | Transcript says speaker decks are not done and speaker notes are uncertain. |

## Needs Samuel / Chris Confirmation

| Item | Reason |
| --- | --- |
| Exact hospital/clinic name, address, route and phone | Still unknown. |
| Nearby pharmacy name, address, opening hours and map link | Still unknown. |
| Subject 2 / Subject 3 / Subject 4 final guest names or intended labels | Source records are generic. |
| Kelechi email/contact and final team label | Still marked missing where not confirmed. |
| HORIZONS Hall logo source if still rendering incorrectly in Programme | Needs the final logo file if the existing asset is not the intended one. |

## Unsafe To Change Without Approval

| Item | Reason |
| --- | --- |
| Delete source records permanently | Recovery pass only hides/archives active display records; source history is retained. |
| Convert local add-card workflows into shared edits | Requires backend/shared storage and permission model. |
| Guess ambiguous schedule/person records | Could create wrong onsite instructions. |

