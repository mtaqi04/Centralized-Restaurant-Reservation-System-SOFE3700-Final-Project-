-- Core schema
CREATE TABLE IF NOT EXISTS Restaurant (
  restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(150),
  email VARCHAR(100),
  opening_time TIME,
  closing_time TIME
);

CREATE TABLE IF NOT EXISTS Customer (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS Reservation (
  reservation_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  restaurant_id INT,
  reservation_date DATE,
  start_time TIME,
  end_time TIME,
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
  FOREIGN KEY (restaurant_id) REFERENCES Restaurant(restaurant_id)
);

CREATE TABLE IF NOT EXISTS Table_Info (
  table_id INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id INT NOT NULL,
  capacity INT NOT NULL,
  table_number INT NOT NULL,
  UNIQUE KEY uk_restaurant_table (restaurant_id, table_number),
  FOREIGN KEY (restaurant_id) REFERENCES Restaurant(restaurant_id)
);

CREATE TABLE IF NOT EXISTS Cuisine (
  cuisine_id INT AUTO_INCREMENT PRIMARY KEY,
  cuisine_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Restaurant_Cuisine (
  restaurant_id INT NOT NULL,
  cuisine_id INT NOT NULL,
  PRIMARY KEY (restaurant_id, cuisine_id),
  FOREIGN KEY (restaurant_id) REFERENCES Restaurant(restaurant_id),
  FOREIGN KEY (cuisine_id) REFERENCES Cuisine(cuisine_id)
);

ALTER TABLE Reservation
  ADD COLUMN table_id INT NULL,
  ADD COLUMN num_people INT NULL,
  ADD COLUMN status ENUM('Booked','Cancelled','Completed') DEFAULT 'Booked',
  ADD CONSTRAINT fk_res_table FOREIGN KEY (table_id) REFERENCES Table_Info(table_id);