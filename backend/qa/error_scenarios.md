# Error Handling Scenarios – Frontend & API

This document lists manual tests used to verify Task 4.2 (Error Handling).

## 1. Backend Offline (NETWORK error)

**Setup**

- Stop the backend server (`Ctrl + C` in the backend terminal).
- Keep the frontend running.

**Action**

- On the Home page, click **"Test Backend Connection"**.

**Expected UX**

- Button text returns to "Retry" and is enabled.
- Status text shows: `Backend is unavailable ❌`.
- Error toast appears:  
  > "We couldn’t reach the server. Please check your connection and try again."
- Detailed error is logged to the browser console.

---

## 2. Timeout Scenario

**Setup**

- Temporarily add a `setTimeout` (e.g., 10–15 seconds) inside `/api/health` handler on the backend **or**
- Lower `DEFAULT_TIMEOUT_MS` in `apiClient.js` to `1000` for testing.

**Action**

- Click **"Test Backend Connection"**.

**Expected UX**

- After ~1 second, request aborts.
- Toast:  
  > "The request took too long and was cancelled. Please try again."
- Status text: `Backend is unavailable ❌`.

---

## 3. 4xx Error (e.g., 401 / 403 / 404)

**Setup**

- Call a protected or non-existent endpoint via a temporary button or `apiClient.get("/api/does-not-exist")` in the console.

**Expected UX**

- Toast shows mapped message, for example:
  - 401 → "You need to log in to perform this action."
  - 404 → "We couldn’t find what you were looking for."
- Console logs the full error object with `status` and `url`.

---

## 4. 5xx Error + Retry

**Setup**

- Add a temporary backend route `/api/health/broken` that returns HTTP 500.
- Call it using `apiClient.get("/api/health/broken")` with default retry.

**Expected UX**

- User sees toast:  
  > "Something went wrong on the server. Please try again shortly."
- Console logs a warning about retry and final failure.

---

All tests completed successfully → Acceptance criteria met:
- Friendly messages surfaced to user
- UI stays usable (buttons re-enabled, page not stuck)
- Detailed errors in console for developers
