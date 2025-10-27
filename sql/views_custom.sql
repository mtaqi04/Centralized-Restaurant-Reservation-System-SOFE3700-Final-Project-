-- View 01
CREATE OR REPLACE VIEW view_avg_party_size AS
SELECT  r.restaurant_id,  r.name AS restaurant_name,
    ROUND(AVG(res.num_people), 2) AS avg_party_size
FROM Reservation res 
JOIN Restaurant r 
    ON res.restaurant_id = r.restaurant_id
GROUP BY 
    r.restaurant_id, r.name;

-- View 02
CREATE OR REPLACE VIEW view_reservations_per_day AS
SELECT reservation_date,  DAYNAME(reservation_date) AS day_of_week,
    COUNT(reservation_id) AS total_reservations
FROM Reservation 
WHERE DAYNAME(reservation_date) IN 
    ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')
GROUP BY  reservation_date, DAYNAME(reservation_date)
ORDER BY reservation_date;

-- View 03
CREATE OR REPLACE VIEW view_frequent_customers AS
SELECT 
    c.customer_id, 
    c.full_name, 
    COUNT(r.reservation_id) AS total_reservations
FROM Reservation r 
JOIN Customer c 
    ON r.customer_id = c.customer_id
GROUP BY c.customer_id,  c.full_name
HAVING COUNT(r.reservation_id) >= 3
ORDER BY total_reservations DESC;


-- View 04
CREATE OR REPLACE VIEW view_available_tables_summary AS
SELECT  
    r.restaurant_id, 
    r.name AS restaurant_name, 
    COUNT(t.table_id) AS total_tables,
    COUNT(t.table_id) - COUNT(DISTINCT CASE 
        WHEN res.reservation_date = '2025-10-26'
            AND (
                 (res.start_time BETWEEN '19:00:00' AND '21:00:00')
              OR (res.end_time BETWEEN '19:00:00' AND '21:00:00')
              OR ('19:00:00' BETWEEN res.start_time AND res.end_time)
            ) 
        THEN res.table_id 
    END) AS available_tables
FROM Restaurant r
JOIN Table_Info t 
    ON r.restaurant_id = t.restaurant_id
LEFT JOIN Reservation res 
    ON t.table_id = res.table_id
GROUP BY  r.restaurant_id,  r.name;


-- View 05
CREATE OR REPLACE VIEW view_late_restaurants AS
SELECT restaurant_id, name AS restaurant_name, location, opening_time, closing_time FROM Restaurant 
WHERE 
    closing_time > '22:00:00';
