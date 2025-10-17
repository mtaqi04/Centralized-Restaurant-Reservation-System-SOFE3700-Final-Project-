#!/usr/bin/env bash
# init_repo.sh — bootstrap the Centralized Restaurant Reservation System repo (without creating outer dir)
# Usage: ./init_repo.sh [--force]
set -euo pipefail

FORCE=0
if [[ "${1:-}" == "--force" ]]; then
  FORCE=1
fi

# Root is the current directory (already inside Centralized-Restaurant-Reservation-System-SOFE3700-Final-Project-)
ROOT="."

msg()  { printf "\033[1;32m%s\033[0m\n" "$1"; }
warn() { printf "\033[1;33m%s\033[0m\n" "$1"; }
err()  { printf "\033[1;31m%s\033[0m\n" "$1"; }

mkd() {
  mkdir -p "$1"
  msg "📁  dir: $1"
}

# Write file unless it exists (unless --force is used)
write() {
  local path="$1"
  local content="$2"
  if [[ -e "$path" && $FORCE -eq 0 ]]; then
    warn "↩︎  skip (exists): $path"
    return 0
  fi
  printf "%s" "$content" > "$path"
  msg "📝 file: $path"
}

# ------------------------------------------------------------------------
# Directory structure
mkd "$ROOT/backend/routes"
mkd "$ROOT/backend/controllers"
mkd "$ROOT/backend/models"
mkd "$ROOT/backend/middleware"
mkd "$ROOT/backend/config"
mkd "$ROOT/backend/tests"

mkd "$ROOT/frontend"
mkd "$ROOT/sql"
mkd "$ROOT/docs/screenshots"
mkd "$ROOT/docs/presentation"
mkd "$ROOT/qa"

# ------------------------------------------------------------------------
# Backend files
write "$ROOT/backend/server.js" "$(cat <<'EOF'
// Entry point of backend server
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./models/db.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

await connectDB();

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/weather", weatherRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
EOF
)"

write "$ROOT/backend/routes/restaurantRoutes.js" "$(cat <<'EOF'
import { Router } from "express";
import * as ctrl from "../controllers/restaurantController.js";
const r = Router();

r.post("/", ctrl.createRestaurant);
r.get("/", ctrl.listRestaurants);
r.put("/:id", ctrl.updateRestaurant);
r.delete("/:id", ctrl.deleteRestaurant);

export default r;
EOF
)"

write "$ROOT/backend/routes/customerRoutes.js" "$(cat <<'EOF'
import { Router } from "express";
import * as ctrl from "../controllers/customerController.js";
const r = Router();

r.post("/", ctrl.createCustomer);
r.get("/", ctrl.listCustomers);
r.put("/:id", ctrl.updateCustomer);
r.delete("/:id", ctrl.deleteCustomer);

export default r;
EOF
)"

write "$ROOT/backend/routes/reservationRoutes.js" "$(cat <<'EOF'
import { Router } from "express";
import * as ctrl from "../controllers/reservationController.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
const r = Router();

r.post("/", requireAuth, ctrl.createReservation);
r.get("/", ctrl.listReservations);
r.get("/:id", ctrl.getReservation);
r.put("/:id", requireAuth, ctrl.updateReservation);
r.delete("/:id", requireAuth, requireRole("Admin"), ctrl.deleteReservation);

export default r;
EOF
)"

write "$ROOT/backend/routes/weatherRoutes.js" "$(cat <<'EOF'
import { Router } from "express";
import * as ctrl from "../controllers/weatherController.js";
const r = Router();

r.get("/:city", ctrl.getWeatherByCity);

export default r;
EOF
)"

write "$ROOT/backend/controllers/restaurantController.js" "$(cat <<'EOF'
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
EOF
)"

write "$ROOT/backend/controllers/customerController.js" "$(cat <<'EOF'
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
EOF
)"

write "$ROOT/backend/controllers/reservationController.js" "$(cat <<'EOF'
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
EOF
)"

write "$ROOT/backend/controllers/weatherController.js" "$(cat <<'EOF'
import fetch from "node-fetch";

export async function getWeatherByCity(req, res) {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const r = await fetch(url);
    const data = await r.json();
    if (r.status !== 200) return res.status(r.status).json(data);
    res.json({ city, temp_c: data.main.temp, condition: data.weather[0].main });
  } catch (e) { res.status(500).json({ error: e.message }); }
}
EOF
)"

write "$ROOT/backend/models/db.js" "$(cat <<'EOF'
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
EOF
)"

