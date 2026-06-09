# Ibiza Time / Last Updated Final Fix Report

Fixed:

- Removed initial `--:--` placeholder from the hero.
- Kept time formatting in `Europe/Madrid`.
- Changed fallback handling so `Ibiza time unavailable` only appears if the formatter fails.
- Hid empty Last Updated fields.
- Updated content timestamp to `9 June 2026, final QA bug-fix pass`.
- Cache-busted CSS/JS to `20260609-full-site-final-qa`.

QA:

- Browser QA showed Ibiza time as `15:51`.
- Fallback was hidden.
- Footer Last Updated was populated.
