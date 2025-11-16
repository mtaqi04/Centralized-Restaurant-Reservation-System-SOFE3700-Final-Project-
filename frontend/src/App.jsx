// frontend/src/App.jsx
import { useState } from "react";
import "./styles.css";
import { apiClient } from "./apiClient";

function App() {
  const [apiResult, setApiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTestApi = async () => {
    setLoading(true);
    setError("");
    setApiResult(null);

    try {
      // adjust endpoint to match your backend health route
      const data = await apiClient("/health");
      setApiResult(data);
    } catch (err) {
      setError(err.message || "Failed to reach API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-root">
      {/* 🔹 Shared Header */}
      <header className="app-header">
        <h1>Restaurant Reservation System</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Reservations</a>
          <a href="#">Search</a>
        </nav>
      </header>

      {/* 🔹 Page Content */}
      <main className="app-main">
        <section>
          <h2>Welcome</h2>
          <p>
            This is the frontend shell for the Centralized Restaurant Reservation System.
            API calls are routed through a single configured base URL.
          </p>
        </section>

        <section className="card">
          <h3>Test Backend Connection</h3>
          <p>Click the button below to call <code>/api/health</code> on the backend.</p>
          <button onClick={handleTestApi} disabled={loading}>
            {loading ? "Testing..." : "Test API Connection"}
          </button>

          {error && (
            <pre className="api-error">Error: {error}</pre>
          )}

          {apiResult && (
            <pre className="api-response">
              {JSON.stringify(apiResult, null, 2)}
            </pre>
          )}
        </section>
      </main>

      {/* 🔹 Shared Footer */}
      <footer className="app-footer">
        <p>© 2025 Centralized Restaurant Reservation System</p>
      </footer>
    </div>
  );
}

export default App;