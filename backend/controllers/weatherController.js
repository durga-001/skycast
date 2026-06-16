const pool = require("../config/db");
const { getWeatherByCity } = require("../services/weatherService");
const { getForecastByCity } = require("../services/forecastService");
const { getWeatherNews } = require("../services/newsService");

const addLocation = async (req, res) => {
  try {
    const { city_name, country } = req.body;

    const result = await pool.query(
      "INSERT INTO locations (city_name, country) VALUES ($1, $2) RETURNING *",
      [city_name, country],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getLocations = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM locations ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const getWeather = async (req, res) => {
  try {
    const city = req.params.city;

    const data = await getWeatherByCity(city);

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
const getForecast = async (req, res) => {
  try {
    const city = req.params.city;

    const data = await getForecastByCity(city);

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};
const fetchWeatherNews = async (req, res) => {
  try {
    const news = await getWeatherNews();

    res.json(news);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports = {
  addLocation,
  getLocations,
  getWeather,
  getForecast,
  fetchWeatherNews,
};