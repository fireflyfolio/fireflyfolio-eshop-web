-- admin user: admin@admin / admin  (bcrypt with {bcrypt} prefix)
insert into admins(email, password_hash, enabled) values
('admin@admin', '{bcrypt}$2a$10$VO9Tg8/9Qf2K8mWkBrf9eeoZ0xXyQhSg6vY8tzF1WmI2gGzN0Vh2u', true)
on conflict (email) do nothing;

-- demo vendor
insert into vendors(email, name, enabled) values
('test@test', 'Demo Vendor', true)
on conflict (email) do nothing;
