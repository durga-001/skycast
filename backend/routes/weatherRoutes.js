const express = require("express");
const router = express.Router();

const {
  addLocation,
  getLocations,
  getWeather,
  getForecast,
  fetchWeatherNews,
} = require("../controllers/weatherController");

router.post("/locations", addLocation);

router.get("/locations", getLocations);

router.get("/weather/:city", getWeather);

router.get("/forecast/:city", getForecast);

router.get("/news", fetchWeatherNews);

module.exports = router;
