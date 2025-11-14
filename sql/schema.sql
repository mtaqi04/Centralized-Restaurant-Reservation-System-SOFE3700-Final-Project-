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

-- Table_Info must exist before Reservation because Reservation has a FK to it
CREATE TABLE IF NOT EXISTS Table_Info (
  table_id INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id INT NOT NULL,
  capacity INT NOT NULL,
  table_number INT NOT NULL,
  UNIQUE KEY uk_restaurant_table (restaurant_id, table_number),
  FOREIGN KEY (restaurant_id) REFERENCES Restaurant(restaurant_id)
);

CREATE TABLE IF NOT EXISTS Reservation (
  reservation_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  restaurant_id INT,
  reservation_date DATE,
  start_time TIME,
  end_time TIME,
  table_id INT NULL,
  num_people INT NULL,
  status ENUM('Booked','Cancelled','Completed') DEFAULT 'Booked',
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
  FOREIGN KEY (restaurant_id) REFERENCES Restaurant(restaurant_id),
  CONSTRAINT fk_res_table FOREIGN KEY (table_id) REFERENCES Table_Info(table_id)
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

CREATE TABLE IF NOT EXISTS Weather_Cache_City (
  city                   VARCHAR(150) PRIMARY KEY,              -- e.g., matches Restaurant.location
  temperature            DECIMAL(4,1)      NOT NULL,
  feels_like             DECIMAL(4,1)      NULL,
  humidity               TINYINT UNSIGNED  NULL,                -- %
  wind_speed             DECIMAL(4,1)      NULL,                -- m/s (OWM default with metric)
  cloud_coverage         TINYINT UNSIGNED  NULL,                -- %
  description            VARCHAR(80)       NULL,                -- e.g., "broken clouds"
  icon                   VARCHAR(8)        NULL,                -- e.g., "04d"
  units                  ENUM('metric','imperial','standard') NOT NULL DEFAULT 'metric',
  source                 ENUM('owm')       NOT NULL DEFAULT 'owm',
  fetched_at             DATETIME          NOT NULL,            -- when you fetched it
  raw_response           JSON              NULL,                -- optional full OWM payload
  KEY idx_fetched_at (fetched_at)
);
