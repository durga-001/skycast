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

    if (!city_name || !country) {
      return res.status(400).json({
        message: "City and country are required.",
      });
    }

    const trimmedCity = city_name.trim();
    const trimmedCountry = country.trim();

    const existingLocation = await Location.findOne({
      user: req.user._id,
      city_name: {
        $regex: new RegExp(`^${trimmedCity}$`, "i"),
      },
      country: {
        $regex: new RegExp(`^${trimmedCountry}$`, "i"),
      },
    });

    if (existingLocation) {
      return res.status(409).json({
        message: "Location already exists.",
      });
    }

    const location = await Location.create({
      user: req.user._id,
      city_name: trimmedCity,
      country: trimmedCountry,
    });

    return res.status(201).json(location);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to save location.",
    });
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json(locations);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch locations.",
    });
  }
};

const getWeather = async (req, res) => {
  try {
    const city = req.params.city?.trim();

    if (!city) {
      return res.status(400).json({
        message: "City is required.",
      });
    }

    const data = await getWeatherByCity(city);

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch weather data.",
    });
  }
};

const getForecast = async (req, res) => {
  try {
    const city = req.params.city?.trim();

    if (!city) {
      return res.status(400).json({
        message: "City is required.",
      });
    }

    const data = await getForecastByCity(city);

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch forecast data.",
    });
  }
};

const fetchWeatherNews = async (req, res) => {
  try {
    const news = await getWeatherNews();

    return res.status(200).json(news);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch weather news.",
    });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!location) {
      return res.status(404).json({
        message: "Location not found.",
      });
    }

    await location.deleteOne();

    return res.status(200).json({
      message: "Location deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to delete location.",
    });
  }
};

const getWeatherByCoords = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        message: "Latitude and longitude are required.",
      });
    }

    const data = await getWeatherByCoordsService(lat, lon);

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch weather data.",
    });
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

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch air quality.",
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
