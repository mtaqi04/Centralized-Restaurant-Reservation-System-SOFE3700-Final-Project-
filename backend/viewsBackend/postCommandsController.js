import { getPool } from '../models/db.js';
import { getWeatherForLocation } from '../WeatherAPI/weatherService.js';

export async function p_createReservation(req, res) {
  try {
    const pool = getPool();

    const {
      customer_id,
      customer_name,        // <-- user input
      restaurant_id,
      reservation_date,
      start_time,
      end_time,
      table_id,
      num_people
    } = req.body;

    // 1. Check required fields
    if (!customer_id || !customer_name || !restaurant_id || !reservation_date || !start_time) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    // 2. Look up customer by ID
    const [customerRows] = await pool.query(
      `SELECT full_name FROM Customer WHERE customer_id = ?`,
      [customer_id]
    );

    // 3. If customer doesn't exist
    if (customerRows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Customer not found",
      });
    }

    const dbName = customerRows[0].full_name;

    // 4. Compare provided name with DB name
    if (dbName.trim().toLowerCase() !== customer_name.trim().toLowerCase()) {
      return res.status(400).json({
        status: "error",
        message: "Customer ID and customer name do not match",
      });
    }

    // 5. Insert reservation
    const [result] = await pool.query(
      `
      INSERT INTO Reservation 
        (customer_id, restaurant_id, reservation_date, start_time, end_time, table_id, num_people, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        customer_id,
        restaurant_id,
        reservation_date,
        start_time,
        end_time || null,
        table_id || null,
        num_people || 1,
        "Booked"
      ]
    );

    return res.status(201).json({
      status: "success",
      reservation_id: result.insertId
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Failed to create reservation"
    });
  }
}

export async function p_createCustomer(req, res) {
    try {
        const pool = getPool();

        const {
            full_name,
            email,
            phone,
        } = req.body;


        if (!full_name || !email || !phone) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields",
            });
        }

        
        // 1. Check email
        const [emailRows] = await pool.query(
            "SELECT customer_id FROM Customer WHERE email = ?",
            [email]
        );

        // 2. Check phone number
        const [phoneRows] = await pool.query(
            "SELECT customer_id FROM Customer WHERE phone = ?",
            [phone]
        );

        if (emailRows.length > 0) {
            return res.status(404).json({
                status: "error",
                message: "Account with this email already exists.",
            });
        };

        if (phoneRows.length > 0) {
            return res.status(404).json({
                status: "error",
                message: "Account with this phone number already exists."
            })
        };


        const [result] = await pool.query(
        `
            INSERT INTO Customer 
                (full_name, email, phone)
            VALUES (?, ?, ?)
        `,
        [
            full_name,
            email,
            phone,
        ]
        );

        return res.status(201).json({
        status: "success",
        customer_id: result.insertId
    });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
        status: "error",
        message: "Failed to create user"
        });
    }
}

export async function p_createRestaurant(req, res) {
  try {
    const pool = getPool();

    const {
      name,
      location,
      email,
      opening_time,
      closing_time
    } = req.body;

    // Check required fields
    if (!name || !location || !email || !opening_time || !closing_time) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields",
      });
    }

    // Insert new restaurant
    const [result] = await pool.query(
      `
      INSERT INTO Restaurant 
        (name, location, email, opening_time, closing_time)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        name,
        location,
        email,
        opening_time,
        closing_time
      ]
    );

    return res.status(201).json({
      status: "success",
      restaurant_id: result.insertId
    });

  } catch (err) {
    console.error("Error creating restaurant:", err);
    return res.status(500).json({
      status: "error",
      message: "Failed to create restaurant"
    });
  }
}