# SQL Validation Checklist

**Task 5.3**

---

## 1. Verification Summary

| Item | Description | Verified Screenshot |
|------|-------------|----------------------|
| Database creation | `CREATE DATABASE RestaurantDB;` executed successfully | `/docs/screenshots/Task_5.3/Task_5.3_Screenshot_2.png` |
| Table creation | All 6 tables (`Restaurant`, `Table_Info`, `Customer`, `Cuisine`, `Restaurant_Cuisine`, `Reservation`) created without errors | `/docs/screenshots/Task_5.3/Task_5.3_Screenshot_2.png` |
| Foreign keys | All foreign key constraints valid and functional | `/docs/screenshots/Task_5.3/Task_5.3_FK_Validation.png` |
| Data insertion test | Sample inserts verified; data retrieved successfully | `/docs/screenshots/Task_5./Data_Insert_Test` |

---

## 2. Commands Tested

### Creating Tables: 
```sql
DROP DATABASE IF EXISTS RestaurantDB;
CREATE DATABASE RestaurantDB;
USE RestaurantDB;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS Reservation;
DROP TABLE IF EXISTS Restaurant_Cuisine;
DROP TABLE IF EXISTS Table_Info;
DROP TABLE IF EXISTS Cuisine;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Restaurant;

SET FOREIGN_KEY_CHECKS = 1;

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

SHOW TABLES;
```

### Validating FK's:

```sql
USE RestaurantDB;

SELECT 
    TABLE_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'RestaurantDB'
AND REFERENCED_TABLE_NAME IS NOT NULL;
```

### Data Insertion Test:
```sql
USE RestaurantDB;

INSERT INTO Restaurant (name, location, email, opening_time, closing_time)
VALUES
('Restaurant 1', 'City A', 'contact@restaurant1.com', '09:00:00', '22:00:00'),
('Restaurant 2', 'City B', 'contact@restaurant2.com', '10:00:00', '21:00:00');

INSERT INTO Table_Info (restaurant_id, capacity, table_number)
VALUES
(1, 4, 1),
(1, 6, 2),
(2, 2, 1),
(2, 8, 2);

INSERT INTO Customer (full_name, email, phone)
VALUES
('Person 1', 'person1@email.com', '111-111-1111'),
('Person 2', 'person2@email.com', '222-222-2222'),
('Person 3', 'person3@email.com', '333-333-3333');

INSERT INTO Cuisine (cuisine_name)
VALUES
('Cuisine 1'),
('Cuisine 2'),
('Cuisine 3');

INSERT INTO Restaurant_Cuisine (restaurant_id, cuisine_id)
VALUES
(1, 1),
(1, 2),
(2, 3);

INSERT INTO Reservation (
    customer_id, restaurant_id, table_id, reservation_date, start_time, end_time, num_people
)
VALUES
(1, 1, 1, '2025-11-10', '18:00:00', '19:30:00', 2),
(2, 2, 3, '2025-11-11', '12:00:00', '13:30:00', 4),
(3, 1, 2, '2025-11-12', '20:00:00', '21:30:00', 3);

SELECT * FROM Restaurant;
SELECT * FROM Table_Info;
SELECT * FROM Customer;
SELECT * FROM Cuisine;
SELECT * FROM Restaurant_Cuisine;
SELECT * FROM Reservation;

DELETE FROM Restaurant WHERE restaurant_id = 2;

SELECT * FROM Table_Info;
SELECT * FROM Reservation;
```