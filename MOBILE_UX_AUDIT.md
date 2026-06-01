# Mobile UX Audit

Audit date: 1 June 2026

## Tested Viewports

- Narrow in-app browser viewport around phone width
- Live site at `https://inc-horizons.com/?deploy-check=322b01d#locations`
- Local site after navigation changes

## Results

| Check | Result | Notes |
|---|---|---|
| Horizontal overflow | Passed | Browser smoke test reported no document overflow. |
| Header / menu | Passed | Sticky header and mobile menu remain usable. |
| Cards | Passed | Cards stack at mobile widths. |
| Tabs | Passed | Day tabs scroll horizontally where needed. |
| Call Sheet | Passed | Usable with stacked weather/emergency cards on mobile. |
| Map buttons | Passed | Google Maps links are tappable card actions. |
| Update forms | Passed | Form fields are labelled and stack. |
| Slack copy | Passed | Wording is clearer and avoids global test-mode language. |
| Capture Log | Passed with caveat | Usable on mobile; local-only persistence needs clear operational expectations. |
| Long navigation | Improved | Floating section pill and section-end controls added. |
| Admin clutter | Passed | Admin tools are behind Admin Data. |

## Fixes Made

- Added floating bottom navigation pill:
  - `↑ Top`
  - previous section
  - current section label
  - next section
- Added section-end navigation:
  - previous section
  - Back to top
  - next section
- Removed reliance on the old single next-section helper.
- Added reduced-motion respect for scroll-to-top behavior.

## Watch Items

- Test on Samuel/Chris real iPhones and Android devices before onsite use.
- Watch for the bottom navigation pill overlapping long forms; current placement is subtle and should be acceptable, but real-device testing is still useful.
