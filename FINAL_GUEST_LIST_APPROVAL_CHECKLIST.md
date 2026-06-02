# Final Guest List Approval Checklist

Date: 2 June 2026

Please answer/approve these before Codex imports the final guest list.

## Workbook Source

1. Is `SIX SENSES IBIZA ROOMING LIST .xlsx` the final approved guest list workbook?
2. If not, what is the exact final workbook filename/path?
3. Should `MASTER LIST` be used as the canonical guest source?
4. Should other sheets be used too, or only reviewed as admin/reference?

## Website Section

5. Should the website have a visible guest section?
6. Preferred section name:
   - `Guest List`
   - `Guests / Attendees`
   - `Attendees`
   - other?
7. Where should it sit in navigation?
   - People / Teams
   - Guest Experience
   - Admin-only

## Visible Fields

8. Which fields are safe to display to the team?
   - Name
   - Company
   - Role/title
   - Guest type
   - Sector
   - Track
   - Lanyard
   - Dinner routing
   - Registration status
   - Invite status
   - VIP status
   - Notes/status
9. Should guest emails be visible?
10. Should guest phone numbers be visible if they exist?
11. Should dietary requirements be visible?
12. Should arrival/departure status be visible?
13. Should travel flight details be visible?
14. Should room tiering be visible?
15. Should room allocation/hotel room details be visible?

## Sensitive Data

16. Confirm these should not be displayed anywhere team-facing:
   - passport details
   - DOB
   - nationality
   - visa details
   - frequent flyer numbers
   - PNRs
   - travel costs
   - hotel room allocation
   - private notes
17. Should sensitive fields be excluded entirely, or stored in an admin-only/private source?

## Cross-References

18. Should guests be linked to podcast slots?
19. Should guests be linked to speaker/session records?
20. Should guests be linked to travel records?
21. Should guests be linked to restaurant/dinner records?
22. Should guests be linked to room drops or guest materials?
23. Should guest data update call sheet notes/counts?
24. Should guest data update Cvent comparison records?

## Staff / Crew Rows

25. The `MASTER LIST` includes `Staff` and `Crew` registration types. Should these:
   - appear in the Guest List
   - update Staff Lists only
   - be shown in both with cross-links
   - be excluded from guest import?

## VIP / Private Guests

26. Should VIP status be visible to all team users?
27. Should any guests be marked private/admin-only?
28. Should leadership/client/VIP guests have special filters or tags?

## Replacement / Archive Rules

29. Should the final guest list replace old guest placeholders like `Subject 1`, `Subject 2`, etc.?
30. Should old guest-related schedule/travel/podcast placeholders be archived after import?
31. Should old Cvent/missing-file placeholders be marked resolved where this workbook supplies the data?

## Final Approval

32. Approved to create canonical `guests` data in `content.json`?
33. Approved to add a visible `Guests / Attendees` section?
34. Approved to update cross-references after preview?
35. Approved to deploy live after QA?

## Recommended Default Approval

If Samuel/Chris want the safest first pass, approve this:

- Use `MASTER LIST` only.
- Create canonical guest records.
- Add visible `Guests / Attendees` section under People / Teams.
- Show only name, company, title, guest type, sector/track, lanyard, dinner routing, invite/registration status, and safe notes.
- Hide emails, phones, rooming, travel, passport, DOB, visa, PNR, cost, and private notes.
- Cross-link podcast/speaker/travel only where explicitly confirmed.
- Keep sensitive sheets admin-only or excluded.
