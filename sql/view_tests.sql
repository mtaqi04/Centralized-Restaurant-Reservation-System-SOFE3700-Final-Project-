USE Restaurant;

-- View 1 Case 1
SELECT 
    reservation_id, customer_name, restaurant_name, 
    reservation_date, start_time, end_time, capacity, num_people, status
FROM view_full_reservation_info
ORDER BY reservation_date DESC
LIMIT 5;


-- View 1 Case 2
SELECT *
FROM view_full_reservation_info
WHERE num_people > capacity OR capacity < 2;



-- View 2 Case 1
SELECT * 
FROM view_popular_restaurants
ORDER BY total_reservations DESC
LIMIT 3;


-- View 2 Case 2
SELECT r.restaurant_id, r.name AS restaurant_name
FROM Restaurant r
WHERE r.restaurant_id NOT IN (
    SELECT restaurant_id FROM Reservation
);



-- View 3 Case 1
SELECT * 
FROM view_available_tables
ORDER BY restaurant_name, table_number
LIMIT 5;


-- View 3 Case 2
SELECT *
FROM view_available_tables
WHERE restaurant_name LIKE '%Grill%'
AND table_id NOT IN (
    SELECT table_id FROM Reservation WHERE reservation_date = CURDATE()
);


-- View 4 Case 1
SELECT * 
FROM view_customer_history
ORDER BY reservation_date DESC
LIMIT 5;


-- View 4 Case 2
SELECT c.full_name
FROM Customer c
WHERE c.customer_id NOT IN (
  SELECT DISTINCT customer_id
  FROM Reservation
  WHERE reservation_date < CURDATE()
  AND status <> 'Cancelled'
);


-- View 5 Case 1
SELECT * 
FROM view_cuisine_summary
ORDER BY total_restaurants DESC;

-- View 5 Case 2
SELECT c.cuisine_name
FROM Cuisine c
LEFT JOIN Restaurant_Cuisine rc ON c.cuisine_id = rc.cuisine_id
WHERE rc.restaurant_id IS NULL;



-- View 6 Case 1
SELECT * 
FROM view_reservations_by_day
ORDER BY total_reservations DESC;


-- View 6 Case 2
SELECT 'Sunday' AS day_of_week
WHERE 'Sunday' NOT IN (
  SELECT day_of_week FROM view_reservations_by_day
);


-- View 7 Case 1
SELECT * 
FROM view_active_bookings
ORDER BY reservation_date ASC
LIMIT 5;

-- View 7 Case 2
SELECT * 
FROM view_active_bookings
WHERE status NOT IN ('Booked');

-- View 8 Case 1
SELECT * 
FROM view_table_utilization
ORDER BY total_reservations DESC
LIMIT 5;

-- View 8 Case 2
SELECT *
FROM view_table_utilization
WHERE total_reservations = 0 
   OR total_reservations = (
       SELECT MAX(total_reservations)
       FROM view_table_utilization
   );


-- View 9 Case 1
SELECT * 
FROM view_top_customers
ORDER BY total_reservations DESC
LIMIT 5;

-- View 9 Case 2
SELECT *
FROM view_top_customers
WHERE total_reservations = (
  SELECT MAX(total_reservations) FROM view_top_customers
);


-- View 19 Case 1
SELECT * 
FROM view_cancelled_reservations
ORDER BY reservation_date DESC
LIMIT 5;

-- View 19 Case 2
SELECT * 
FROM view_cancelled_reservations
WHERE status <> 'Cancelled';
