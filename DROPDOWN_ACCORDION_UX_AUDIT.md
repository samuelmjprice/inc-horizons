# Dropdown / Accordion UX Audit

Date: 2026-06-04

## Findings
- Most long cards are collapsed by default, which is good.
- The risky pattern is nested details inside cards where forms or tabs also appear.
- HORIZONS Hall was the clearest example and has been moved to a full-screen/full-width tool pattern.
- Menus, Guests, Swag, Room Drops, Signage, Podcast, Speakers, Staff, and Suppliers remain safer when cards stay collapsed.

## Fixes Applied
- HORIZONS Hall mobile tabs replaced with section selector.
- Mobile scroll margins added for details panels.
- Mobile action rows stack so buttons do not crowd.
- Full-screen tool hides global bottom navigation.

## Remaining Recommendations
- Consider one-open-at-a-time behavior for some dense sections later.
- Capture Log add/edit flow should eventually become a drawer.
- Signage category tabs should become a selector if the list expands.
