const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addWardrobeItem,
  getWardrobe,
  deleteWardrobeItem,
} = require("../controllers/wardrobeController");

router.get("/", protect, getWardrobe);

router.post("/", protect, addWardrobeItem);

router.delete("/:id", protect, deleteWardrobeItem);

module.exports = router;
