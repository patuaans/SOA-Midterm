INSERT INTO tables (seat_count, location, status)
VALUES (4, 'Main Dining Area', 'ACTIVE'),
VALUES (2, 'Main Dining Area', 'ACTIVE'),
VALUES (4, 'Main Dining Area', 'ACTIVE'),
VALUES (8, 'Main Dining Area', 'ACTIVE'),
VALUES (4, 'Main Dining Area', 'INACTIVE');

-- insert 2 row data to table table_bookings(table_id, start_time, end_time,status)
-- Path: models/seed.sql
INSERT INTO table_bookings (table_id, start_time, end_time, status)
VALUES (1, '2021-01-01 12:00:00', '2021-01-01 14:00:00', 'ACTIVE')