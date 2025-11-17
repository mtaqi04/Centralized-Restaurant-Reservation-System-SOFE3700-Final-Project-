import React from "react";
const { useState, useEffect } = React;

export function NewReservationForm() {
  const [form, setForm] = useState({
    customer_id: "",
    restaurant_id: "",
    reservation_date: "",
    start_time: "",
    end_time: "",
    table_id: "",
    num_people: "",
    customer_name: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/post/new-reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("Response:", data);
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="number"
        name="customer_id"
        placeholder="Customer ID"
        value={form.customer_id}
        onChange={handleChange}
        required
      />

      <input 
        type="text"
        name="customer_name"
        placeholder="Full Name"
        value={form.customer_name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="restaurant_id"
        placeholder="Restaurant ID"
        value={form.restaurant_id}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="reservation_date"
        value={form.reservation_date}
        onChange={handleChange}
        required
      />

      <input
        type="time"
        name="start_time"
        value={form.start_time}
        onChange={handleChange}
        required
      />

      <input
        type="time"
        name="end_time"
        value={form.end_time}
        onChange={handleChange}
      />

      <input
        type="number"
        name="table_id"
        placeholder="Table ID"
        value={form.table_id}
        onChange={handleChange}
      />

      <input
        type="number"
        name="num_people"
        placeholder="# of People"
        value={form.num_people}
        onChange={handleChange}
      />

      <button type="submit">Create Reservation</button>
    </form>
  );
}

export function NewCustomerForm() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password:"",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/post/new-customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("Response:", data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="full_name"
        placeholder="Full Name"
        value={form.full_name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        required
        min="0"
        max="999999999"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Create Customer</button>
    </form>
  );
}

export function NewRestaurantForm() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    email: "",
    opening_time: "",
    closing_time: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/post/new-restaurant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("Response:", data);
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Restaurant Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="time"
        name="opening_time"
        value={form.opening_time}
        onChange={handleChange}
        required
      />

      <input
        type="time"
        name="closing_time"
        value={form.closing_time}
        onChange={handleChange}
        required
      />

      <button type="submit">Create Restaurant</button>
    </form>
  );
}