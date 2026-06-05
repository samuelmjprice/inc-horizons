# HORIZONS Hall Control Centre QA Report

## Commands
- `node --check script.js` passed.
- `python3 -m json.tool content.json` passed.

## Browser QA
- Local URL: `http://127.0.0.1:8773/`
- Mobile viewport tested: 390 x 844.
- Desktop viewport tested: 1440 x 900.

## Results
- Mobile scroll overlap fixed: Yes.
- Section selector fixed: Yes.
- Round Tables table switching no longer jumps to top: Yes.
- Assign Guest opens editable seat fields in edit mode: Yes.
- Clear works for active/manual seat entry and is disabled when empty: Yes.
- Files spacing fixed: Yes.
- Theatre spacing improved: Yes.
- Stage scroll fixed: Yes.
- Desktop More / X overlap fixed: Yes.
- No horizontal overflow in tested mobile/desktop viewports: Yes.

## Remaining
- Final seat count still needs Kirsty / Clownfish confirmation.
- Reserved theatre seats still need assignment.
- Production seating data was not modified during QA.

