// /frontend/public/app.js
import { apiClient } from "./apiClient.js";
import { showToast } from "./ui/toast.js";

function wireNavigation() {
  const homeLink = document.querySelector('[data-nav="home"]');
  const dashboardLink = document.querySelector('[data-nav="dashboard"]');
  const reservationsLink = document.querySelector('[data-nav="reservations"]');
  // (only if you’re using these data-nav attributes)
}

async function runHealthCheck() {
  const btn = document.querySelector("#health-check-btn");
  const statusEl = document.querySelector("#health-status");

  if (!btn || !statusEl) return;

  btn.disabled = true;
  btn.textContent = "Testing...";
  statusEl.textContent = "Checking backend health…";

  try {
    const data = await apiClient.get("/api/health", { retries: 1 });
    console.log("[Health OK]", data);
    statusEl.textContent = "Backend is online ✅";
    btn.textContent = "Test Again";
    showToast("Connected to backend successfully.", "success");
  } catch (err) {
    console.error("[Health Check Error]", err);
    statusEl.textContent = "Backend is unavailable ❌";
    btn.textContent = "Retry";

    // Friendly message to user
    showToast(err.message || "Something went wrong. Please try again.", "error");
  } finally {
    btn.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#health-check-btn");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      runHealthCheck();
    });
  }

  // Optional: run once on load
  // runHealthCheck();
});
