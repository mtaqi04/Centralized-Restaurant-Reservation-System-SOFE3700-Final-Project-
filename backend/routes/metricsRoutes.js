import { Router } from "express";
import { getPool } from "../models/db.js";

const r = Router();

// GET /api/metrics/reservations-by-restaurant
r.get("/reservations-by-restaurant", async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT restaurant_name, total_reservations FROM view_popular_restaurants"
    );
    res.json(rows);
  } catch (err) {
    console.error("[metrics:by-restaurant]", err);
    res.status(500).json({ error: "Failed to load metrics" });
  }
});

// GET /api/metrics/reservations-by-day
r.get("/reservations-by-day", async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT day_of_week, total_reservations FROM view_reservations_by_day"
    );
    res.json(rows);
  } catch (err) {
    console.error("[metrics:by-day]", err);
    res.status(500).json({ error: "Failed to load metrics" });
  }
});

export default r;
