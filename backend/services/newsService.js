const axios = require("axios");

const getWeatherNews = async () => {
  const API_KEY = process.env.NEWS_API_KEY;

  if (!API_KEY) {
    throw new Error("News API key is not configured");
  }

  try {
    const url = `https://newsapi.org/v2/everything?q=weather&language=en&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`;

    const { data } = await axios.get(url, {
      timeout: 10000,
    });

    return data.articles || [];
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch weather news",
    );
  }
};

module.exports = {
  getWeatherNews,
};
