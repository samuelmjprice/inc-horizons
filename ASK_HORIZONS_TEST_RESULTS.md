# Ask HORIZONS Test Results

## Automated validation
- JS syntax: passed with `node --check script.js`.
- JSON validation: passed with `python3 -m json.tool content.json`.
- Local mobile smoke test: passed. Ask drawer opened, `HORIZONS Hall` returned 30 results, result click closed the drawer and landed on `#locations`.

## Query expectations checked in implementation
| Query | Expected top matches | Status |
| --- | --- | --- |
| who do i call | Who Do I Call / contacts | Built-in match added |
| Samuel Price | Team Contacts / attendee-safe matches | Alias/search index added |
| call sheet | Today’s Call Sheet | Built-in match added |
| today | Today / Call Sheet | Built-in match added |
| HORIZONS Hall | Hall Control Centre / Round Table Plan | Built-in match added |
| round table | Round Table Plan | Alias added |
| theatre seating | Theatre Seating / Hall Control Centre | Alias added |
| menus | Menus / Restaurant Schedules | Built-in match added |
| gala dinner | Menus | Menu index added |
| print summary | Print Summary / Documents | Built-in match added |
| lanyard | Lanyard Colour Guide | Alias added |
| oatmeal | Lanyard Colour Guide via indexed colour data | Indexed |
| room drops | Room Drops | Alias/index added |
| NORD | General site index search | Indexed if present in source data |
| podcast | Podcast Schedule / Cliffhanger Mansion | Built-in match added |
| Cliffhanger Mansion | Locations / Podcast | Indexed |
| Pili | Pili Lopez | Alias added |
| Poppy | Poppy Luck | Alias added |
| Kelechi | Kelechi Nwanokwu | Alias added |
| BeGood | BeGood / Ben | Alias added |
| Starlink | Schedule/content if present | Indexed if present in source data |
| missing files | Missing Items / What We Need | Built-in match added |
| what do we still need | What We Need / Missing Items | Built-in match added |

## Manual QA still recommended
- Open the live site on mobile.
- Tap Ask HORIZONS.
- Run the test queries above.
- Confirm each Open button lands at the top of the intended section.
- Confirm the global bottom nav is hidden while Ask HORIZONS is open.
