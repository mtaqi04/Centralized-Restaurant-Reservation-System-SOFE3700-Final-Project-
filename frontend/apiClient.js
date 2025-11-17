// /frontend/public/apiClient.js

const DEFAULT_TIMEOUT_MS = 8000;
const DEFAULT_RETRIES = 1;

const STATUS_MESSAGES = {
  400: "The request was invalid. Please check your input and try again.",
  401: "You need to log in to perform this action.",
  403: "You don’t have permission to perform this action.",
  404: "We couldn’t find what you were looking for.",
  429: "Too many requests. Please wait a bit and try again.",
  500: "Something went wrong on the server. Please try again shortly.",
  503: "The service is temporarily unavailable. Please try again soon.",
};

function getApiBaseUrl() {
  // from .env → injected, or fallback
  if (window.FRONTEND_API_BASE_URL) {
    return window.FRONTEND_API_BASE_URL.replace(/\/+$/, "");
  }
  // last-resort default
  return "http://localhost:3000";
}

async function safeJson(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text; // not JSON, just return raw
  }
}

async function coreRequest(path, options = {}) {
  const {
    method = "GET",
    headers = {},
    body,
    timeout = DEFAULT_TIMEOUT_MS,
    retries = DEFAULT_RETRIES,
  } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const url = `${getApiBaseUrl()}${path}`;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      credentials: "include", // in case you use cookies/session later
    });

    clearTimeout(timer);

    const data = await safeJson(res);

    if (!res.ok) {
      const friendly =
        STATUS_MESSAGES[res.status] ||
        "An unexpected error occurred. Please try again.";

      const err = new Error(friendly);
      err.status = res.status;
      err.data = data;
      err.url = url;
      throw err;
    }

    return data;
  } catch (err) {
    clearTimeout(timer);

    if (err.name === "AbortError") {
      const timeoutError = new Error(
        "The request took too long and was cancelled. Please try again."
      );
      timeoutError.code = "TIMEOUT";
      timeoutError.url = url;
      throw timeoutError;
    }

    // network errors / CORS / DNS, etc.
    if (!err.status && !err.code) {
      const netError = new Error(
        "We couldn’t reach the server. Please check your connection and try again."
      );
      netError.code = "NETWORK";
      netError.cause = err;
      netError.url = url;
      throw netError;
    }

    // retry only for GET + transient failures
    const shouldRetry =
      method === "GET" &&
      retries > 0 &&
      (err.code === "TIMEOUT" || (err.status && err.status >= 500));

    if (shouldRetry) {
      console.warn("[apiClient] Retrying request:", url, "retries left:", retries - 1);
      return coreRequest(path, {
        method,
        headers,
        body,
        timeout,
        retries: retries - 1,
      });
    }

    throw err;
  }
}

export const apiClient = {
  get(path, options = {}) {
    return coreRequest(path, { ...options, method: "GET" });
  },
  post(path, body, options = {}) {
    return coreRequest(path, { ...options, method: "POST", body });
  },
  put(path, body, options = {}) {
    return coreRequest(path, { ...options, method: "PUT", body });
  },
  delete(path, options = {}) {
    return coreRequest(path, { ...options, method: "DELETE" });
  },
};
