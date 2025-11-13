import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import { config } from './config/config.js';
import { getPool, verifyConnection } from './models/db.js';
import reservationRoutes from './routes/reservationRoutes.js';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

app.use('/api/reservations', reservationRoutes);

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
// const server = app.listen(config.port, async () => {
//   console.log(`🚀 Server running on http://localhost:${config.port} [${config.env}]`);
//   try {
//     const pool = getPool();
//     const [db] = await pool.query('SELECT DATABASE() AS db');
//     console.log(`✅ Connected to MySQL database: ${db[0].db || config.db.database}`);
//   } catch (err) {
//     console.error('❌ Database connection failed at startup:', err.message);
//   }
// });

const server = app.listen(config.port, async () => {
  console.log(`🚀 Server running on http://localhost:${config.port} [${config.env}]`);
  try {
    const pool = getPool();

    // 1) Ensure we’re connected
    const [db] = await pool.query('SELECT DATABASE() AS db');
    console.log(`✅ Connected to MySQL database: ${db[0].db || config.db.database}`);

    // 2) Load and execute schema.sql
    const schemaPath = path.join(process.cwd(), 'sql/schema.sql'); // from project root
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    await pool.query(schemaSql);
    console.log('✅ Schema successfully loaded into MySQL (Railway).');
  } catch (err) {
    console.error('❌ Database connection failed at startup or schema load:', err.message);
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
