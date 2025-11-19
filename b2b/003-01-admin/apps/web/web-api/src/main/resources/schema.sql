create table if not exists users (
  id bigserial primary key,
  email varchar(255) not null unique,
  password_hash varchar(255) not null,
  enabled boolean not null default true
);
