import mysql from 'mysql2/promise';
import { config } from '../config/config.js';

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool(config.db);
  }
  return pool;
}

/** Verifies DB connectivity and logs a simple SELECT 1 */
export async function verifyConnection() {
  const pool = getPool();
  const [rows] = await pool.query('SELECT 1 AS ok');
  if (!rows?.[0]?.ok) throw new Error('DB ping failed');
  return rows[0];
}
