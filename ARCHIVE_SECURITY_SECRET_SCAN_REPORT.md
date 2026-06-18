# Archive Security Secret Scan Report

Date: 18 June 2026

## Status

No real archive password or archive access token was committed.

Explicit scan result:

```txt
suggested archive password value: no repository matches
```

Archive environment variable names appear only as expected in source code and documentation.

Other secret-related searches found environment variable names and setup documentation only, not secret values.

## Expected Repository Occurrences

Environment variable names may appear in:

- `middleware.js`
- `api/archive-login.js`
- `README.md`
- archive reports

## Required Secret Handling

Set these only in Vercel or the production hosting provider:

```txt
HORIZONS_ARCHIVE_PASSWORD
HORIZONS_ARCHIVE_ACCESS_TOKEN
```

Do not put secret values in:

- source files
- reports
- README
- commit messages
- issue comments
