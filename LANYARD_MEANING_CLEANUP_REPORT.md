# Lanyard Meaning Cleanup Report

## Confirmed Live Guide
- Black: Aream & Co
- Brown: Crew
- Blue: PC & console
- Green: mobile consumer
- Oatmeal: other

## Fixes
- Confirmed meanings are present in active `content.json` lanyard data.
- Renderer now defensively maps the five approved colours to the confirmed meanings if a colour record is missing a meaning.
- The old visible fallback `Group Meaning Needed` no longer appears in the expanded live guide.

## QA
- Browser QA confirmed all five meanings appear in the expanded Lanyard Colour Guide.
- Browser QA confirmed `Group Meaning Needed` does not appear in the expanded Lanyard Colour Guide.