write "$ROOT/backend/models/Restaurant.js" "// (Optional) Restaurant model helpers go here\n"
write "$ROOT/backend/models/Customer.js"   "// (Optional) Customer model helpers go here\n"
write "$ROOT/backend/models/Reservation.js" "// (Optional) Reservation model helpers go here\n"
write "$ROOT/backend/models/Weather.js"    "// (Optional) Weather model helpers go here\n"

write "$ROOT/backend/middleware/authMiddleware.js" "$(cat <<'EOF'
export function requireAuth(_req, _res, next) {
  // Placeholder: verify JWT/session here
  next();
}
export function requireRole(_role) {
  return (_req, _res, next) => {
    // Placeholder: enforce role-based access
    next();
  };
}
EOF
)"

write "$ROOT/backend/config/config.js" "$(cat <<'EOF'
export default {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000
};
EOF
)"

write "$ROOT/backend/tests/backendTests.http" "$(cat <<'EOF'
### Quick REST tests (use VS Code REST Client)
GET http://localhost:3000/api/restaurants

###
POST http://localhost:3000/api/restaurants
Content-Type: application/json

{
  "name": "Sample Resto",
  "location": "Toronto, ON",
  "email": "info@example.com",
  "opening_time": "11:00",
  "closing_time": "22:00"
}
EOF
)"

# ------------------------------------------------------------------------
# Frontend files
write "$ROOT/frontend/index.html" "$(cat <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Centralized Restaurant Reservation System</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Centralized Restaurant Reservation System</h1>
  <nav>
    <a href="dashboard.html">Reservations Dashboard</a> |
    <a href="search.html">Search & Filter</a>
  </nav>
  <script src="app.js"></script>
</body>
</html>
EOF
)"

write "$ROOT/frontend/dashboard.html" "$(cat <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Reservations Dashboard</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h2>Reservations Dashboard</h2>
  <div id="views-container">
    <!-- Render 10 views as tables here -->
  </div>
  <canvas id="reservationsByRestaurant" width="600" height="300"></canvas>
  <script src="charts.js"></script>
  <script src="apiClient.js"></script>
  <script src="app.js"></script>
</body>
</html>
EOF
)"

write "$ROOT/frontend/search.html" "$(cat <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Search & Filter</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h2>Search & Filter</h2>
  <form id="searchForm">
    <label>City <input name="city" required></label>
    <label>Cuisine <input name="cuisine"></label>
    <label>Date <input type="date" name="date"></label>
    <button type="submit">Search</button>
  </form>
  <div id="results"></div>
  <script src="validators.js"></script>
  <script src="apiClient.js"></script>
  <script src="app.js"></script>
</body>
</html>
EOF
)"

write "$ROOT/frontend/styles.css" "$(cat <<'EOF'
:root { font-family: system-ui, Arial, sans-serif; }
body { margin: 24px; }
nav a { margin-right: 8px; }
table { border-collapse: collapse; width: 100%; margin: 12px 0; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
EOF
)"

write "$ROOT/frontend/app.js" "$(cat <<'EOF'
// Shared frontend logic placeholder
console.log("Frontend initialized ✅");
EOF
)"

write "$ROOT/frontend/apiClient.js" "$(cat <<'EOF'
const API_BASE = (window.API_BASE || "http://localhost:3000");

export async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, { headers: { "Content-Type": "application/json" }, ...options });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json();
}
EOF
)"

write "$ROOT/frontend/charts.js" "$(cat <<'EOF'
// Placeholder Chart.js logic (load data then render)
console.log("Charts placeholder");
EOF
)"

write "$ROOT/frontend/validators.js" "$(cat <<'EOF'
export function isValidEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
export function isValidPhone(v){ return /^[0-9\-\+\s\(\)]{7,}$/.test(v); }
EOF
)"

# ------------------------------------------------------------------------
# SQL files
write "$ROOT/sql/schema.sql" "$(cat <<'EOF'
-- Core schema
CREATE TABLE IF NOT EXISTS Restaurant (
  restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(150),
  email VARCHAR(100),
  opening_time TIME,
  closing_time TIME
);

CREATE TABLE IF NOT EXISTS Customer (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS Reservation (
  reservation_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  restaurant_id INT,
  reservation_date DATE,
  start_time TIME,
  end_time TIME,
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
  FOREIGN KEY (restaurant_id) REFERENCES Restaurant(restaurant_id)
);
EOF
)"

write "$ROOT/sql/sample_data.sql" "$(cat <<'EOF'
-- Insert sample data (≥ 6 per table recommended)
INSERT INTO Restaurant (name, location, email, opening_time, closing_time) VALUES
('Bella Italia','Toronto, ON','bella@bella.com','11:00','23:00'),
('SpiceHub','Ottawa, ON','info@spicehub.ca','10:00','22:00');

