
// app-frontend.js (loaded with type="text/babel" in index.html)

// Simple React component for your page
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

// Mount React into the #root div
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);