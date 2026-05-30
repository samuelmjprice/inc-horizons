# Slack Test Plan

Slack test posting is live for `#horizons-test` through the Vercel backend.

Production Slack posting is not live. Human approval and production webhook setup are still required.

Use `#horizons-test` for every test until approved.

Test cases:

1. Send red flag alert.
2. Send schedule update.
3. Send call sheet summary.
4. Send missing file request.
5. Send podcast update.
6. Send supplier update.
7. Send entertainment update.
8. Send location update.
9. Send decision request.
10. Add normal website update without Slack notification.
11. Add website update with Notify Slack checked.
12. Add private/admin update and confirm it does not post publicly.
13. Retry a failed Slack send.
14. Confirm duplicate-send warning appears before resending.

Approval checklist:

- Channels are correct.
- Alerts route correctly.
- No private/admin notes post publicly.
- No duplicate alerts are created accidentally.
- Message formatting is clear.
- BeGood and Aream & Co. spellings are correct.
- Samuel Price and Samuel Hosier are separate.

Latest safe test results, 29 May 2026:

- Backend `/api/slack/send` sent a controlled message to `#horizons-test`.
- Website comment with Notify Slack saved to Supabase and posted to `#horizons-test`.
- Missing production webhook route failed safely and left the saved website update intact.
- Slack activity was logged in Supabase.
