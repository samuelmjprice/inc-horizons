# People Responsibility Correction Audit

Source of truth pass completed on 05 June 2026.

## Scope Checked
- Active website data in `content.json`.
- Rendering/source references in `script.js` where contact buttons and filters are generated.
- Existing reports and backup/source folders were treated as archive/source trace, not active website data.

## Occurrences Found And Actions
| Person / variant | Where found | Action taken | Needs confirmation |
| --- | --- | --- | --- |
| Samuel Price | Contacts, Staff Lists, Who Do I Call, Podcast, Call Sheet, Documents, Missing Files, schedule-related records | Updated contact email, WhatsApp number/link, technology wording, and contact button data. | No |
| Liz Morris / Liz | Contacts, Staff Lists, Guests, Schedule, Tasks, Rehearsals, Call Sheet, Location Schedules, Speaker Content and related active text | Removed from active contact/staff/guest arrays. Active role references moved to Pili Lopez. | Confirm whether any archive references should remain admin-only. |
| Pili Lopez | Contacts, Staff Lists, Guests, Travel, Schedule, Tasks, Location Schedules, responsibility references | Confirmed as International Collective / I.N.C, 08 June arrival, and active handover owner for the previous content producer / production admin role. | Confirm exact inherited role scope. |
| Poppy Luck | Guests, Staff Lists, Travel, Schedule, Aream & Co. references | Kept under Aream & Co.; corrected Sunday 7 June arrival-with-Eve references where Pili was incorrectly shown. | No |
| Ben variants | Contacts, Staff Lists, Guests, Schedule, Suppliers, Restaurant Schedules, Location Schedules, Documents | Standardised active display to Ben Eddon-Carruthers and Ben@be-good.co.uk where Ben appears. | Confirm whether company label should be Be Good globally or only for Ben. |
| Kelechi Nwanokwu | Not present before this pass | Added safe contact placeholder, staff placeholder, guest/namecard-safe record, travel records, and responsibility handover references for old Pili owner paths. | Email Needed; Company Needed; exact responsibility list needed. |

## Active Data Result
- No active `content.json` occurrences of `Liz Morris`, standalone active `Liz`, `Ben Eden`, `Ben@b-good`, old Samuel phone/link, or sensitive Kelechi booking/private data remain.
- Old report/backups may still mention historical values as source trace.
