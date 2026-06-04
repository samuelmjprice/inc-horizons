# Mobile Navigation QA Report

Date: 2026-06-04

## Findings
- Main grouped nav is useful.
- Floating section jump is helpful in normal content.
- Floating section jump should not compete with full-screen tools.

## Fixes Applied
- Global floating section navigation is hidden while the HORIZONS Hall Control Centre is open.
- Section drawer remains available in the main flow.
- Hall Control Centre now has its own compact header, close control, primary action, More menu, and section selector.

## Remaining
- Future full-screen tools should also set an open-body class so the global bottom nav hides consistently.
