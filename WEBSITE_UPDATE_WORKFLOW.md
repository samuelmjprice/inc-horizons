# HORIZONS Website Update Workflow

This site has two layers:

- Live comments and the Excel tracker capture questions, missing information, proposed changes, confirmations, and approvals.
- `content.json` is the official source data used by the live website.

Comments and tracker rows do not automatically change the official website. Approved updates are reviewed first, then applied to `content.json`, tested, committed, and deployed.

## Normal Update Process

1. Team fills out `HORIZONS_Website_Update_Tracker.xlsx`.
2. Team adds live comments on the website if discussion is needed.
3. Rows or comments that are ready are marked `Approved` or `Ready for Codex`.
4. Codex reviews the tracker and approved comments.
5. Codex updates `content.json`.
6. Codex tests the website locally.
7. Codex commits and pushes to GitHub.
8. GitHub Pages deploys the updated site.
9. Team reviews the live site.

## Emergency Update Process

1. Add the update to the relevant tracker tab or website comment.
2. Mark priority as `Critical`.
3. Mark status as `Approved` or `Ready for Codex`.
4. Codex updates `content.json`.
5. Test quickly on desktop and mobile widths.
6. Push immediately.
7. Confirm the live site is updated.

## Website Comments

The current website comment system is a local-only prototype using browser `localStorage`.

This means:

- Comments save only on the current device and browser.
- Other team members cannot see them.
- They are useful for UI testing and personal notes only.

For real shared event comments, connect Firebase Firestore, Supabase, Airtable, or Google Sheets before event use. Shared comments should capture name, comment, timestamp, status, related item ID, and approval/review status.

## Approved Comments To Official Updates

1. A team member adds a comment/update on the website.
2. The update is saved in the comment system.
3. A project lead reviews the comment.
4. The comment is marked `Approved Change`, `Rejected`, `Needs Confirmation`, or `Resolved`.
5. Codex reviews approved comments.
6. Approved comments are applied to `content.json`.
7. GitHub Pages redeploys.
8. The original comment remains in update history.

Example:

Comment: "Kerstia confirmed Mobile Casino setup is now 5:00 pm."

Approved official data update:

- Mobile Casino setup: `5:00 pm`
- Status: `Confirmed`
- Latest update: `Confirmed by Kerstia`

## Comment Review Method

Until shared storage is connected, local comments can be exported from the browser console:

```js
copy(localStorage.getItem("horizons-card-updates-v1"))
```

When shared storage is added, create one of these review methods:

- Export comments as CSV or JSON.
- Create a comments admin/review page.
- Store comments in a simple backend table.
- Sync approved comments into the Excel tracker.

Codex should only apply comments marked `Approved Change` or tracker rows marked `Approved` / `Ready for Codex`.

## What Not To Do

- Do not edit live HTML directly unless necessary.
- Do not add unconfirmed info as final.
- Do not invent missing details.
- Do not duplicate suppliers.
- Do not change official brand wording.
- Do not show developer notes on the live site.
- Do not let every comment automatically change official data.

## Key Data Rules

- There is only one Chris: `Chris Manoe`.
- Use `HORIZONS Hall`, not `Farmers Market Stage`.
- Suppliers should appear once; open questions belong inside the supplier card.
- Use `File needed`, `Email needed`, `Phone needed`, `Time needed`, or `Needs Confirmation` when information is missing.
