// frontend/src/apiClient.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

console.log("[apiClient] Using API base URL:", API_BASE_URL);

export async function apiClient(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("[apiClient] Error response:", res.status, data);
      throw new Error(data?.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (err) {
    console.error("[apiClient] Network error:", err);
    throw err;
  }
}
