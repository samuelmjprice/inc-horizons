# Site Data & UX Audit

|area|issueType|whatWasFound|impact|recommendedFix|status|
|---|---|---|---|---|---|
|Call Sheet|Poor UX|Call sheet data was present but embedded in the wider page flow.|Onsite users may scroll too much to find the daily production view.|Create day-specific call sheet page view with Today tab, print button, emergency, weather, notes, documents, red flags, and missing files.|Implemented|
|Locations|Missing File|Major locations did not consistently expose map links or emergency medical reference.|Team cannot tap quickly into maps under pressure.|Add google_maps_url support and emergency medical card marked Needs Confirmation.|Implemented|
|Weather|Missing Data|Weather module was a static placeholder.|Call sheet could not support outdoor/drone/sunset decisions.|Connect Open-Meteo with local caching and graceful fallback.|Implemented|
|Comments / Updates|Source Conflict|Updates are local-only and Slack notification behavior was not explicit.|Team may expect comments to notify Slack automatically.|Add Slack notify fields and local activity log stub; backend/webhooks still needed for real posting.|Partially Implemented|
|Duplicate Records|Duplicate Data|0 possible duplicate groups found.|Conflicting duplicate records can create uncertainty.|Show Duplicate Review admin section; merge only after human review unless exact and safe.|Implemented|
|Data Health|Navigation Issue|Source health was not visible to admins.|Samuel/Chris cannot quickly see whether the data is ready for wider team use.|Add Data Health Dashboard admin section.|Implemented|
