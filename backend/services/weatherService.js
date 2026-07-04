// weatherService.js
const axios = require("axios");

const getWeatherByCity = async (city) => {
  try {
    const API_KEY = process.env.API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);

    return {
      city: response.data.name,
      country: response.data.sys.country,
      latitude: response.data.coord.lat,
      longitude: response.data.coord.lon,
      temperature: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      visibility: response.data.visibility,
      wind_speed: response.data.wind.speed,
      weather: response.data.weather[0].main,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      sunrise: response.data.sys.sunrise,
      sunset: response.data.sys.sunset,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch weather data",
    );
  }
};

const getWeatherByCoordsService = async (lat, lon) => {
  try {
    const API_KEY = process.env.API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);

    return {
      city: response.data.name,
      country: response.data.sys.country,
      latitude: response.data.coord.lat,
      longitude: response.data.coord.lon,
      temperature: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      wind_speed: response.data.wind.speed,
      weather: response.data.weather[0].main,
      description: response.data.weather[0].description,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch weather data",
    );
  }
};
module.exports = { getWeatherByCity, getWeatherByCoordsService };
