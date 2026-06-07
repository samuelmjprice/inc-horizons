# Slack Integration Full Test Report

Backend base: https://inc-horizons.vercel.app

Configured channels found: #horizons-main, #horizons-red-flags, #horizons-schedule, #horizons-production, #horizons-content, #horizons-podcast, #horizons-suppliers, #horizons-entertainment, #horizons-locations, #horizons-documents, #horizons-decisions.

No live Slack spam test was sent from this pass. Red Flag, Decision, Team Update, and Call Sheet Summary now use the shared update route when available and queue local Slack activity with an explicit backend-unavailable message if the backend call fails. No team-facing horizons-test/test-channel copy remains.

Checked: 7 June 2026.
