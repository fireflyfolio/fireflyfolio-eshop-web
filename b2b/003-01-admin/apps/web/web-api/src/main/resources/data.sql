-- password: test  (BCrypt for demo)
insert into users(email, password_hash, enabled)
values ('test@test.tv', '{bcrypt}$2a$10$N9qo8uLOickgx2ZMRZo5e.7WQ8vS3x6uZ1u1e.VH1a/V8QWqB8eFO', true)
on conflict (email) do nothing;
