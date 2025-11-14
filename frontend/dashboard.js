const { useState, useEffect } = React;

function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // call your Node backend
    fetch("http://localhost:3000/reservations/get-all")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reservations");
        return res.json();
      })
      .then((data) => {
        setReservations(data);
        setLoading(false);
        //console.log(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load reservations");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading reservations...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Reservations Dashboard</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table border="1" cellPadding="4">
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Reservation Date</th>
              <th>Start Time</th>
              <th>Customer Name</th>
              <th>Restaurant Name</th>
              <th>Table #</th>
              {/* add more cols as needed */}
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.reservation_id}>
                <td>{r.reservation_id}</td>
                <td>{r.reservation_date}</td>
                <td>{r.start_time}</td>
                <td>{r.customer_name}</td>
                <td>{r.restaurant_name}</td>
                <td>{r.table_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;