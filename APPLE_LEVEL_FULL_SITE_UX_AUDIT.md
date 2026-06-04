# Apple-Level Full Site UX Audit

Date: 2026-06-04

## Executive Summary
- The site now has the right operating data and grouped information architecture.
- The strongest desktop experiences are Overview, Today, Call Sheet, Guests, Menus, and HORIZONS Hall.
- The main mobile risks were complex tools squeezed into normal card layouts, horizontally clipped tab rows, button rows wrapping awkwardly, and sticky controls covering form fields.
- This pass focused on safe structural fixes: mobile-first tool panels, compact Hall Control Centre header, section selector on mobile, single-column complex tool layouts, and hidden global bottom navigation inside full-screen tools.

## Overview
- Works: clear event command centre entry, search, countdown fallback, quick actions.
- Mobile issue: large headings can dominate small screens.
- Fixed now: mobile typography and action wrapping strengthened through responsive rules.
- Needs approval: none.

## Today / What Matters Now
- Works: useful top-level status and priority scan.
- Mobile issue: cards can feel long when too many active items appear.
- Fixed now: responsive card/action stacking strengthened.
- Needs approval: active item pruning rules if the team wants stricter “top 3 only” behavior.

## Red Flags
- Works: high-priority items are visible.
- Mobile issue: dense cards can become long if all notes are open.
- Fixed now: card controls and buttons stack cleanly.
- Needs approval: resolved/archive process ownership.

## Decisions
- Works: leadership decisions are easy to find.
- Mobile issue: similar to Red Flags, needs disciplined resolved-state use.
- Fixed now: responsive spacing/actions.
- Needs approval: who marks decisions resolved.

## Call Sheet
- Works: strong operational core with day tabs, weather, emergency, timeline, and files.
- Mobile issue: tabs and action rows can crowd.
- Fixed now: tab/action rows get safer mobile sizing and no global bottom nav inside full-screen tools.
- Needs approval: no data changes.

## Schedule / Run Sheet
- Works: day tabs and now/next structure.
- Mobile issue: long detail cards can still feel dense.
- Fixed now: mobile stacking and scroll margins improved.
- Needs approval: whether to make schedule item details one-open-at-a-time.

## Locations
- Works: useful map/location cards and HORIZONS Hall entry point.
- Mobile issue: HORIZONS Hall tool was too complex for card layout.
- Fixed now: Hall opens as full-screen mobile tool with compact header and section selector.
- Needs approval: final Hall seat counts and table layout.

## People
- Works: contacts, Who Do I Call, Guests, Staff, and Suppliers are grouped.
- Mobile issue: filters/action rows can be wide.
- Fixed now: filters and action controls stack on phone.
- Needs approval: no privacy changes.

## Programme
- Works: Podcast, Speakers, Entertainment, Capture, and Rehearsals are available.
- Mobile issue: programme cards can feel like a long wall.
- Fixed now: complex form/action layout safer on mobile.
- Needs approval: whether capture log should become a dedicated full-screen tool later.

## Assets
- Works: Menus, Swag, Room Drops, Signage, Documents are grouped.
- Mobile issue: galleries and menu details can become long.
- Fixed now: content visibility and mobile action stacking improved.
- Needs approval: no asset/data changes.

## Admin
- Works: Admin is separated from main event flow.
- Mobile issue: heavy admin content should stay behind one entry point.
- Fixed now: admin content uses content-visibility to reduce load cost.
- Needs approval: whether to split Admin into a separate route/page later.
