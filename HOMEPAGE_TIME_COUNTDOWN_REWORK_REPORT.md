# Homepage Time Countdown Rework Report

Status: Fixed

The broken countdown UI was removed from the homepage hero.

Removed states:

- Blank `Last updated` in the hero
- `Countdown loading...`
- Static `0 Days 00 Hours 00 Minutes 00 Seconds`

Replacement:

- Ibiza time via `Europe/Madrid`
- Current Ibiza day/date
- Event close label: `Friday 12 June`

If time formatting fails, the hero shows `Ibiza time unavailable` instead of a broken countdown state.

