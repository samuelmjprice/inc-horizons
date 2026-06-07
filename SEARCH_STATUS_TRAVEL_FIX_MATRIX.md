| Issue | Source | Current State | Fix Required | Status | Files Changed | QA Result |
| ----- | ------ | ------------- | ------------ | ------ | ------------- | --------- |
| Search cannot handle full names with spaces | Review notes | Input state trimmed each keystroke and no scoped normalization | Preserve raw input; normalize copy for matching | Fixed | script.js | `Samuel Price`, `Chris Manoe`, `Kelechi Nwanokwu` supported |
| Ask HORIZONS search cannot handle full names with spaces | Review notes | Same shared search path | Preserve raw input and use shared scoped search | Fixed | script.js | Ask input no longer mutates typed spaces |
| Search results need clearer category labels | Review notes | Section/status only | Add category chip where available | Fixed | script.js | Result cards show section, category and status |
| Search category/scope missing | Review notes | All results mixed | Add All/People/Call Sheet/Schedule/Locations/Menus/Travel/Accommodation/etc. | Fixed | index.html, script.js | Search Hub and Ask HORIZONS have scope selectors |
| Status changes do not update sitewide | Review notes | Local override first | Attempt shared update save and re-render canonical ID | Fixed | script.js | Shared save attempted; fallback visible in update log |
| Status changes do not persist across devices | Review notes | Backend failures silently became local | Save to backend when configured; warn if not synced | Fixed | script.js | Failure path records `Could not sync. Try again.` |
| Schedule still shows Needs Confirmation | Review notes | Active schedule defaults varied | Confirm actual schedule records; preserve missing/admin items | Fixed | content.json | Active schedule records updated |
| Call Sheet still shows Needs Confirmation | Review notes | Daily call sheets not globally confirmed | Mark call sheets Confirmed | Fixed | content.json | Call sheet day records confirmed |
| Locations still show Needs Confirmation | Review notes | Event locations mixed status | Confirm event locations; leave emergency/pharmacy unresolved | Fixed | content.json | Location cards updated |
| Master flights workbook needs importing | Workbook | Old travel placeholders active | Replace active travel with master Flights safe rows | Fixed | content.json | 22 safe records imported |
| Duplicate Eve/Poppy flight records | Review notes | Old cards and summary text active | Archive/neutralize superseded records | Fixed | content.json | Active duplicate cards removed from live item set |
| Incorrect flight records for non-flyers | Review notes | Chris placeholder existed | Master workbook becomes active source | Fixed | content.json | Chris active flight removed |
| First-night offsite accommodation | Workbook Hizon | Not represented as master rooming | Add accommodation list and Barcelo location | Fixed | content.json, index.html, script.js | 21 safe accommodation records imported |
| No private workbook fields displayed | Workbook | Source has private/commercial fields | Filter import to safe display fields only | Fixed | content.json | Active travel/accommodation excludes private columns |
| Kelechi company correction | Review notes | Company Needed/Clownfish in places | Set to International Collective / I.N.C where team-facing | Fixed | content.json | Contact/travel/accommodation corrected |
