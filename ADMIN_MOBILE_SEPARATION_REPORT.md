# Admin Mobile Separation Report

Date: 2026-06-04

## Current State
- Admin / Developer Data is grouped under Admin and does not dominate the primary event flow.
- Heavy admin sections remain accessible but are not the first thing mobile users see.

## Fixes Applied
- Admin-heavy sections use content-visibility to reduce mobile rendering cost when not in view.
- Main flow remains focused on Overview, Today, Call Sheet, Schedule, Locations, People, Programme, and Assets.

## Recommendation
- Keep Admin as a single mobile entry point.
- Consider a separate Admin route/page only after event-critical tools are stable.
