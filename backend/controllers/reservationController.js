export async function createReservation(req, res) {
  try {
    const { customer_id, restaurant_id, reservation_date, start_time, end_time } = req.body;
    const [result] = await global.db.execute(
      "INSERT INTO Reservation (customer_id, restaurant_id, reservation_date, start_time, end_time) VALUES (?, ?, ?, ?, ?)",
      [customer_id, restaurant_id, reservation_date, start_time, end_time]
    );
    res.status(201).json({ reservation_id: result.insertId });
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function listReservations(_req, res) {
  try {
    const [rows] = await global.db.execute("SELECT * FROM Reservation");
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function getReservation(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await global.db.execute("SELECT * FROM Reservation WHERE reservation_id=?", [id]);
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function updateReservation(req, res) {
  try {
    const { id } = req.params;
    const { reservation_date, start_time, end_time } = req.body;
    await global.db.execute(
      "UPDATE Reservation SET reservation_date=?, start_time=?, end_time=? WHERE reservation_id=?",
      [reservation_date, start_time, end_time, id]
    );
    res.json({ updated: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
}

export async function deleteReservation(req, res) {
  try {
    const { id } = req.params;
    await global.db.execute("DELETE FROM Reservation WHERE reservation_id=?", [id]);
    res.json({ deleted: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
}