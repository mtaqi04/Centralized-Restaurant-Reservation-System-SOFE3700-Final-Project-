// app-frontend.js (React)
function App() {
  return (
    <div>
      <h1>Centralized Restaurant Reservation System</h1>

      <nav>
        <a href="/dashboard.html">Reservations Dashboard</a> |{" "}
        <a href="/search.html">Search & Filter</a>
      </nav>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
