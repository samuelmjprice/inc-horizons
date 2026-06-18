# Archive Env Vars Full Access Completion Report

Date: 18 June 2026

## Required Variables

The following variables were set in the Vercel project environment:

```txt
HORIZONS_ARCHIVE_PASSWORD
HORIZONS_ARCHIVE_ACCESS_TOKEN
```

Secret values are not recorded in this repository or report.

## Result

Production archive login now works on the live domain.

QA evidence:

```txt
Wrong password: 303 to /archive-lock.html?error=1&next=%2F, no session cookie
Correct password: 303 to /, session cookie present
Unlocked /: 200
Unlocked /content.json: 200
Logged-out /content.json: 307 to archive lock
```