INSERT INTO Customer (full_name,email,phone) VALUES
('Jane Doe','jane@example.com','416-000-0000'),
('John Smith','john@example.com','613-000-0000');
EOF
)"

write "$ROOT/sql/views.sql" "$(cat <<'EOF'
-- Create common + custom views (fill out as needed)
CREATE OR REPLACE VIEW v_full_reservation_info AS
SELECT r.name AS restaurant, c.full_name, res.reservation_date, res.start_time, res.end_time
FROM Reservation res
JOIN Restaurant r ON res.restaurant_id = r.restaurant_id
JOIN Customer c ON res.customer_id = c.customer_id;
EOF
)"

write "$ROOT/sql/indexes.sql" "$(cat <<'EOF'
-- Optional performance indexes
CREATE INDEX IF NOT EXISTS idx_reservation_restaurant_date
  ON Reservation (restaurant_id, reservation_date, start_time);
EOF
)"

write "$ROOT/sql/test_queries.sql" "$(cat <<'EOF'
-- Smoke tests
SELECT COUNT(*) AS restaurants FROM Restaurant;
SELECT COUNT(*) AS customers FROM Customer;
SELECT * FROM v_full_reservation_info LIMIT 10;
EOF
)"

# ------------------------------------------------------------------------
# Docs & QA
write "$ROOT/docs/ER_Diagram.png" ""  # placeholder empty file
write "$ROOT/docs/Final_Report.pdf" ""  # placeholder
write "$ROOT/docs/Phase_II_Report.pdf" ""  # placeholder
write "$ROOT/docs/screenshots/dashboard_view.png" ""  # placeholder
write "$ROOT/docs/screenshots/search_filter.png" ""   # placeholder
write "$ROOT/docs/screenshots/api_output.png" ""      # placeholder

write "$ROOT/docs/presentation/Final_Presentation.pptx" ""  # placeholder
write "$ROOT/docs/presentation/rehearsal_notes.txt" "$(cat <<'EOF'
- Keep total presentation under 7 minutes.
- Mohammad: intro + frontend demo (2 min)
- Ayaan: database schema + ER diagram (2 min)
- Ali: backend logic + API integration (2 min)
- Mohamed: testing, report, conclusion (1 min)
EOF
)"

write "$ROOT/qa/e2e-checklist.md" "$(cat <<'EOF'
# ✅ End-to-End Testing Checklist
- [ ] CRUD: restaurants
- [ ] CRUD: customers
- [ ] CRUD: reservations
- [ ] Search & Filter flows
- [ ] Weather API integration
- [ ] Chart.js renders
- [ ] Error handling & form validation
EOF
)"

write "$ROOT/qa/bug_log.md" "$(cat <<'EOF'
# 🐞 Bug Log
- (date) short title — steps to reproduce, expected vs actual, status/owner
EOF
)"

# ------------------------------------------------------------------------
# Root files
write "$ROOT/.env.example" "$(cat <<'EOF'
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=restaurant_db
OPENWEATHER_API_KEY=your_api_key
EOF
)"

write "$ROOT/.gitignore" "$(cat <<'EOF'
node_modules/
.env
.DS_Store
package-lock.json
*.log
/docs/screenshots/
/docs/*.pdf
/docs/presentation/*.pptx
EOF
)"

write "$ROOT/package.json" "$(cat <<'EOF'
{
  "name": "centralized-restaurant-reservation-system",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch backend/server.js",
    "start": "node backend/server.js",
    "db:seed": "echo 'Run schema + sample_data manually via MySQL Workbench for now'"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mysql2": "^3.9.7",
    "node-fetch": "^3.3.2"
  }
}
EOF
)"

write "$ROOT/README.md" "$(cat <<'EOF'
# 🍽️ Centralized Restaurant Reservation System
*SOFE 3700 — Data Management Systems (Final Project)*

A centralized, database-driven web app that manages reservations, tables, and customers across multiple restaurants. Built to demonstrate relational 
design, SQL querying, a RESTful backend, and a dynamic frontend.

## Quick Start
1) `cp .env.example .env` and fill in DB credentials + `OPENWEATHER_API_KEY`
2) `npm install`
3) Create DB & tables (run scripts in `/sql`)
4) `npm run dev` and open the `/frontend` pages in a browser

## Stack
- Backend: Node.js + Express + MySQL2
- Frontend: HTML/CSS/JS (Fetch/AJAX + optional Chart.js)
- DB: MySQL
- External API: OpenWeather

See `/docs` for reports and screenshots.
EOF
)"

msg "✅ Repo initialized in current directory: $(pwd)"
[[ $FORCE -eq 1 ]] && warn "Overwrites were enabled (--force)."
