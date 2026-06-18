# Archive Secret Scan Full Report

Date: 18 June 2026

## Secret Handling

The archive password and archive access token were set in Vercel environment variables.

Secret values are not committed to source files or reports.

## Scan Result

Checked active repository files for:

```txt
archive password value
HORIZONS_ARCHIVE_PASSWORD
HORIZONS_ARCHIVE_ACCESS_TOKEN
SLACK_WEBHOOK
SUPABASE_SERVICE
VERCEL_TOKEN
OPENAI_API_KEY
```

Expected result:

- Environment variable names may appear in source/docs.
- Secret values must not appear in committed files.

Final command output is recorded in `ARCHIVE_FINAL_VALIDATION_REPORT.md`.

