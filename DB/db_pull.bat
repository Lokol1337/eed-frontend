psql.exe -d vuc -h localhost -p 5432 -U vuc -W -F p -E < scheme_data.sql
psql.exe -h localhost -p 5432 -U postgres < scheme_grant.sql