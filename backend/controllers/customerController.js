import { getPool } from '../models/db.js';

export async function createCustomer(req, res) {
  const pool = getPool();

  try {
    const { full_name, email, phone } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Customer (full_name, email, phone) VALUES (?, ?, ?)",
      [full_name, email, phone]
    );
    res.status(201).json({ customer_id: result.insertId });
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function listCustomers(_req, res) {
  const pool = getPool();

  try {
    const [rows] = await pool.query("SELECT * FROM Customer");
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function updateCustomer(req, res) {
  const pool = getPool();

  try {
    const { id } = req.params;
    const { full_name, email, phone } = req.body;
    await pool.query(
      "UPDATE Customer SET full_name=?, email=?, phone=? WHERE customer_id=?",
      [full_name, email, phone, id]
    );
    res.json({ updated: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function deleteCustomer(req, res) {

  const pool = getPool();

  try {
    const { id } = req.params;
    await pool.query("DELETE FROM Customer WHERE customer_id=?", [id]);
    res.json({ deleted: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
}