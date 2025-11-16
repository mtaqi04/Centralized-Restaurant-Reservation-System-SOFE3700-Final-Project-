import { getWeatherForLocation } from './weatherService.js';

export async function getWeatherForCity(req, res) {
  try {
    const { city } = req.params;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const weather = await getWeatherForLocation(city);
    if (!weather) {
      return res
        .status(502)
        .json({ error: 'Unable to fetch weather for given city' });
    }

    res.json(weather);
  } catch (err) {
    console.error('[WeatherController] Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
