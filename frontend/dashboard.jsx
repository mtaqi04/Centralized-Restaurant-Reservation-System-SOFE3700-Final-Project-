import { useEffect, useState } from "react";

function Dashboard() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch("http://localhost/get-reservations.php")
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error("Failed to load reservations", err));
  }, []);

  return (
    <div>
      <h1>Reservations Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Restaurant</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => (
            <tr key={r.reservation_id}>
              <td>{r.reservation_id}</td>
              <td>{r.full_name}</td>
              <td>{r.restaurant_name}</td>
              <td>{r.reservation_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
