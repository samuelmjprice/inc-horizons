# Full Site Code Audit

Audit date: 1 June 2026

## Summary

The codebase is a static GitHub Pages frontend with a Vercel/Supabase backend for shared updates and Slack notifications. The site is structurally sound, data-rich, and deployable. The biggest code risks are app size, a very large single JavaScript file, and local-only Capture Log persistence.

| File / Area | Issues Found | Risk | Recommended Fix | Fixed Now | Follow-up Needed |
|---|---|---:|---|---|---|
| `index.html` | Long single-page structure is workable but difficult to navigate on mobile. | Medium | Add stronger section navigation and keep admin tools behind Admin Data. | Yes | Continue keeping admin areas out of main flow. |
| `style.css` | Navigation helpers were too minimal for onsite use. Some mobile controls needed stronger thumb-friendly layout. | Medium | Replace single next link with floating section pill and section-end nav. | Yes | Re-test with real phones onsite. |
| `script.js` | Single 1,800+ line file mixes rendering, state, API, comments, weather, Slack, and navigation. | Medium | Split into modules after event or before major expansion. | No | Refactor later, not before event unless necessary. |
| `script.js` | Section navigation did not expose previous/current/next context clearly. | High | Add active-section floating navigation and section-end controls. | Yes | Watch for any overlap with forms on small devices. |
| `script.js` | Capture Log stores locally only. | Medium | Add Supabase-backed capture log table/API if capture logging becomes operationally critical. | No | Backend scaffold needed. |
| `content.json` | Very large data file with many placeholders and unresolved fields. | Medium | Keep missing data visible; do not auto-confirm. | Partially | Team data pass still required. |
| API routes | `/api/updates` and `/api/slack/send` are working through Vercel. | Low | Keep secrets in Vercel only. | Yes | Production Slack webhooks still need approval. |
| Admin sections | Admin tools are present but should not dominate team navigation. | Low | Keep behind footer/nav Admin Data entry. | Yes | Consider simple access gate later if sensitive data grows. |

## Code Health Notes

- `node --check script.js` passes.
- `content.json` parses as valid JSON.
- No duplicate canonical IDs were found in the current JSON scan.
- No committed Slack webhooks, Supabase service role assignments, tokens, private keys, or `.env` secrets were found.
- Browser smoke tests showed no live-site console errors from `inc-horizons.com`.

## Future Refactor Recommendation

After the event, split `script.js` into small modules:

- rendering helpers
- data filters
- comments/updates API
- Slack UI
- weather
- navigation
- section renderers

Do not do that refactor immediately before event use unless a bug requires it.
