// weatherroutes.js (FIX)

const express = require("express");
const router = express.Router();

const {
  addLocation,
  getLocations,
  getWeather,
  getForecast,
  fetchWeatherNews,
  deleteLocation,
  getWeatherByCoords,
  getAQI,
} = require("../controllers/weatherController");

const protect = require("../middleware/authMiddleware");

router.post("/locations", protect, addLocation);

router.get("/locations", protect, getLocations);

router.delete("/locations/:id", protect, deleteLocation);

router.get("/weather/:city", getWeather);

router.get("/forecast/:city", getForecast);

router.get("/news", fetchWeatherNews);

router.get("/coords", getWeatherByCoords);

router.get("/air-quality", getAQI);

module.exports = router;
