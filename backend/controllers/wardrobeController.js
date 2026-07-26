const Wardrobe = require("../models/Wardrobe");

const addWardrobeItem = async (req, res) => {
  try {
    const { category, name, color, seasons } = req.body;

    if (!category || !name) {
      return res.status(400).json({
        message: "Category and name are required.",
      });
    }

    const trimmedName = name.trim();

    const existingItem = await Wardrobe.findOne({
      user: req.user._id,
      category,
      name: {
        $regex: new RegExp(`^${trimmedName}$`, "i"),
      },
    });

    if (existingItem) {
      return res.status(409).json({
        message: "This wardrobe item already exists.",
      });
    }

    const item = await Wardrobe.create({
      user: req.user._id,
      category,
      name: trimmedName,
      color: color?.trim() || "",
      seasons: Array.isArray(seasons) ? seasons : [],
    });

    return res.status(201).json(item);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to add wardrobe item.",
    });
  }
};

const getWardrobe = async (req, res) => {
  try {
    const items = await Wardrobe.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json(items);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to fetch wardrobe.",
    });
  }
};

const deleteWardrobeItem = async (req, res) => {
  try {
    const item = await Wardrobe.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({
        message: "Item not found.",
      });
    }

    await item.deleteOne();

    return res.status(200).json({
      message: "Wardrobe item deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Failed to delete wardrobe item.",
    });
  }
};

module.exports = {
  addWardrobeItem,
  getWardrobe,
  deleteWardrobeItem,
};
