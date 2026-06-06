# Copy Cleanup Report

Generated during the full Samuel review wrap-up after commits `ece7fbb`, `f3de711`, and `decf346`. This report records what was verified, what was safely fixed, and what remains for Samuel/Chris where a decision would otherwise require guessing.

## Reviewed
- Active UI copy for Ask HORIZONS, Slack helper text, Samuel Price notes, and document buttons.
- Team-facing old phrases like “Keep separate from Samuel Hosier” and Slack test-mode language were removed in active files.

## Dash cleanup
- Existing content still contains legitimate en/em dash punctuation in long source-derived schedule titles. These were not bulk-rewritten because doing so could corrupt source trace or published titles.

## Remaining
Source-derived finalWorkbookDisplayText fields may still contain long dash-separated traces and should remain admin/source context unless manually rewritten in source data.
