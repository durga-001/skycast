// forecastService.js
const axios = require("axios");

const getForecastByCity = async (city) => {
  try {
    const API_KEY = process.env.API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch forecast data",
    );
  }
};

module.exports = { getForecastByCity };
