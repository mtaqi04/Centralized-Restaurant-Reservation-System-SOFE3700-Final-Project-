import mysql from 'mysql2/promise';
import { config } from '../config/config.js';

let pool;

export function getPool() {
  if (!pool) {
    console.log("🔍 Using DB config:", {
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password ? "***" : "(empty)",
      database: config.db.database,
      connectionLimit: config.db.connectionLimit
    });

    try {
      pool = mysql.createPool(config.db);
      console.log("✅ MySQL pool created.");
    } catch (err) {
      console.error("❌ Pool creation error:", err);
    }
    pool = mysql.createPool({
      ...config.db,
      multipleStatements: true,
    });
  }
  return pool;
}

export async function verifyConnection() {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT 1 AS ok');
    
    if (!rows?.[0]?.ok) {
      throw new Error('DB ping returned invalid response');
    }

    console.log("✅ DB ping successful:", rows[0]);
    return rows[0];

  } catch (err) {
    console.error("❌ DB ping failed:", err);
    throw err;
  }
}
