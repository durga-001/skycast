const express = require("express");
const { body } = require("express-validator");

const {
  register,
  login,
  logout,
  getCurrentUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),

    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  validate,
  register,
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required"),

    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  login,
);

router.post("/logout", logout);

router.get("/me", protect, getCurrentUser);

module.exports = router;
