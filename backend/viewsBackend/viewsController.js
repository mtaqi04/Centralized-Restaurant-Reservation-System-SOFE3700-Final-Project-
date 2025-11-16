import { getPool } from '../models/db.js';
import { getWeatherForLocation } from '../services/weatherService.js';

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
    }
};