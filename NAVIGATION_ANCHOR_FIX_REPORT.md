# Navigation Anchor Fix Report

Generated during the full Samuel review wrap-up after commits `ece7fbb`, `f3de711`, and `decf346`. This report records what was verified, what was safely fixed, and what remains for Samuel/Chris where a decision would otherwise require guessing.

## Fixed
- Internal anchor clicks now route through `scrollToSectionTarget()` in `script.js`.
- Sticky header offset is applied before scrolling.
- Ask HORIZONS result cards, section drawer links, homepage buttons, and ordinary internal links now use the same top-of-section navigation behavior.

## Tested targets
Who Do I Call, Locations, Guests, Assets/Menus, Workstreams, Today, Call Sheet, Schedule, People, Programme, Documents, Admin.

## Result
Automated browser QA passed across mobile, Android width, tablet, and desktop.
