const axios = require("axios");

const API_KEY = process.env.API_KEY;

const getWeatherByCity = async (city) => {
  if (!API_KEY) {
    throw new Error("OpenWeather API key is not configured");
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city,
    )}&appid=${API_KEY}&units=metric`;

    const { data } = await axios.get(url, {
      timeout: 10000,
    });

    return {
      city: data.name,
      country: data.sys.country,
      latitude: data.coord.lat,
      longitude: data.coord.lon,
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      visibility: data.visibility,
      wind_speed: data.wind.speed,
      weather: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch weather data",
    );
  }
};

const getWeatherByCoordsService = async (lat, lon) => {
  if (!API_KEY) {
    throw new Error("OpenWeather API key is not configured");
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const { data } = await axios.get(url, {
      timeout: 10000,
    });

    return {
      city: data.name,
      country: data.sys.country,
      latitude: data.coord.lat,
      longitude: data.coord.lon,
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      visibility: data.visibility,
      wind_speed: data.wind.speed,
      weather: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch weather data",
    );
  }
};

module.exports = {
  getWeatherByCity,
  getWeatherByCoordsService,
};
