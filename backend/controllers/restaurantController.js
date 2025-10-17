export async function createRestaurant(req, res) {
  try {
    const { name, location, email, opening_time, closing_time } = req.body;
    const [result] = await global.db.execute(
      "INSERT INTO Restaurant (name, location, email, opening_time, closing_time) VALUES (?, ?, ?, ?, ?)",
      [name, location, email, opening_time, closing_time]
    );
    res.status(201).json({ restaurant_id: result.insertId });
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function listRestaurants(_req, res) {
  try {
    const [rows] = await global.db.execute("SELECT * FROM Restaurant");
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function updateRestaurant(req, res) {
  try {
    const { id } = req.params;
    const { name, location, email, opening_time, closing_time } = req.body;
    await global.db.execute(
      "UPDATE Restaurant SET name=?, location=?, email=?, opening_time=?, closing_time=? WHERE restaurant_id=?",
      [name, location, email, opening_time, closing_time, id]
    );
    res.json({ updated: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function deleteRestaurant(req, res) {
  try {
    const { id } = req.params;
    await global.db.execute("DELETE FROM Restaurant WHERE restaurant_id=?", [id]);
    res.json({ deleted: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
}