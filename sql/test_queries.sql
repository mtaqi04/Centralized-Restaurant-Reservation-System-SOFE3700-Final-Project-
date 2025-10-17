-- Smoke tests
SELECT COUNT(*) AS restaurants FROM Restaurant;
SELECT COUNT(*) AS customers FROM Customer;
SELECT * FROM v_full_reservation_info LIMIT 10;