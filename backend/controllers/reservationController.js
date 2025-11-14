// backend/controllers/reservationController.js
import { getPool } from '../models/db.js';
import { getWeatherForLocation } from '../services/weatherService.js';


export async function getAllReservations(req, res) {
  try {
    const pool = getPool();

    const [rows] = await pool.query(
      `
      SELECT * FROM views_all_reservations;
      `
    )
    return res.json(rows);
  }
  catch (err) {
    console.log(err);
  }
}

export async function getReservation(req, res) {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid reservation ID' });
  }

  try {
    const pool = getPool();
    const [rows] = await pool.query(
      `
      SELECT
        res.reservation_id,
        res.reservation_date,
        res.start_time,
        res.end_time,
        res.num_people,
        res.status,
        c.customer_id,
        c.full_name    AS customer_name,
        c.email        AS customer_email,
        c.phone        AS customer_phone,
        r.restaurant_id,
        r.name         AS restaurant_name,
        r.location     AS restaurant_location,
        t.table_id,
        t.table_number,
        t.capacity     AS table_capacity
      FROM Reservation res
      JOIN Customer   c ON res.customer_id = c.customer_id
      JOIN Restaurant r ON res.restaurant_id = r.restaurant_id
      JOIN Table_Info t ON res.table_id = t.table_id
      WHERE res.reservation_id = ?
      LIMIT 1;
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    const row = rows[0];

    // Fetch weather based on restaurant location (non-blocking for core data)
    const weather = await getWeatherForLocation(row.restaurant_location);

    const response = {
      reservation_id: row.reservation_id,
      reservation: {
        date: row.reservation_date,
        start_time: row.start_time,
        end_time: row.end_time,
        num_people: row.num_people,
        status: row.status,
      },
      customer: {
        id: row.customer_id,
        name: row.customer_name,
        email: row.customer_email,
        phone: row.customer_phone,
      },
      restaurant: {
        id: row.restaurant_id,
        name: row.restaurant_name,
        location: row.restaurant_location,
      },
      table: {
        id: row.table_id,
        number: row.table_number,
        capacity: row.table_capacity,
      },
      weather: weather || {
        available: false,
        reason: 'Weather data unavailable or API error',
      },
    };

    return res.json(response);
  } catch (err) {
    console.error('[ReservationController] Error fetching reservation:', err);
    return res
      .status(500)
      .json({ error: 'Internal server error while fetching reservation' });
  }
}
