import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });
    global.db = conn;
    console.log("✅ Connected to MySQL");
  } catch (e) {
    console.error("❌ DB connection failed:", e.message);
    process.exit(1);
  }
}