# Duplicate / Discrepancy Final QA Report

Scan notes:

- Federico/Fedi aliases remain in code/data for search compatibility.
- BeGood normalization remains in code.
- `horizons-test` appears in backend docs/server routing only.
- Farmers Market appears in source filenames/traces for HORIZONS Hall source PDFs.

Fixed:

- Stale local-only audit text in `content.json`.

Deferred:

- Do not rewrite source trace filenames unless the underlying source file names change.
