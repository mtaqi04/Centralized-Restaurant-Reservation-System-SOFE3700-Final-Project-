-- Create common + custom views (fill out as needed)
CREATE OR REPLACE VIEW v_full_reservation_info AS
SELECT r.name AS restaurant, c.full_name, res.reservation_date, res.start_time, res.end_time
FROM Reservation res
JOIN Restaurant r ON res.restaurant_id = r.restaurant_id
JOIN Customer c ON res.customer_id = c.customer_id;