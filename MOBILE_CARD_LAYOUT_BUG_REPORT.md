# Mobile Card Layout Bug Report

Status: Fixed.

Root cause: search/start cards were rendered as compact multi-column rows on mobile, while `button:not(...)` styling forced result cards into oversized pill radii. Long schedule/call-sheet/person titles were also being used as primary titles.

Fix: result/start cards now use the shared `mobile-result-card` stacked structure with chips, title, snippet, details, and actions. Mobile cards use 24px radius and full-width titles.

Files changed: `script.js`, `style.css`, `index.html`.

