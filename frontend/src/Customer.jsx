import React from "react";
const { useState, useEffect } = React;

function ViewCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
    // call your Node backend
    fetch("http://localhost:3000/customers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch customers");
        return res.json();
      })
      .then((data) => {
        setCustomers(data);
        setLoading(false);
        //console.log(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load customers");
        setLoading(false);
      });
  }, []);


  if (loading) return <p>Loading customers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Customers</h2>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table border="1" cellPadding="4">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone #</th>
              {/* add more cols as needed */}
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.customer_id}>
                <td>{c.customer_id}</td>
                <td>{c.full_name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewCustomers;