const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  validateToken,
} = require("../controller/authController");

router.post("/register", register);
router.get("/login", login);
router.delete("/logout", logout);
router.get("/validate-token", validateToken);

module.exports = router;
