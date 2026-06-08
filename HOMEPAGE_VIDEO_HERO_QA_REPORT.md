# Homepage Video Hero QA Report

Status: Fixed and verified

Homepage hero changes:

- Added video background using optimized WebM and MP4 sources.
- Added poster fallback image.
- Added soft dark overlay for readable text and search UI.
- Kept the Find Answers Fast search and quick links in the first viewport.
- Added reduced-motion fallback that hides the video and uses the poster image.

Browser QA notes:

- Desktop local check loaded `assets/video/horizons-wave-hero-1080.webm`.
- Desktop subtitle color verified as white over the video.
- Desktop showed Ibiza time and did not show `Countdown loading...`.
- Mobile 390px check loaded the video, had no horizontal overflow, and showed Ibiza time.
- Mobile 390px check confirmed Ask HORIZONS does not overlap the live-time panel.
- Poster path is present for fallback.
