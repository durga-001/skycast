const Wardrobe = require("../models/Wardrobe");

const addWardrobeItem = async (req, res) => {
  try {

    const existingItem = await Wardrobe.findOne({
      user: req.user._id,
      category: req.body.category,
      name: req.body.name.trim(),
    });

    if (existingItem) {
      return res.status(400).json({
        message: "This wardrobe item already exists.",
      });
    }
    
    const item = await Wardrobe.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

const getWardrobe = async (req, res) => {
  try {
    const items = await Wardrobe.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(items);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

const deleteWardrobeItem = async (req, res) => {
  try {
    const item = await Wardrobe.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!item)
      return res.status(404).json({
        message: "Item not found",
      });

    await Wardrobe.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};

module.exports = {
  addWardrobeItem,
  getWardrobe,
  deleteWardrobeItem,
};
