const axios = require("axios");

const getOpenMeteoMarine = async (lat, lon) => {
  const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_period,wave_direction,swell_wave_height&daily=wave_height_max,wave_period_max,wave_direction_dominant&timezone=auto&forecast_days=5`;
  const { data } = await axios.get(url, { timeout: 10000 });

  const hourly = data.hourly.time.slice(0, 24).map((time, i) => ({
    time,
    waveHeight: data.hourly.wave_height[i],
    wavePeriod: data.hourly.wave_period[i],
    waveDirection: data.hourly.wave_direction[i],
    swellHeight: data.hourly.swell_wave_height[i],
  }));

  const daily = data.daily.time.map((date, i) => ({
    date,
    waveHeightMax: data.daily.wave_height_max[i],
    wavePeriodMax: data.daily.wave_period_max[i],
    waveDirection: data.daily.wave_direction_dominant[i],
  }));

  return { source: "open-meteo-marine", current: hourly[0], hourly, daily };
};

const getStormGlass = async (lat, lon) => {
  if (!process.env.STORMGLASS_KEY) throw new Error("no key");

  const params = "waveHeight,wavePeriod,swellHeight,waterTemperature";
  const url = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lon}&params=${params}`;
  const { data } = await axios.get(url, {
    headers: { Authorization: process.env.STORMGLASS_KEY },
    timeout: 10000,
  });

  const hourly = data.hours.slice(0, 24).map((h) => ({
    time: h.time,
    waveHeight: h.waveHeight?.sg,
    wavePeriod: h.wavePeriod?.sg,
    swellHeight: h.swellHeight?.sg,
  }));

  return { source: "stormglass", current: hourly[0], hourly, daily: [] };
};

const getWeatherApiMarine = async (lat, lon) => {
  if (!process.env.WEATHERAPI_KEY) throw new Error("no key");

  const url = `https://api.weatherapi.com/v1/marine.json?key=${process.env.WEATHERAPI_KEY}&q=${lat},${lon}&days=5`;
  const { data } = await axios.get(url, { timeout: 10000 });

  const hours = data.forecast.forecastday[0].hour;

  const hourly = hours.map((h) => ({
    time: h.time,
    waveHeight: h.sig_ht_mt,
    swellHeight: h.swell_ht_mt,
    wavePeriod: h.swell_period_secs,
  }));

  const daily = data.forecast.forecastday.map((d) => ({
    date: d.date,
    waveHeightMax: d.day?.sig_ht_mt ?? null,
  }));

  return { source: "weatherapi-marine", current: hourly[0], hourly, daily };
};

const getMarineData = async (lat, lon) => {
  const providers = [getOpenMeteoMarine, getStormGlass, getWeatherApiMarine];

  for (const provider of providers) {
    try {
      return await provider(lat, lon);
    } catch (err) {
      continue;
    }
  }

  throw new Error("All ocean weather providers failed");
};

const getSeaState = (waveHeight) => {
  if (waveHeight == null)
    return { level: 0, label: "Unknown", color: "#94a3b8" };
  if (waveHeight < 0.1) return { level: 1, label: "Calm", color: "#22c55e" };
  if (waveHeight < 0.5) return { level: 2, label: "Smooth", color: "#4ade80" };
  if (waveHeight < 1.25) return { level: 3, label: "Slight", color: "#a3e635" };
  if (waveHeight < 2.5)
    return { level: 4, label: "Moderate", color: "#facc15" };
  if (waveHeight < 4) return { level: 5, label: "Rough", color: "#f59e0b" };
  if (waveHeight < 6)
    return { level: 6, label: "Very Rough", color: "#f97316" };
  if (waveHeight < 9) return { level: 7, label: "High", color: "#ef4444" };
  if (waveHeight < 14)
    return { level: 8, label: "Very High", color: "#dc2626" };
  if (waveHeight < 20)
    return { level: 9, label: "Phenomenal", color: "#991b1b" };
  return { level: 10, label: "Extreme", color: "#7f1d1d" };
};

const getOceanArea = (lat, lon) => {
  const nauticalMiles = 100;
  const latOffset = nauticalMiles / 60;
  const lonOffset = nauticalMiles / (60 * Math.cos((lat * Math.PI) / 180));

  return {
    nauticalMiles,
    bounds: {
      north: Number(lat) + latOffset / 2,
      south: Number(lat) - latOffset / 2,
      east: Number(lon) + lonOffset / 2,
      west: Number(lon) - lonOffset / 2,
    },
  };
};

module.exports = { getMarineData, getSeaState, getOceanArea };
