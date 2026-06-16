const axios = require("axios");

const getWeatherNews = async () => {
  const API_KEY = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/everything?q=weather&language=en&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`;

  const response = await axios.get(url);

  return response.data.articles;
};

module.exports = { getWeatherNews };
