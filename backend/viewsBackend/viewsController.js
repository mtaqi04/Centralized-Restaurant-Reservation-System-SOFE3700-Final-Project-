import { getPool } from '../models/db.js';
import { getWeatherForLocation } from '../WeatherAPI/weatherService.js';

//Common View 1
export async function views_all_reservations(req, res) {
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
            return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

//Common view 2
export async function getMaxReservations(req, res) {
    try {
        const pool = getPool();

        const [rows] = await pool.query(
            `
            SELECT * FROM view_req_any_all_groupby;
            `
        );

        return res.json(rows);
    } 
    catch (err) {
        console.log(err);
            return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

//Common view 3
export async function getGreaterThanAverageReservations(req, res) {
    try {
        const pool = getPool();

        const [rows] = await pool.query(
            `
            SELECT * FROM view_req_correlated_subquery ;
            `
        );

        return res.json(rows);
    } 
    catch (err) {
        console.log(err);
            return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

//Common View 4
export async function numOfReservationsByRestaurant(req, res) {
    try {
        const pool = getPool();

        const [rows] = await pool.query(
            `
            SELECT * FROM view_req_full_join;
            `
        );

        return res.json(rows);
    } 
    catch (err) {
        console.log(err);
            return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

//Common View 5
export async function viewAllEmails(req, res) {
    try {
        const pool = getPool();

        const [rows] = await pool.query(
            `
            SELECT * FROM view_all_contact_emails;
            `
        );

        return res.json(rows);
    } 
    catch (err) {
        console.log(err);
            return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};


//Custom Views

//Custom View 1
export async function averageReservation(req, res) {
    try {
        const pool = getPool();

        const [rows] = await pool.query(
            `
            SELECT * FROM view_avg_party_size;
            `
        );
        return res.json(rows);
    }
    catch (err) {
        console.log(err);
            return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

//Custom View 2
export async function reservationsByDay(req, res) {
    try {
        const pool = getPool();

        const [rows] = await pool.query(
            `
            SELECT * FROM view_reservations_per_day;
            `
        );
        return res.json(rows);
    }
    catch (err) {
        console.log(err);
            return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

//Custom View 3
export async function frequentCustomers(req, res) {
    try {
        const pool = getPool();

        const [rows] = await pool.query(
            `
            SELECT * FROM view_frequent_customers;
            `
        );
        return res.json(rows);
    }
    catch (err) {
        console.log(err);
            return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

//Custom View 4
export async function availableTables(req, res) {
    try {
        const pool = getPool();

        const [rows] = await pool.query(
            `
            SELECT * FROM view_available_tables_summary;
            `
        );
        return res.json(rows);
    }
    catch (err) {
        console.log(err);
            return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};

//Custom View 5
export async function openLate(req, res) {
    try {
        const pool = getPool();

        const [rows] = await pool.query(
            `
            SELECT * FROM view_late_restaurants;
            `
        );
        return res.json(rows);
    }
    catch (err) {
        console.log(err);
            return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }
};