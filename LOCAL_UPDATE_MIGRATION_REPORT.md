# Local Update Migration Report

Existing local cached updates are still read as a cache so old browser state is not abruptly lost.

This pass does not auto-migrate historic local-only records into Supabase because that could duplicate old updates or publish stale private drafts. A future Admin-only migration tool should show each local record and require explicit approval before publishing to shared storage.
