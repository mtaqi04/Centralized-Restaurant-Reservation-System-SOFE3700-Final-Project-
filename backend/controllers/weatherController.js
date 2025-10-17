import fetch from "node-fetch";

export async function getWeatherByCity(req, res) {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const r = await fetch(url);
    const data = await r.json();
    if (r.status !== 200) return res.status(r.status).json(data);
    res.json({ city, temp_c: data.main.temp, condition: data.weather[0].main });
  } catch (e) { res.status(500).json({ error: e.message }); }
}