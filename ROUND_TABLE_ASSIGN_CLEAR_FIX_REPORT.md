# Round Table Assign / Clear Fix Report

## Fixes Made
- Table switching now preserves Hall panel scroll position instead of jumping back to the top.
- View mode now shows a clear hint: "Tap Edit assignments to assign guests."
- Assign Guest buttons are active only in edit mode.
- Empty seats no longer show an active-looking Clear action.
- Clear becomes enabled when a guest is typed/selected in the active seat editor.
- Manual guest entries are treated as needing confirmation.

## Backend / Save Status
- Existing shared seating save flow was preserved.
- Production data was not intentionally changed during QA.
- Save still uses the existing shared seating plan workflow.

## QA Result
- Table selector changed Table 1 to Table 2 without returning to the top.
- Assign Guest opened the editable seat fields.
- Clear disabled when empty, enabled after manual entry, and cleared the fields correctly.

