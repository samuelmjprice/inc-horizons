# Accessibility Audit

Audit date: 1 June 2026

## Findings

| Area | Status | Notes | Fixed Now |
|---|---|---|---|
| Skip link | Good | Present for keyboard users. | No |
| Headings | Good | Section headings are semantic enough for navigation. | No |
| Forms | Good | Inputs have visible labels. | No |
| Focus states | Good | `:focus-visible` is defined. | No |
| Mobile tap targets | Good | Buttons and nav items are generally 40-44px+. | Improved |
| Accordions | Good | Native `details/summary` is used heavily. | No |
| Map links | Good | Buttons are labelled as Google Maps actions. | No |
| Floating nav | Improved | Buttons/links are labelled and thumb-friendly. | Yes |
| Native confirmation modal | Acceptable | Slack confirmation is functional but not branded. | No |
| Reduced motion | Improved | Scroll-to-top respects reduced motion. | Yes |

## Future Improvements

- Replace native Slack confirmation with an accessible branded modal.
- Add `aria-live` announcements for saved comments and Slack send results.
- Consider a landmark for Admin Data if it becomes a separate page.
