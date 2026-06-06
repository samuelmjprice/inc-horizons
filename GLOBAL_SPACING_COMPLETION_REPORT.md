# Global Spacing Completion Report

## Added / reinforced CSS utilities
- `.card-title-group`
- `.card-status-row`
- `.status-pill` compatibility through existing `.tag` system
- `.button-row`
- `.card-actions`
- `.section-actions`
- `.mobile-card-stack`
- `.bottom-nav-safe-area`

## Mobile fixes
- Cards and Hall reference panels now protect against long-word overflow.
- Button/action rows get consistent wrapping and minimum tap height.
- Existing mobile card headers keep titles full-width and badges below titles.

## Desktop behavior
- Existing card headers keep title-left / badge-right behavior with wrapping support.

## Verified
- Automated browser QA found no horizontal overflow across 390, 412, tablet, and desktop widths.
