const Location = require("../models/Location");
const {
  getWeatherByCity,
  getWeatherByCoordsService,
} = require("../services/weatherService");

const { getForecastByCity } = require("../services/forecastService");
const { getWeatherNews } = require("../services/newsService");
const { getAirQuality } = require("../services/airQualityService");

const addLocation = async (req, res) => {
  try {
    const { city_name, country } = req.body;

    const location = await Location.create({
      city_name,
      country,
      user: req.user._id,
    });

    res.status(201).json(location);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(locations);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

const getWeather = async (req, res) => {
  try {
    const city = req.params.city;

    const data = await getWeatherByCity(city);

    res.json(data);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};
const getForecast = async (req, res) => {
  try {
    const city = req.params.city;

    const data = await getForecastByCity(city);

    res.json(data);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};
const fetchWeatherNews = async (req, res) => {
  try {
    const news = await getWeatherNews();

    res.json(news);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    await Location.findByIdAndDelete(req.params.id);

    res.json({ message: "Location deleted successfully" });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

const getWeatherByCoords = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const data = await getWeatherByCoordsService(lat, lon);

    res.json(data);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

const getAQI = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        message: "Latitude and longitude are required.",
      });
    }

    const data = await getAirQuality(lat, lon);

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch air quality.",
    });
  }
};

module.exports = {
  addLocation,
  getLocations,
  getWeather,
  getForecast,
  fetchWeatherNews,
  deleteLocation,
  getWeatherByCoords,
  getAQI,
};
