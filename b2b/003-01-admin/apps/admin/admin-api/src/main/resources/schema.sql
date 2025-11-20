create table if not exists admins (
  id bigserial primary key,
  email varchar(255) not null unique,
  password_hash varchar(255) not null,
  enabled boolean not null default true
);

create table if not exists vendors (
  id bigserial primary key,
  email varchar(255) not null unique,
  name varchar(255),
  enabled boolean not null default true
);
