INSERT INTO Restaurant (name, location, email, opening_time, closing_time) VALUES
('Bella Italia', 'Toronto, ON', 'contact@bellaitalia.ca', '11:00', '23:00'),
('SpiceHub', 'Ottawa, ON', 'hello@spicehub.ca', '10:00', '22:00'),
('SushiWorld', 'Montreal, QC', 'info@sushiworld.ca', '12:00', '21:00'),
('UrbanGrill', 'Vancouver, BC', 'team@urbangrill.ca', '10:00', '23:00'),
('TacoTown', 'Calgary, AB', 'hola@tacotown.ca', '11:00', '22:00'),
('BurgerPoint', 'Halifax, NS', 'hi@burgerpoint.ca', '09:00', '21:00');

-- ─────────────────────────────────────────────────────────────
-- TABLE INFO  (≥ 6 total; we'll add 4 per restaurant = 24)
INSERT INTO Table_Info (restaurant_id, capacity, table_number)
SELECT r.restaurant_id, v.capacity, v.table_number
FROM (
  SELECT 'Bella Italia' AS rname, 2 AS capacity, 1 AS table_number UNION ALL
  SELECT 'Bella Italia', 4, 2 UNION ALL
  SELECT 'Bella Italia', 4, 3 UNION ALL
  SELECT 'Bella Italia', 6, 4 UNION ALL

  SELECT 'SpiceHub', 2, 1 UNION ALL
  SELECT 'SpiceHub', 4, 2 UNION ALL
  SELECT 'SpiceHub', 6, 3 UNION ALL
  SELECT 'SpiceHub', 4, 4 UNION ALL

  SELECT 'SushiWorld', 2, 1 UNION ALL
  SELECT 'SushiWorld', 4, 2 UNION ALL
  SELECT 'SushiWorld', 2, 3 UNION ALL
  SELECT 'SushiWorld', 6, 4 UNION ALL

  SELECT 'UrbanGrill', 2, 1 UNION ALL
  SELECT 'UrbanGrill', 4, 2 UNION ALL
  SELECT 'UrbanGrill', 6, 3 UNION ALL
  SELECT 'UrbanGrill', 8, 4 UNION ALL

  SELECT 'TacoTown', 2, 1 UNION ALL
  SELECT 'TacoTown', 4, 2 UNION ALL
  SELECT 'TacoTown', 4, 3 UNION ALL
  SELECT 'TacoTown', 6, 4 UNION ALL

  SELECT 'BurgerPoint', 2, 1 UNION ALL
  SELECT 'BurgerPoint', 4, 2 UNION ALL
  SELECT 'BurgerPoint', 4, 3 UNION ALL
  SELECT 'BurgerPoint', 6, 4
) v
JOIN Restaurant r ON r.name = v.rname;

-- ─────────────────────────────────────────────────────────────
-- CUSTOMERS (≥ 6; we'll insert 10)
INSERT INTO Customer (full_name, email, phone) VALUES
('Jane Doe', 'jane.doe@example.com', '416-555-1001'),
('John Smith', 'john.smith@example.com', '613-555-1002'),
('Ava Li', 'ava.li@example.com', '514-555-1003'),
('Noah Martin', 'noah.martin@example.com', '604-555-1004'),
('Emma Wilson', 'emma.wilson@example.com', '403-555-1005'),
('Liam Patel', 'liam.patel@example.com', '902-555-1006'),
('Olivia Nguyen', 'olivia.nguyen@example.com', '647-555-1007'),
('Mason Clark', 'mason.clark@example.com', '343-555-1008'),
('Sophia Chen', 'sophia.chen@example.com', '438-555-1009'),
('Ethan Brown', 'ethan.brown@example.com', '236-555-1010');

-- ─────────────────────────────────────────────────────────────
-- CUISINE (≥ 6)
INSERT INTO Cuisine (cuisine_name) VALUES
('Italian'), ('Indian'), ('Japanese'), ('American Grill'),
('Mexican'), ('Burgers');

-- Map cuisine names to restaurants (Restaurant_Cuisine) (≥ 6; we'll add many)
INSERT INTO Restaurant_Cuisine (restaurant_id, cuisine_id)
SELECT r.restaurant_id, c.cuisine_id
FROM (
  SELECT 'Bella Italia' AS rname, 'Italian' AS cname UNION ALL
  SELECT 'SpiceHub', 'Indian' UNION ALL
  SELECT 'SushiWorld', 'Japanese' UNION ALL
  SELECT 'UrbanGrill', 'American Grill' UNION ALL
  SELECT 'TacoTown', 'Mexican' UNION ALL
  SELECT 'BurgerPoint', 'Burgers' UNION ALL
  -- add a few secondary pairings
  SELECT 'UrbanGrill', 'Burgers' UNION ALL
  SELECT 'Bella Italia', 'American Grill' UNION ALL
  SELECT 'SpiceHub', 'Mexican'
) v
JOIN Restaurant r ON r.name = v.rname
JOIN Cuisine c ON c.cuisine_name = v.cname;

-- ─────────────────────────────────────────────────────────────
-- RESERVATIONS (≥ 6; we'll add 18 with lunch/dinner variety, Oct–Nov 2025)

-- Helper inline view to resolve (restaurant,table_number) → table_id
-- Then insert reservations by readable names, using subqueries for FKs.

INSERT INTO Reservation (customer_id, restaurant_id, table_id, reservation_date, start_time, end_time, num_people, status)
VALUES
-- Bella Italia (Toronto) - lunch & dinner
(
  (SELECT customer_id FROM Customer WHERE email='jane.doe@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='Bella Italia'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='Bella Italia' AND t.table_number=2),
  '2025-10-18', '12:00', '13:30', 2, 'Booked'
),
(
  (SELECT customer_id FROM Customer WHERE email='john.smith@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='Bella Italia'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='Bella Italia' AND t.table_number=4),
  '2025-10-18', '19:00', '20:30', 5, 'Booked'
),

-- SpiceHub (Ottawa)
(
  (SELECT customer_id FROM Customer WHERE email='ava.li@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='SpiceHub'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='SpiceHub' AND t.table_number=3),
  '2025-10-19', '12:30', '14:00', 4, 'Booked'
),
(
  (SELECT customer_id FROM Customer WHERE email='noah.martin@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='SpiceHub'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='SpiceHub' AND t.table_number=2),
  '2025-10-20', '18:30', '20:00', 4, 'Booked'
),

-- SushiWorld (Montreal)
(
  (SELECT customer_id FROM Customer WHERE email='emma.wilson@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='SushiWorld'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='SushiWorld' AND t.table_number=2),
  '2025-10-21', '12:15', '13:30', 2, 'Booked'
),
(
  (SELECT customer_id FROM Customer WHERE email='liam.patel@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='SushiWorld'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='SushiWorld' AND t.table_number=4),
  '2025-10-22', '19:15', '20:45', 6, 'Booked'
),

-- UrbanGrill (Vancouver)
(
  (SELECT customer_id FROM Customer WHERE email='olivia.nguyen@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='UrbanGrill'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='UrbanGrill' AND t.table_number=1),
  '2025-10-23', '12:00', '13:00', 2, 'Booked'
),
(
  (SELECT customer_id FROM Customer WHERE email='mason.clark@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='UrbanGrill'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='UrbanGrill' AND t.table_number=4),
  '2025-10-24', '19:30', '21:00', 7, 'Booked'
),

-- TacoTown (Calgary)
(
  (SELECT customer_id FROM Customer WHERE email='sophia.chen@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='TacoTown'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='TacoTown' AND t.table_number=3),
  '2025-10-25', '13:00', '14:00', 3, 'Booked'
),
(
  (SELECT customer_id FROM Customer WHERE email='ethan.brown@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='TacoTown'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='TacoTown' AND t.table_number=4),
  '2025-10-26', '18:45', '20:15', 5, 'Booked'
),

-- BurgerPoint (Halifax)
(
  (SELECT customer_id FROM Customer WHERE email='jane.doe@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='BurgerPoint'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='BurgerPoint' AND t.table_number=2),
  '2025-10-27', '12:10', '13:00', 2, 'Booked'
),
(
  (SELECT customer_id FROM Customer WHERE email='john.smith@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='BurgerPoint'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='BurgerPoint' AND t.table_number=4),
  '2025-10-28', '19:00', '20:30', 6, 'Booked'
),

-- A few early Nov reservations to cover the next phase
(
  (SELECT customer_id FROM Customer WHERE email='ava.li@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='Bella Italia'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='Bella Italia' AND t.table_number=3),
  '2025-11-01', '12:20', '13:20', 3, 'Booked'
),
(
  (SELECT customer_id FROM Customer WHERE email='noah.martin@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='SpiceHub'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='SpiceHub' AND t.table_number=4),
  '2025-11-01', '19:10', '20:40', 4, 'Booked'
),
(
  (SELECT customer_id FROM Customer WHERE email='emma.wilson@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='SushiWorld'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='SushiWorld' AND t.table_number=1),
  '2025-11-02', '12:05', '13:05', 2, 'Booked'
),
(
  (SELECT customer_id FROM Customer WHERE email='liam.patel@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='UrbanGrill'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='UrbanGrill' AND t.table_number=3),
  '2025-11-02', '19:20', '20:50', 6, 'Booked'
),
(
  (SELECT customer_id FROM Customer WHERE email='olivia.nguyen@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='TacoTown'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='TacoTown' AND t.table_number=2),
  '2025-11-03', '12:30', '13:15', 4, 'Booked'
),
(
  (SELECT customer_id FROM Customer WHERE email='mason.clark@example.com'),
  (SELECT restaurant_id FROM Restaurant WHERE name='BurgerPoint'),
  (SELECT t.table_id FROM Table_Info t JOIN Restaurant r ON r.restaurant_id=t.restaurant_id
    WHERE r.name='BurgerPoint' AND t.table_number=1),
  '2025-11-03', '18:30', '19:45', 2, 'Booked'
);

-- DONE.
