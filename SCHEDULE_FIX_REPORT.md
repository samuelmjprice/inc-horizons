# Schedule Fix Report

Generated during the full Samuel review wrap-up after commits `ece7fbb`, `f3de711`, and `decf346`. This report records what was verified, what was safely fixed, and what remains for Samuel/Chris where a decision would otherwise require guessing.

## Verified / improved
- Schedule loads across all tested viewports.
- Back-to-top and section navigation work with sticky offset.
- Cards inherit global spacing and long-title wrapping improvements.

## Remaining
Ambiguous source labels such as Subject 2/3/4 remain documented in `SCHEDULE_AMBIGUOUS_RECORDS_CLEANUP_LIST.md` instead of guessed.
