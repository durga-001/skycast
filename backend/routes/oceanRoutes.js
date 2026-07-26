const express = require("express");
const router = express.Router();

const {
  getOceanWeather,
  addOceanLocation,
  getOceanLocations,
  deleteOceanLocation,
} = require("../controllers/oceanController");

const protect = require("../middleware/authMiddleware");

router.get("/weather", getOceanWeather);
router.post("/locations", protect, addOceanLocation);
router.get("/locations", protect, getOceanLocations);
router.delete("/locations/:id", protect, deleteOceanLocation);

module.exports = router;
