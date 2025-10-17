-- Optional performance indexes
CREATE INDEX IF NOT EXISTS idx_reservation_restaurant_date
  ON Reservation (restaurant_id, reservation_date, start_time);