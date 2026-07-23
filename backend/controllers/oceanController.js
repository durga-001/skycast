const OceanLocation = require("../models/OceanLocation");
const { getWeatherByCoordsService } = require("../services/weatherService");
const {
  getMarineData,
  getSeaState,
  getOceanArea,
} = require("../services/oceanWeatherService");

const getOceanWeather = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required." });
    }

    const [weather, marine] = await Promise.all([
      getWeatherByCoordsService(lat, lon).catch(() => null),
      getMarineData(lat, lon),
    ]);

    return res.status(200).json({
      lat: Number(lat),
      lon: Number(lon),
      weather,
      marine,
      seaState: getSeaState(marine.current?.waveHeight),
      area: getOceanArea(lat, lon),
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "Failed to fetch ocean weather data." });
  }
};

const addOceanLocation = async (req, res) => {
  try {
    const { lat, lon, label } = req.body;

    if (lat == null || lon == null) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required." });
    }

    const existing = await OceanLocation.findOne({
      user: req.user._id,
      lat,
      lon,
    });

    if (existing) {
      return res.status(409).json({ message: "Location already exists." });
    }

    const location = await OceanLocation.create({
      user: req.user._id,
      lat,
      lon,
      label: label || `${lat}, ${lon}`,
    });

    return res.status(201).json(location);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "Failed to save location." });
  }
};

const getOceanLocations = async (req, res) => {
  try {
    const locations = await OceanLocation.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(locations);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "Failed to fetch locations." });
  }
};

const deleteOceanLocation = async (req, res) => {
  try {
    const location = await OceanLocation.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!location) {
      return res.status(404).json({ message: "Location not found." });
    }

    await location.deleteOne();
    return res.status(200).json({ message: "Location deleted successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "Failed to delete location." });
  }
};

module.exports = {
  getOceanWeather,
  addOceanLocation,
  getOceanLocations,
  deleteOceanLocation,
};
