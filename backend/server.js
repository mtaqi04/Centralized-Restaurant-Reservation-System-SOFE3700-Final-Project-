import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import { config } from './config/config.js';
import { getPool, verifyConnection } from './models/db.js';
import reservationRoutes from './routes/reservationRoutes.js';
import authRoutes from "./routes/authRoutes.js";



const app = express();
app.use(express.json());

app.use('/api/reservations', reservationRoutes);

// Register your auth routes
app.use("/api/auth", authRoutes);

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