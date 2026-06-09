# Full Live Site Review Report

Reviewed the live site at `https://inc-horizons.com/` and the patched local build at `http://127.0.0.1:4177/`.

Key live defects confirmed before patch:

- Overview time could show broken `--:--` / unavailable state.
- Admin/backend sections were part of the rendered main document flow.
- Internal links needed route-and-scroll handling before hidden groups were introduced.

Patched local browser QA completed:

- Desktop viewport: 1440 x 1000.
- Mobile viewport: 390 x 844.
- Ibiza time rendered successfully.
- Admin sections hidden outside Admin group.
- Internal links route to correct app group and target.
- Search and Ask HORIZONS basic flows render.

Production follow-up:

- Deploy commit from this pass and verify live site after cache bust.
- Production API write tests must be run from `https://inc-horizons.com`, not localhost, because local origin is intentionally blocked by CORS.
