const mongoose = require("mongoose");

const oceanSearchSchema = new mongoose.Schema({
  lat: Number,
  lon: Number,
  label: String,
  createdAt: Date,
});

module.exports = mongoose.model("OceanSearch", oceanSearchSchema);
