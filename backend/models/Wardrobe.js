const mongoose = require("mongoose");

const wardrobeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      enum: ["Top", "Bottom", "Footwear", "Accessory"],
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      default: "",
    },

    seasons: [
      {
        type: String,
        enum: ["Hot", "Warm", "Cold", "Rainy", "Snowy"],
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Wardrobe", wardrobeSchema);
