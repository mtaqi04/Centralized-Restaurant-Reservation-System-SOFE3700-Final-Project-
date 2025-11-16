// frontend/public/charts.js

// Centralized API base URL (taken from window, with a safe default)
const API_BASE_URL =
  window.FRONTEND_API_BASE_URL || 'http://localhost:3000';

// ---- Small helper for JSON fetch with error handling ----
async function fetchJSON(path) {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} ${res.statusText} — ${text}`);
  }

  return res.json();
}

// ---- Chart 1: Reservations by Restaurant ----
async function loadReservationsByRestaurantChart() {
  const statusEl = document.getElementById('restaurantChartStatus');
  const canvas = document.getElementById('reservationsByRestaurantChart');

  if (!canvas) return;

  try {
    statusEl.textContent = 'Loading data…';

    // Expecting something like:
    // [{ restaurant_name: "Pizza Place", total_reservations: 12 }, ...]
    const data = await fetchJSON('/api/metrics/reservations-by-restaurant');

    if (!data || data.length === 0) {
      statusEl.textContent = 'No data available.';
      return;
    }

    const labels = data.map(
      (item) => item.restaurant_name || item.restaurant || item.name
    );
    const values = data.map(
      (item) => item.total_reservations || item.total || item.count || 0
    );

    new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Reservations',
            data: values,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 },
          },
        },
      },
    });

    statusEl.textContent = 'Loaded from live API.';
  } catch (err) {
    console.error('[Reservations by Restaurant] Error:', err);
    statusEl.textContent = 'Error loading data. Check console / API.';
  }
}

// ---- Chart 2: Reservations by Day-of-Week ----
async function loadReservationsByDayChart() {
  const statusEl = document.getElementById('dayChartStatus');
  const canvas = document.getElementById('reservationsByDayChart');

  if (!canvas) return;

  try {
    statusEl.textContent = 'Loading data…';

    // Expecting something like:
    // [{ day_of_week: "Monday", total_reservations: 5 }, ...]
    const data = await fetchJSON('/api/metrics/reservations-by-day');

    if (!data || data.length === 0) {
      statusEl.textContent = 'No data available.';
      return;
    }

    const labels = data.map(
      (item) => item.day_of_week || item.day || item.label
    );
    const values = data.map(
      (item) => item.total_reservations || item.total || item.count || 0
    );

    new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Reservations',
            data: values,
            tension: 0.25,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 },
          },
        },
      },
    });

    statusEl.textContent = 'Loaded from live API.';
  } catch (err) {
    console.error('[Reservations by Day] Error:', err);
    statusEl.textContent = 'Error loading data. Check console / API.';
  }
}

// ---- Init ----
async function initDashboardCharts() {
  await Promise.all([
    loadReservationsByRestaurantChart(),
    loadReservationsByDayChart(),
  ]);
}

document.addEventListener('DOMContentLoaded', initDashboardCharts);
