const axios = require("axios");

const getForecastByCity = async (city) => {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    throw new Error("OpenWeather API key is not configured");
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      city,
    )}&appid=${API_KEY}&units=metric`;

    const { data } = await axios.get(url, {
      timeout: 10000,
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch forecast data",
    );
  }
};

module.exports = {
  getForecastByCity,
};
