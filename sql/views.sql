USE Restaurant;

-- View 1: Full Reservation Info
CREATE OR REPLACE VIEW view_full_reservation_info AS
SELECT rsv.reservation_id, c.full_name AS customer_name, rest.name AS restaurant_name,
       rsv.reservation_date, rsv.start_time, rsv.end_time, t.capacity, rsv.num_people, rsv.status
FROM Reservation rsv
JOIN Customer c ON rsv.customer_id = c.customer_id
JOIN Restaurant rest ON rsv.restaurant_id = rest.restaurant_id
JOIN Table_Info t ON rsv.table_id = t.table_id;

-- View 2: Popular Restaurants
CREATE OR REPLACE VIEW view_popular_restaurants AS
SELECT r.restaurant_id, r.name AS restaurant_name, COUNT(rs.reservation_id) AS total_reservations
FROM Reservation rs
JOIN Restaurant r ON rs.restaurant_id = r.restaurant_id
GROUP BY r.restaurant_id, r.name
ORDER BY total_reservations DESC;

-- View 3: Available Tables
CREATE OR REPLACE VIEW view_available_tables AS
SELECT t.table_id, t.restaurant_id, r.name AS restaurant_name, t.table_number, t.capacity
FROM Table_Info t
JOIN Restaurant r ON r.restaurant_id = t.restaurant_id
WHERE t.table_id NOT IN (
    SELECT table_id FROM Reservation WHERE reservation_date = CURDATE()
);

-- View 4: Customer History
CREATE OR REPLACE VIEW view_customer_history AS
SELECT c.full_name, r.name AS restaurant_name, rs.reservation_date, rs.num_people, rs.status
FROM Reservation rs
JOIN Customer c ON rs.customer_id = c.customer_id
JOIN Restaurant r ON rs.restaurant_id = r.restaurant_id
WHERE rs.reservation_date < CURDATE();

-- View 5: Cuisine Summary
CREATE OR REPLACE VIEW view_cuisine_summary AS
SELECT c.cuisine_name, COUNT(rc.restaurant_id) AS total_restaurants
FROM Cuisine c
JOIN Restaurant_Cuisine rc ON c.cuisine_id = rc.cuisine_id
GROUP BY c.cuisine_name;

-- View 6: Reservations by Day
CREATE OR REPLACE VIEW view_reservations_by_day AS
SELECT DAYNAME(reservation_date) AS day_of_week, COUNT(*) AS total_reservations
FROM Reservation
GROUP BY DAYNAME(reservation_date)
ORDER BY total_reservations DESC;

-- View 7: Active Bookings
CREATE OR REPLACE VIEW view_active_bookings AS
SELECT rsv.reservation_id, c.full_name, rest.name AS restaurant_name,
       rsv.reservation_date, rsv.start_time, rsv.status
FROM Reservation rsv
JOIN Customer c ON rsv.customer_id = c.customer_id
JOIN Restaurant rest ON rsv.restaurant_id = rest.restaurant_id
WHERE rsv.reservation_date >= CURDATE() AND rsv.status = 'Booked';

-- View 8: Table Utilization
CREATE OR REPLACE VIEW view_table_utilization AS
SELECT t.table_id, r.name AS restaurant_name, COUNT(rs.reservation_id) AS total_reservations
FROM Table_Info t
LEFT JOIN Reservation rs ON rs.table_id = t.table_id
JOIN Restaurant r ON r.restaurant_id = t.restaurant_id
GROUP BY t.table_id, r.name;

-- View 9: Top Customers
CREATE OR REPLACE VIEW view_top_customers AS
SELECT c.full_name, COUNT(rs.reservation_id) AS total_reservations
FROM Reservation rs
JOIN Customer c ON rs.customer_id = c.customer_id
GROUP BY c.full_name
ORDER BY total_reservations DESC;

-- View 10: Cancelled Reservations
CREATE OR REPLACE VIEW view_cancelled_reservations AS
SELECT rs.reservation_id, c.full_name, r.name AS restaurant_name, rs.reservation_date, rs.status
FROM Reservation rs
JOIN Customer c ON rs.customer_id = c.customer_id
JOIN Restaurant r ON rs.restaurant_id = r.restaurant_id
WHERE rs.status = 'Cancelled';


-- View 11: Weather by Restaurant
CREATE OR REPLACE VIEW v_restaurant_weather AS
SELECT
  r.restaurant_id,
  r.name AS restaurant_name,
  r.location AS city,
  w.temperature,
  w.feels_like,
  w.humidity,
  w.wind_speed,
  w.cloud_coverage,
  w.description,
  w.icon,
  w.units,
  w.source,
  w.fetched_at
FROM Restaurant r
LEFT JOIN Weather_Cache_City w
  ON w.city = r.location;
