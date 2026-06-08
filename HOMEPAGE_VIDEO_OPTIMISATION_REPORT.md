# Homepage Video Optimisation Report

Status: Fixed

Adobe Media Encoder 2026 was found at `/Applications/Adobe Media Encoder 2026/Adobe Media Encoder 2026.app`, but the available executable launched the GUI instead of exposing a scriptable command-line export flow in this shell session. The AME webservice console also did not return a usable export command from `--help`.

To avoid serving the original source file directly, optimized website assets were produced from the smaller approved MP4:

- `assets/video/horizons-wave-hero-1080.mp4` — 15MB, 1920x960, no audio
- `assets/video/horizons-wave-hero-720.mp4` — 6.2MB, 1280x640, no audio
- `assets/video/horizons-wave-hero-1080.webm` — 10MB, 1920x960, no audio
- `assets/video/horizons-wave-hero-poster.jpg` — 124KB, 1920x960

The homepage does not serve the old MOV or the larger 64MB MP4.

