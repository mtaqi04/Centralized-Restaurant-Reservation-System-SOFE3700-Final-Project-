--1--
CREATE OR REPLACE VIEW views_all_reservations AS
SELECT
  r.reservation_id,
  r.reservation_date,
  r.start_time,
  c.full_name     AS customer_name,
  rs.name         AS restaurant_name,
  t.table_number
FROM Reservation r
JOIN Customer   c  ON c.customer_id    = r.customer_id
JOIN Restaurant rs ON rs.restaurant_id = r.restaurant_id
LEFT JOIN Table_Info t ON t.table_id   = r.table_id;
--2--
-- Restaurants with the MAX reservation count (uses ALL)
CREATE OR REPLACE VIEW view_req_any_all_groupby AS
SELECT x.restaurant_id,
       x.restaurant_name,
       x.total_reservations
FROM (
  SELECT r.restaurant_id,
         r.name AS restaurant_name,
         COUNT(res.reservation_id) AS total_reservations
  FROM Restaurant r
  LEFT JOIN Reservation res ON res.restaurant_id = r.restaurant_id
  GROUP BY r.restaurant_id, r.name
) AS x
WHERE x.total_reservations >= ALL (
  SELECT COUNT(res2.reservation_id)
  FROM Restaurant r2
  LEFT JOIN Reservation res2 ON res2.restaurant_id = r2.restaurant_id
  GROUP BY r2.restaurant_id
);
--3--
CREATE OR REPLACE VIEW view_req_correlated_subquery AS
SELECT res.*
FROM Reservation res
WHERE res.num_people >
  (
    SELECT AVG(res2.num_people)
    FROM Reservation res2
    WHERE res2.restaurant_id = res.restaurant_id
  );
--4--
-- MySQL doesn't have FULL OUTER JOIN; emulate via LEFT JOIN UNION RIGHT-ONLY rows.
-- Matches restaurants with their reservation counts + restaurants with zero reservations.
CREATE OR REPLACE VIEW view_req_full_join AS
SELECT
  r.restaurant_id,
  r.name AS restaurant_name,
  COALESCE(COUNT(res.reservation_id), 0) AS total_reservations
FROM Restaurant r
LEFT JOIN Reservation res ON res.restaurant_id = r.restaurant_id
GROUP BY r.restaurant_id, r.name

UNION

SELECT
  r2.restaurant_id,
  r2.name AS restaurant_name,
  0 AS total_reservations
FROM Reservation res2
RIGHT JOIN Restaurant r2 ON res2.restaurant_id = r2.restaurant_id
WHERE res2.reservation_id IS NULL;
--5--
CREATE OR REPLACE VIEW view_all_contact_emails AS
SELECT email, 'Customer' AS source FROM Customer WHERE email IS NOT NULL
UNION
SELECT email, 'Restaurant' AS source FROM restaurant WHERE email IS NOT NULL;