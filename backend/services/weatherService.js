// backend/services/weatherService.js
import 'dotenv/config';

const BASE_URL =
  process.env.OPENWEATHER_BASE_URL ||
  'https://api.openweathermap.org/data/2.5/weather';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const UNITS = process.env.OPENWEATHER_UNITS || 'metric';
const TIMEOUT_MS = Number(process.env.OPENWEATHER_TIMEOUT_MS || 3000);

/**
 * Normalize "Toronto, ON" → "Toronto"
 */
function extractCity(location) {
  if (!location) return null;
  const [city] = location.split(',');
  return city?.trim() || null;
}

/**
 * Fetch current weather for a given location string ("Toronto, ON").
 * Returns a small, clean JSON object or null on failure.
 */
export async function getWeatherForLocation(location) {
  if (!API_KEY) {
    console.warn('[Weather] Missing OPENWEATHER_API_KEY. Skipping weather fetch.');
    return null;
  }

  const city = extractCity(location);
  if (!city) {
    console.warn('[Weather] Could not extract city from location:', location);
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${UNITS}`;
    const res = await fetch(url, { signal: controller.signal });

    if (!res.ok) {
      console.error('[Weather] OpenWeather error:', res.status, await res.text());
      return null;
    }

    const data = await res.json();

    return {
      source: 'openweathermap',
      city: data.name,
      country: data.sys?.country || null,
      temperature: data.main?.temp ?? null,
      feels_like: data.main?.feels_like ?? null,
      humidity: data.main?.humidity ?? null,
      description: data.weather?.[0]?.description || null,
      icon: data.weather?.[0]?.icon || null,
      units: UNITS,
      fetched_at: new Date().toISOString(),
    };
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('[Weather] Request timed out');
    } else {
      console.error('[Weather] Error fetching weather:', err.message);
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
