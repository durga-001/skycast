const express = require("express");
const router = express.Router();

const {
  addLocation,
  getLocations,
  getWeather,
} = require("../controllers/weatherController");

router.post("/locations", addLocation);

router.get("/locations", getLocations);

router.get("/weather/:city", getWeather);

module.exports = router;
