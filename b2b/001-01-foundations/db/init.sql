create table if not exists ping_log (
  id bigserial primary key,
  service varchar(64) not null,
  at timestamptz not null default now()
);
