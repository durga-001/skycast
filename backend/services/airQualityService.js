const axios = require("axios");

const getAirQuality = async (lat, lon) => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new Error("OpenWeather API key is not configured");
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const { data } = await axios.get(url, {
      timeout: 10000,
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch air quality data",
    );
  }
};

module.exports = {
  getAirQuality,
};
