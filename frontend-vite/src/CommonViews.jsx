import React from "react";
const { useState, useEffect } = React;

export function AllReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // call your Node backend
    fetch("http://localhost:3000/views/all-reservations")
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

export function OverAverage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // call your Node backend
    fetch("http://localhost:3000/views/over-average")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reservations");
        return res.json();
      })
      .then((data) => {
        setRows(data);
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
      {rows.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table border="1" cellPadding="4">
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Customer ID</th>
              <th>Restaurant ID</th>
              <th>Reservation Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Table ID</th>
              <th># of People</th>
              <th>Status</th>
              {/* add more cols as needed */}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.reservation_id}>
                <td>{r.reservation_id}</td>
                <td>{r.customer_id}</td>
                <td>{r.restaurant_id}</td>
                <td>{r.reservation_date}</td>
                <td>{r.start_time}</td>
                <td>{r.end_time}</td>
                <td>{r.table_id}</td>
                <td>{r.num_people}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export function MaxReservations() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // call your Node backend
    fetch("http://localhost:3000/views/max-reservations")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reservations");
        return res.json();
      })
      .then((data) => {
        setRows(data);
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
      {rows.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table border="1" cellPadding="4">
          <thead>
            <tr>
              <th>Restaurant ID</th>
              <th>Restaurant Name</th>
              <th>Total Reservations</th>
              {/* add more cols as needed */}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, index) => (
              <tr key={r.index}>
                <td>{r.restaurant_id}</td>
                <td>{r.restaurant_name}</td>
                <td>{r.total_reservations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}