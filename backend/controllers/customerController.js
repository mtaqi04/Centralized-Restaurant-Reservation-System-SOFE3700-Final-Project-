export async function createCustomer(req, res) {
  try {
    const { full_name, email, phone } = req.body;
    const [result] = await global.db.execute(
      "INSERT INTO Customer (full_name, email, phone) VALUES (?, ?, ?)",
      [full_name, email, phone]
    );
    res.status(201).json({ customer_id: result.insertId });
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function listCustomers(_req, res) {
  try {
    const [rows] = await global.db.execute("SELECT * FROM Customer");
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function updateCustomer(req, res) {
  try {
    const { id } = req.params;
    const { full_name, email, phone } = req.body;
    await global.db.execute(
      "UPDATE Customer SET full_name=?, email=?, phone=? WHERE customer_id=?",
      [full_name, email, phone, id]
    );
    res.json({ updated: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function deleteCustomer(req, res) {
  try {
    const { id } = req.params;
    await global.db.execute("DELETE FROM Customer WHERE customer_id=?", [id]);
    res.json({ deleted: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
}