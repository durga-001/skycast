const axios = require("axios");

const getWeatherByCity = async (city) => {
  const API_KEY = "dec234f9158cd06d3c126152ab56636f";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const response = await axios.get(url);

  return {
    city: response.data.name,
    temperature: response.data.main.temp,
    humidity: response.data.main.humidity,
    wind_speed: response.data.wind.speed,
    weather: response.data.weather[0].main,
  };
};

module.exports = { getWeatherByCity };
