# AI Phase 2 Plan

Ask HORIZONS Lite deliberately avoids OpenAI/API integration today.

## Phase 2: Real AI Guide
- Secure backend endpoint only.
- OpenAI API integration server-side, never in frontend.
- Read-only Q&A first.
- Source citations back to site sections/documents.
- Privacy filter before prompt construction and before response display.
- No actions in Phase 2.

## Phase 3: Controlled AI Actions
- Add red flag.
- Add team update.
- Mark resolved.
- Send Slack update.
- Assign table seat.
- Every action must require explicit confirmation.

## Required Before Phase 2
- Clean, tested search index.
- Permission model.
- Secure environment variables.
- Safe logging.
- Cost limits.
- Test question suite.
- Clear policy for confidential attendee/source documents.
