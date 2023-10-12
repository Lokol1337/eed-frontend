-- run under postgres user on database accelerator
create database vuc;
create user vuc with encrypted password '123456';

GRANT ALL PRIVILEGES ON DATABASE vuc TO vuc;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO vuc;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO vuc;
