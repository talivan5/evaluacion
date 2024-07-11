const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { register, login } = require("../controllers/authController.js");
const { authenticateToken } = require("../middleware/auth.js");

router.post(
  "/register",
  [
    body("username").isString().notEmpty(),
    body("password").isString().isLength({ min: 6 }),
  ],
  register
);

router.post(
  "/login",
  [
    body("username").isString().notEmpty(),
    body("password").isString().notEmpty(),
  ],
  login
);

router.get("/profile", authenticateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
