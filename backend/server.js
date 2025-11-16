import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import express from 'express';
import { config } from './config/config.js';
import { getPool, verifyConnection } from './models/db.js';
import { getWeatherForLocation, insertWeatherDB } from "./WeatherAPI/weatherService.js";
import reservationRoutes from './routes/reservationRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import postCommandRoutes from "./viewsBackend/postCommandsRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { getAllReservations } from "./controllers/reservationController.js";
import viewsRoutes from "./viewsBackend/viewsRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));
app.use('/api/reservations', reservationRoutes);
app.use(cors({
  origin: "http://localhost:5173",  // allow your Vite dev server
}));

// Register your auth routes
app.use("/api/auth", authRoutes);



//Common Views
app.use('/views', viewsRoutes);

//Post Commands
app.use('/post', postCommandRoutes);
















app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

// Simple health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// DB ping endpoint for quick verification
app.get('/db/ping', async (req, res) => {
  try {
    const result = await verifyConnection();
    res.status(200).json({ status: 'connected', result });
  } catch (err) {
    console.error('[DB PING ERROR]', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/api/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    console.log("City:", req.params.city);
    const result = await getWeatherForLocation(city);
    return res.json(result);
  } catch (err) {
    console.error("Couldn't find weather");
    res.status(500).json({status: "error", message: err.message});
  }
});

app.use("/reservations", reservationRoutes);
app.use("/customers", customerRoutes);

app.get('/api/all-restaurant-weather', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      `SELECT DISTINCT location AS city
        FROM Restaurant
        WHERE location IS NOT NULL AND location <> '';
      `
    );

    const cities = rows.map(r => r.city);

    const results = [];
    for (const city of cities) {
      try {
        const weather = await getWeatherForLocation(city);
        await insertWeatherDB(weather);
        results.push({ ok: true, city, data: weather });
      } catch (e) {
        results.push({ ok: false, city, error: e.message });
      }
    }

    return res.json({
      count: cities.length,
      ok: results.filter(r => r.ok).length,
      fail: results.filter(r => !r.ok).length,
      results
    });
  } catch (err) {
    console.error("Couldn't find weather");
    res.status(500).json({status: "error", message: err.message});
  }
});

// Start server
const server = app.listen(config.port, async () => {
  console.log(`🚀 Server running on http://localhost:${config.port} [${config.env}]`);
  try {
    const pool = getPool();
    const [db] = await pool.query('SELECT DATABASE() AS db');
    console.log(`✅ Connected to MySQL database: ${db[0].db || config.db.database}`);
  } catch (err) {
    console.error('❌ Database connection failed at startup:', err.message);
  }
});

// Graceful shutdown
function shutdown(signal) {
  console.log(`\n${signal} received. Closing server...`);
  server.close(async () => {
    try {
      const pool = getPool();
      await pool.end();
      console.log('🛑 MySQL pool closed.');
    } catch (e) {
      console.error('Error closing MySQL pool:', e);
    } finally {
      process.exit(0);
    }
  });
}
['SIGINT', 'SIGTERM'].forEach(s => process.on(s, () => shutdown(s)));
// Testing changing msall things