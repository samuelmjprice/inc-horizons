# Admin Backend Page Restructure Report

Generated during the full Samuel review wrap-up after commits `ece7fbb`, `f3de711`, and `decf346`. This report records what was verified, what was safely fixed, and what remains for Samuel/Chris where a decision would otherwise require guessing.

## Current structure
- Admin-heavy tools are grouped under the Admin top-level group and footer Admin Data link.
- Main navigation prioritizes Overview, Today, Call Sheet, Schedule, Locations, People, Programme, Assets, and Admin.

## Remaining
Admin is separated as a grouped section, not a totally separate route. A separate route can be added later if desired.
