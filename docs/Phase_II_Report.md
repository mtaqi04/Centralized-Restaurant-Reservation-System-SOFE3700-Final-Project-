## Phase II Report – Views Section

### 4. Views and Data Retrieval

This section presents ten SQL views created for the Restaurant Reservation System database. Each view is designed to simplify querying, improve maintainability, and provide quick access to key operational and analytical information. For each view, a description, SQL definition, and sample result are included.

---

### **View 1: view_full_reservation_info**

**Purpose:**
Displays a complete overview of reservations, including restaurant, customer, and table details.

**SQL Definition:**

```sql
CREATE VIEW view_full_reservation_info AS
SELECT rsv.reservation_id, c.full_name AS customer_name, rest.name AS restaurant_name,
       rsv.reservation_date, rsv.start_time, rsv.end_time, t.capacity, rsv.num_people, rsv.status
FROM Reservation rsv
JOIN Customer c ON rsv.customer_id = c.customer_id
JOIN Restaurant rest ON rsv.restaurant_id = rest.restaurant_id
JOIN Table_Info t ON rsv.table_id = t.table_id;
```

**Description:**
Provides unified reservation details for reports and dashboards.

**Sample Output:**
*(see `/screenshots/view_full_reservation_info.png`)*

---

### **View 2: view_popular_restaurants**

**Purpose:**
Shows restaurants ranked by total number of reservations.

**SQL Definition:**

```sql
CREATE VIEW view_popular_restaurants AS
SELECT r.restaurant_id, r.name AS restaurant_name, COUNT(rs.reservation_id) AS total_reservations
FROM Reservation rs
JOIN Restaurant r ON rs.restaurant_id = r.restaurant_id
GROUP BY r.restaurant_id, r.name
ORDER BY total_reservations DESC;
```

**Sample Output:**
*(see `/screenshots/view_popular_restaurants.png`)*

---

### **View 3: view_available_tables**

**Purpose:**
Lists tables that are not reserved for a given date.

**SQL Definition:**

```sql
CREATE VIEW view_available_tables AS
SELECT t.table_id, t.restaurant_id, r.name AS restaurant_name, t.table_number, t.capacity
FROM Table_Info t
JOIN Restaurant r ON r.restaurant_id = t.restaurant_id
WHERE t.table_id NOT IN (
    SELECT table_id FROM Reservation WHERE reservation_date = CURDATE()
);
```

**Sample Output:**
*(see `/screenshots/view_available_tables.png`)*

---

### **View 4: view_customer_history**

**Purpose:**
Displays a list of all past reservations made by each customer.

**SQL Definition:**

```sql
CREATE VIEW view_customer_history AS
SELECT c.full_name, r.name AS restaurant_name, rs.reservation_date, rs.num_people, rs.status
FROM Reservation rs
JOIN Customer c ON rs.customer_id = c.customer_id
JOIN Restaurant r ON rs.restaurant_id = r.restaurant_id
WHERE rs.reservation_date < CURDATE();
```

**Sample Output:**
*(see `/screenshots/view_customer_history.png`)*

---

### **View 5: view_cuisine_summary**

**Purpose:**
Summarizes how many restaurants offer each cuisine type.

**SQL Definition:**

```sql
CREATE VIEW view_cuisine_summary AS
SELECT c.cuisine_name, COUNT(rc.restaurant_id) AS total_restaurants
FROM Cuisine c
JOIN Restaurant_Cuisine rc ON c.cuisine_id = rc.cuisine_id
GROUP BY c.cuisine_name;
```

**Sample Output:**
*(see `/screenshots/view_cuisine_summary.png`)*

---

### **View 6: view_reservations_by_day**

**Purpose:**
Aggregates reservation counts by day of week.

**SQL Definition:**

```sql
CREATE VIEW view_reservations_by_day AS
SELECT DAYNAME(reservation_date) AS day_of_week, COUNT(*) AS total_reservations
FROM Reservation
GROUP BY DAYNAME(reservation_date)
ORDER BY total_reservations DESC;
```

**Sample Output:**
*(see `/screenshots/view_reservations_by_day.png`)*

---

### **View 7: view_active_bookings**

**Purpose:**
Displays all upcoming reservations.

**SQL Definition:**

```sql
CREATE VIEW view_active_bookings AS
SELECT rsv.reservation_id, c.full_name, rest.name AS restaurant_name,
       rsv.reservation_date, rsv.start_time, rsv.status
FROM Reservation rsv
JOIN Customer c ON rsv.customer_id = c.customer_id
JOIN Restaurant rest ON rsv.restaurant_id = rest.restaurant_id
WHERE rsv.reservation_date >= CURDATE() AND rsv.status = 'Booked';
```

**Sample Output:**
*(see `/screenshots/view_active_bookings.png`)*

---

### **View 8: view_table_utilization**

**Purpose:**
Shows number of reservations per table, useful for load analysis.

**SQL Definition:**

```sql
CREATE VIEW view_table_utilization AS
SELECT t.table_id, r.name AS restaurant_name, COUNT(rs.reservation_id) AS total_reservations
FROM Table_Info t
LEFT JOIN Reservation rs ON rs.table_id = t.table_id
JOIN Restaurant r ON r.restaurant_id = t.restaurant_id
GROUP BY t.table_id, r.name;
```

**Sample Output:**
*(see `/screenshots/view_table_utilization.png`)*

---

### **View 9: view_top_customers**

**Purpose:**
Identifies customers with the highest number of reservations.

**SQL Definition:**

```sql
CREATE VIEW view_top_customers AS
SELECT c.full_name, COUNT(rs.reservation_id) AS total_reservations
FROM Reservation rs
JOIN Customer c ON rs.customer_id = c.customer_id
GROUP BY c.full_name
ORDER BY total_reservations DESC;
```

**Sample Output:**
*(see `/screenshots/view_top_customers.png`)*

---

### **View 10: view_cancelled_reservations**

**Purpose:**
Lists all reservations that were cancelled.

**SQL Definition:**

```sql
CREATE VIEW view_cancelled_reservations AS
SELECT rs.reservation_id, c.full_name, r.name AS restaurant_name, rs.reservation_date, rs.status
FROM Reservation rs
JOIN Customer c ON rs.customer_id = c.customer_id
JOIN Restaurant r ON rs.restaurant_id = r.restaurant_id
WHERE rs.status = 'Cancelled';
```

**Sample Output:**
*(see `/screenshots/view_cancelled_reservations.png`)*

---