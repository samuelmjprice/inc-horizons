create table if not exists public.record_updates (
  id text primary key,
  parent_type text not null,
  parent_id text not null,
  title text default '',
  body text not null,
  author_name text default 'Team update',
  author_email text default '',
  status text default 'Still To Be Resolved',
  visibility text default 'Team',
  priority text default 'Normal',
  notify_slack boolean default false,
  slack_channel text default '',
  slack_sent_at timestamptz,
  slack_message_ts text default '',
  slack_error text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  resolved_by text default '',
  resolved_at timestamptz,
  archived_at timestamptz,
  source text default 'website'
);

create index if not exists record_updates_parent_idx
  on public.record_updates (parent_type, parent_id, created_at);

create table if not exists public.slack_activity_log (
  id text primary key,
  update_id text default '',
  parent_type text default '',
  parent_id text default '',
  sent_at timestamptz default now(),
  sent_by text default 'website',
  event_type text default 'comment_update',
  channel text default '',
  message_title text default '',
  related_item_id text default '',
  website_link text default '',
  status text default 'Queued',
  error_message text default '',
  payload_preview text default ''
);

create index if not exists slack_activity_log_sent_at_idx
  on public.slack_activity_log (sent_at desc);
