# 🍽️ Centralized Restaurant Reservation System  
### *SOFE 3700 — Data Management Systems (Final Project)*  

---

## 📖 Overview
The **Centralized Restaurant Reservation System** is a database-driven web application designed to unify and simplify restaurant reservations across multiple establishments.  
Instead of each restaurant maintaining its own reservation platform, this system provides a **centralized service** that manages bookings, table availability, and customer records for multiple restaurants.  

This project was developed as part of the **SOFE 3700 Data Management Systems** course to demonstrate real-world application of **database design, SQL querying, backend integration, and web technologies**.

---

## 🎯 Objectives
- Design and implement a **relational database** to manage restaurants, customers, and reservations.  
- Build a **web-based interface** connected to the database through RESTful APIs.  
- Enable **real-time reservation availability** across multiple restaurants.  
- Integrate **external APIs** (e.g., OpenWeather) for enhanced contextual data.  
- Use **AJAX, Fetch API, and Chart.js** for dynamic interactivity and visualization.

---

## 🧩 System Architecture
- **Backend:** Node.js + Express (MySQL connection)  
- **Frontend:** HTML, CSS, JavaScript (Fetch/AJAX + Chart.js)  
- **Database:** MySQL  
- **External API:** OpenWeather API  
- **Hosting:** Local (MySQL Workbench / XAMPP)  
- **Version Control:** GitHub  

---

## 🗄️ Database Design

### Entities
- **Restaurant:** Stores information about each restaurant (name, location, contact).  
- **Table_Info:** Details of tables, capacities, and related restaurant.  
- **Customer:** Customer information including contact details.  
- **Reservation:** Reservation records with timestamps and guest count.  
- **Cuisine:** Type of cuisine served.  
- **Restaurant_Cuisine:** Linking entity for many-to-many relationships.  

### ER Diagram
*(Include `ER_Diagram.png` here)*  

---

Restaurant (1) ───< Table_Info (N)
Restaurant (1) ───< Reservation (N)
Customer (1) ───< Reservation (N)
Restaurant (N) ───< Restaurant_Cuisine >───(N) Cuisine

---


### SQL Schema Highlights
- Primary and Foreign Keys defined for all major entities.  
- Constraints (`CHECK`, `UNIQUE`) ensure data integrity.  
- Includes multiple views: joins, nested queries, and set operations.  

---

## 💻 Backend Features

| Feature | Description |
|----------|-------------|
| **CRUD Operations** | Create, Read, Update, Delete for Restaurants, Customers, and Reservations |
| **Authentication** | Login/Logout with role-based access (Admin, Owner, Customer) |
| **REST API** | Endpoints for all database interactions (GET, POST, PUT, DELETE) |
| **External API Integration** | Uses OpenWeather API for restaurant location weather data |
| **Error Handling** | Handles database or API connection issues gracefully |

---

## 🌐 Frontend Features

| Component | Description |
|------------|-------------|
| **Reservations Dashboard** | Displays 10 SQL views in organized tables |
| **Search & Filter Page** | Filter by cuisine, city, or table availability |
| **Dynamic Forms** | Client-side validation for email, phone, and required fields |
| **AJAX / Fetch** | Async requests to backend without page reloads |
| **Chart.js Visualizations** | Graphs showing reservation stats by restaurant or day |

---

## 📊 Data Views Implemented
1. Join of ≥3 tables  
2. Nested query with `ANY` or `ALL`  
3. Correlated subquery  
4. Full Join  
5. Set operation (`UNION` / `EXCEPT` / `INTERSECT`)  
6–10. Custom views (average party size, daily reservations, frequent customers, available tables, late restaurants)

---

## 🧪 Testing & Validation
- SQL views tested with realistic sample data.  
- CRUD endpoints validated using Postman.  
- Frontend forms validated for required inputs and format.  
- API integration tested for response handling and error management.  

---

## 🧱 Folder Structure
📦 Centralized-Restaurant-Reservation-System
┣ 📁 backend
┃ ┣ server.js
┃ ┣ routes/
┃ ┣ controllers/
┃ ┣ models/
┃ ┗ config/
┣ 📁 frontend
┃ ┣ index.html
┃ ┣ dashboard.html
┃ ┣ search.html
┃ ┣ styles.css
┃ ┗ scripts/
┣ 📁 sql
┃ ┣ schema.sql
┃ ┣ sample_data.sql
┃ ┣ views.sql
┃ ┗ indexes.sql
┣ 📁 docs
┃ ┣ ER_Diagram.png
┃ ┣ screenshots/
┃ ┗ Final_Report.pdf
┗ README.md

---


---

## 🧾 Report Contents
- **Abstract**  
- **Introduction & Motivation**  
- **Design & Implementation (DB + Web App)**  
- **Results (SQL views + API + UI)**  
- **Conclusion & Future Enhancements**

---

## 💡 Future Work
- Deploy to cloud hosting (AWS, Render, or Railway).  
- Add email confirmations for reservations.  
- Build an analytics dashboard for restaurant owners.  
- Extend API for mobile or third-party integrations.  

---

## 👥 Team Members

| Name | Role | Responsibilities |
|------|------|------------------|
| **Ali Hakkani** | Backend Developer | CRUD endpoints, database integration |
| **Ayaan Ahmed** | Database Designer | Schema design, ER diagram, sample data |
| **Mohammad Taqi** | Frontend Developer | UI design, AJAX integration, visualization |
| **Mohamed Tawfik Omar** | QA & Documentation Lead | Testing, report writing, presentation |

---

## 📅 Timeline

| Phase | Duration | Focus |
|-------|-----------|--------|
| Phase I | Sept 18 – Oct 13 | Project Proposal |
| Phase II | Oct 14 – Nov 03 | Database Design & Implementation |
| Phase III | Nov 04 – Nov 17 | Backend, Frontend & Final Presentation |

---

## 📎 Submission Details
**Deliverables:**  
- Final Report (10–12 pages, PDF)  
- PowerPoint Presentation (5–7 min + 2 min Q&A)  
- Source Code Repository  

**Deadline:** November 17, 2025  
**Instructor:** Dr. *[Insert Name]*  
**Course:** SOFE 3700 — Data Management Systems  

---

## 🏁 Acknowledgements
Special thanks to our instructor and teaching assistants for their ongoing support and guidance throughout this project.  
This system demonstrates the integration of **database management, API design, and frontend development**, forming a complete end-to-end data-driven application.

---
