create table if not exists public.record_updates (
  id text primary key,
  parent_type text not null,
  parent_id text not null,
  record_type text default 'team_update',
  title text default '',
  body text not null,
  section text default '',
  related_item_id text default '',
  related_item_title text default '',
  related_person text default '',
  related_location text default '',
  related_date text default '',
  author_name text default 'Team update',
  author_email text default '',
  owner text default '',
  suggested_fix text default '',
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
  deleted_at timestamptz,
  source_url text default '',
  device_context jsonb default '{}'::jsonb,
  metadata jsonb default '{}'::jsonb,
  source text default 'website'
);

create index if not exists record_updates_parent_idx
  on public.record_updates (parent_type, parent_id, created_at);

create index if not exists record_updates_record_type_idx
  on public.record_updates (record_type, status, created_at);

create index if not exists record_updates_deleted_idx
  on public.record_updates (deleted_at);

alter table public.record_updates add column if not exists record_type text default 'team_update';
alter table public.record_updates add column if not exists section text default '';
alter table public.record_updates add column if not exists related_item_id text default '';
alter table public.record_updates add column if not exists related_item_title text default '';
alter table public.record_updates add column if not exists related_person text default '';
alter table public.record_updates add column if not exists related_location text default '';
alter table public.record_updates add column if not exists related_date text default '';
alter table public.record_updates add column if not exists owner text default '';
alter table public.record_updates add column if not exists suggested_fix text default '';
alter table public.record_updates add column if not exists deleted_at timestamptz;
alter table public.record_updates add column if not exists source_url text default '';
alter table public.record_updates add column if not exists device_context jsonb default '{}'::jsonb;
alter table public.record_updates add column if not exists metadata jsonb default '{}'::jsonb;

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

create table if not exists public.round_table_assignments (
  id uuid primary key default gen_random_uuid(),
  event_id text not null default 'horizons_2026',
  table_number integer not null,
  seat_number integer not null,
  guest_id text default '',
  guest_name text default '',
  guest_company text default '',
  guest_category text default '',
  dietary_flag text default '',
  assignment_status text default 'Guest Needed',
  notes text default '',
  updated_by text default '',
  updated_at timestamptz default now(),
  created_at timestamptz default now(),
  unique(event_id, table_number, seat_number)
);

create index if not exists round_table_assignments_event_table_idx
  on public.round_table_assignments (event_id, table_number, seat_number);

create table if not exists public.round_table_assignment_activity (
  id uuid primary key default gen_random_uuid(),
  event_id text not null default 'horizons_2026',
  table_number integer,
  seat_number integer,
  action text,
  old_value jsonb,
  new_value jsonb,
  updated_by text,
  created_at timestamptz default now()
);

create index if not exists round_table_assignment_activity_event_idx
  on public.round_table_assignment_activity (event_id, created_at desc);

create table if not exists public.round_table_plan_config (
  id uuid primary key default gen_random_uuid(),
  event_id text not null default 'horizons_2026',
  layout_name text default 'HORIZONS Hall Round Table Layout',
  source_file text default 'Horizons - Farmers Market x80 V5.pdf',
  source_capacity integer default 80,
  working_table_count integer default 10,
  working_seats_per_table integer default 9,
  status text default 'Needs Assignment',
  seat_count_confirmation_status text default 'Needs Confirmation',
  notes text default 'Uploaded layout shows seated capacity 80. Current working version uses 10 tables x 9 guest slots until final confirmation from Kirsty / Clownfish.',
  updated_at timestamptz default now(),
  unique(event_id)
);
