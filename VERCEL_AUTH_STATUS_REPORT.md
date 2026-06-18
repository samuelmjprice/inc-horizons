# Vercel Auth Status Report

Date: 18 June 2026

## Requested Checks

The requested commands were:

```bash
npx vercel --version
npx vercel whoami
```

## Result

This machine does not currently have Vercel CLI tooling available:

```txt
zsh: command not found: npx
```

Additional checks found no available CLI tools:

```txt
npm not found
npx not found
pnpm not found
yarn not found
vercel not found
```

No `VERCEL_TOKEN` or Vercel-related environment variables were present.

No `.vercel/project.json` exists in this checkout.

## Status

Blocked: Vercel login/project access is not available from this environment.

## Exact Next Action Needed

Use a Vercel account with permission to create/link/deploy the `inc-horizons` project, then either:

1. Run `npx vercel login` / `npx vercel link` / `npx vercel --prod`, or
2. Provide a scoped Vercel token and project/team details, or
3. Complete the Vercel setup in the dashboard.

Required Vercel environment variables:

```txt
HORIZONS_ARCHIVE_PASSWORD
HORIZONS_ARCHIVE_ACCESS_TOKEN
```

Do not commit either secret value.
