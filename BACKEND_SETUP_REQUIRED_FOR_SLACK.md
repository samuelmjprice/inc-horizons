# Backend Setup Required For Slack

The GitHub Pages frontend cannot safely post directly to Slack because webhook URLs would be exposed.

Required backend/serverless endpoint:

`POST /api/slack/send`

Payload:

```json
{
  "event_type": "red_flag_created",
  "channel_key": "red_flags",
  "title": "Podcast Schedule Needs Confirmation",
  "message": "Confirm final podcast slots.",
  "related_item_id": "red_flag_podcast_schedule",
  "website_link": "https://inc-horizons.com/#red-flags"
}
```

Backend requirements:

1. Validate the request.
2. Resolve the correct environment variable from `slack-channel-map.json`.
3. Send JSON to Slack Incoming Webhook.
4. Write a Slack Activity Log record.
5. Return success/failure to the website.

Recommended hosting options:

- Vercel serverless functions.
- Netlify functions.
- Cloudflare Workers.
- Small Express API with persistent database.

Do not hardcode Slack secrets in frontend JavaScript or `content.json`.
