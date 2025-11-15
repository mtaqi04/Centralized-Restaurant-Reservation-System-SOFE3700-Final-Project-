// frontend/app-frontend.js
const { useState, useEffect } = React;
import Dashboard from "./dashboard";



function App() {
  return (
    <div>
      <h1>Centralized Restaurant Reservation System</h1>

      <nav>
        {/* You can add links or buttons here later */}
        <span>Reservations Dashboard</span>
      </nav>

      {/* For now, just show the dashboard */}
      <Dashboard />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
