const axios = require("axios");

const getAirQuality = async (lat, lon) => {
  const apiKey = process.env.API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  const { data } = await axios.get(url);

  return data;
};

module.exports = {
  getAirQuality,
};
