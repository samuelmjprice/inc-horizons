# Performance Audit

Audit date: 1 June 2026

## Summary

The site is performant enough for 10-20 event users, but it is data-heavy. The highest performance risk is rendering many large sections from one JSON file and one large JavaScript bundle.

| Issue | Impact | Fix | Result |
|---|---|---|---|
| Large `content.json` | Initial render has a lot of data to process. | Keep details collapsed and limit visible rows in heavy renderers. | Already mostly implemented. |
| Single `script.js` | Harder to maintain and debug. | Defer modular refactor until after event. | Documented. |
| Large PDF brand/style assets | Not loaded by default; only linked. | Keep as document links rather than embedding. | Acceptable. |
| Long sections | Cognitive and rendering load. | Bottom nav plus section-end nav; summary-first accordions. | Improved. |
| Re-render on global filters | Whole site can re-render. | Acceptable at current data size; avoid adding much more before event. | Watch item. |
| Weather API | External dependency. | 45-minute cache and graceful fallback. | Good. |

## Largest Assets

- `assets/documents/presentation-style-guide.pdf`
- `assets/documents/horizons-style-guide.pdf`
- `assets/documents/horizons-swag-delivery-brief.pdf`
- several image references under `assets/images`

These are not a blocking issue because they are not all forced into the initial page view.
