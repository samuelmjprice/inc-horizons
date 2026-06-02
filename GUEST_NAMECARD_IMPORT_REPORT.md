# Guest Namecard Import Report

Date: 2 June 2026

## Source

- File imported: `/Users/ddm/Downloads/Lanyards and Namecards Final 9.xlsx`
- Sheet used: `MASTER LIST`
- Source columns: `BADGE NAME`, `Company Name`

## Import Summary

- Rows processed: 215
- Guest/namecard records added: 215
- Duplicate names found: 1
- Missing company values: 1
- Sensitive fields found in this workbook: No
- Sensitive fields imported: No
- Official Swag Delivery Brief correction removed attendee-level lanyard colour assignments because the PDF only confirms lanyard colour references, not group meanings.
- Current official lanyard references are Oatmeal, Ochre, Black, Blue, and Sage.
- Lanyard group meanings are marked `Group Meaning Needed` until Samuel/Chris/Aream confirm them.

## Sections Updated

- `content.json`: added canonical `guests` array.
- `index.html`: added `Guests / Namecards` section and nav link.
- `script.js`: added guest search, filters, summary cards, and compact cards.
- `style.css`: added mobile-friendly guest list/filter styles.

## Duplicate Names

- `ryan lowe` appears 2 times

## Top Companies By Count

- Aream & Co.: 31
- Clownfish: 12
- International Collective: 11
- be-good: 6
- Miniclip: 3
- Loom Games: 3
- Good Job Games: 2
- Playtika: 2
- JustPlay: 2
- MTG: 2
- TENSTACK: 2
- Adikteev: 2
- Uplift Games: 2
- Cascade Interactive: 2
- Edurino: 2
- Tencent Games: 2
- Kashkick & Besitos: 2
- Facepunch Studios: 2
- Behaviour Interactive: 2
- Everplay: 2

## Notes

The workbook does not include role/title, VIP/category, podcast, speaker, or status columns. Those fields were not invented. The website shows only safe lanyard/namecard fields and clear missing/confirmation labels.

The workbook also does not include a lanyard colour/group field. The website therefore shows official lanyard references only and does not assign lanyard meanings per guest.
