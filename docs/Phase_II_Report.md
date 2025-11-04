## Phase II Report – Restaurant Reservation System

### 1. Introduction and Goals

The Restaurant Reservation System was developed to streamline the process of managing restaurant reservations, customer data, and table allocations. The motivation behind this project is to reduce manual scheduling errors, prevent double-booking, and improve restaurant efficiency through data-driven insights.

The main objectives of the system are:

* To provide a centralized database for restaurant, customer, and reservation management.
* To ensure referential integrity across all relational entities.
* To support analytical queries and visual reporting using SQL views.
* To enable future integration with web and mobile applications for real-time updates.

---

### 2. Relational Schema and SQL Code

This section defines the relational schema, constraints, and data relationships used in the database. The design ensures data normalization and consistency across multiple interconnected entities.

**Key Design Features:**

* **Foreign Keys** maintain relationships between entities such as `Reservation`, `Customer`, and `Restaurant`.
* **Primary Keys** uniquely identify records across all tables.
* **Constraints** (e.g., `CHECK`, `UNIQUE`, `ENUM`) guarantee data validity.

**SQL Schema:**

```sql
CREATE TABLE Restaurant (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    email VARCHAR(100),
    opening_time TIME,
    closing_time TIME
);

CREATE TABLE Table_Info (
    table_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0),
    table_number INT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurant(restaurant_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20)
);

CREATE TABLE Cuisine (
    cuisine_id INT AUTO_INCREMENT PRIMARY KEY,
    cuisine_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Restaurant_Cuisine (
    restaurant_id INT NOT NULL,
    cuisine_id INT NOT NULL,
    PRIMARY KEY (restaurant_id, cuisine_id),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurant(restaurant_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (cuisine_id) REFERENCES Cuisine(cuisine_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Reservation (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    table_id INT NOT NULL,
    reservation_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    num_people INT NOT NULL CHECK (num_people > 0),
    status ENUM('Booked', 'Completed', 'Cancelled') DEFAULT 'Booked',
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurant(restaurant_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (table_id) REFERENCES Table_Info(table_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

**Screenshot Reference:**
*(see `/docs/screenshots/schema_creation_output.png`)*

---

### 3. ER Diagram

The Entity-Relationship (ER) diagram provides a visual overview of all entities and their relationships. It ensures database normalization and depicts how tables interconnect.

**Entity Summaries:**

* **Restaurant:** Stores details about each restaurant, including operating hours.
* **Customer:** Contains personal and contact details for reservation tracking.
* **Reservation:** Manages booking details, connecting customers and restaurants.
* **Table_Info:** Represents tables with capacity and numbering.
* **Cuisine & Restaurant_Cuisine:** Define restaurant categories and their associations.

**ER Diagram:**
![Figure 3.1 – ER Diagram of the Restaurant Reservation System](../docs/ER_Diagram.png)

---

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
*(see `/docs/screenshots/view_full_reservation_info.png`)*

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
*(see `/docs/screenshots/view_popular_restaurants.png`)*

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
*(see `/docs/screenshots/view_available_tables.png`)*

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
*(see `/docs/screenshots/view_customer_history.png`)*

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
*(see `/docs/screenshots/view_cuisine_summary.png`)*

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
*(see `/docs/screenshots/view_reservations_by_day.png`)*

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
*(see `/docs/screenshots/view_active_bookings.png`)*

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
*(see `/docs/screenshots/view_table_utilization.png`)*

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
*(see `/docs/screenshots/view_top_customers.png`)*

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
*(see `/docs/screenshots/view_cancelled_reservations.png`)*

---

### 5. Contribution Matrix

| Team Member   | Section(s) Contributed | Description of Work                                   |
| ------------- | ---------------------- | ----------------------------------------------------- |
| Mohammad Taqi | Document Lead, Views   | Authored report, integrated SQL, coordinated sections |
| Ayaan Ahmed   | Screenshots, Testing   | Captured database outputs and visual evidence         |
| Mohamed T.Omar| Schema & Integrity     | Developed and tested constraints and relationships    |
| Ali Hakkani   | Report Formatting, ERD | Created ER diagram and formatted report structure     |

---

### 6. Conclusion

The Phase II implementation successfully integrates schema design, referential integrity, and analytical data views for the Restaurant Reservation System. Each module of the project aligns with database management principles, enabling efficient querying, strong data consistency, and readiness for future application development.

**Next Steps:**

* Implement stored procedures for automated booking conflict checks.
* Connect to a web front-end for user-based reservation management.
* Extend analytics to track daily performance trends and cancellation ratios.

**End of Report**
 