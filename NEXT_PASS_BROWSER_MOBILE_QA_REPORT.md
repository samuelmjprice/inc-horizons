# Next Pass Browser Mobile QA Report

Status: Fixed.

Automated syntax checks passed before browser QA:

- `node --check script.js`: passed
- `python3 -m json.tool content.json`: passed
- Active UI wording scan for local-only/test-channel/Needs Confirming wording: passed
- Sensitive string scan found only `DOB` and `PNR` in the attendee directory excluded-fields metadata, not displayed UI records.

Browser/mobile QA completed against `http://127.0.0.1:8067`.

- Desktop sampled `#podcast`, `#flights`, `#contacts`, `#menus`, and `#call-sheet`: no sampled long card titles collapsed into vertical columns.
- 390px phone sampled the same sections: no sampled long card titles collapsed into vertical columns.
- Homepage Find Answers Fast search: searching `Chris Manoe` scrolled to `#app-search`, populated the global search, and rendered matching results.
- Call Sheet phone view: Condensed toggle active, Daily Brief collapsed by default, Send Slack Summary opens a preview modal.
- Slack modal: channel selector and readable preview confirmed.
- People search: `Production` query filters the People cards.

Screenshots saved:

- `qa-screenshots/desktop-podcast-tag-layout.png`
- `qa-screenshots/mobile-call-sheet-condensed.png`
- `qa-screenshots/mobile-menus-accordions.png`
