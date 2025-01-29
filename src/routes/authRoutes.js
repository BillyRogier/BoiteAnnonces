const express = require("express");
const {
  register,
  login,
  logout,
  githubAuth,
  googleAuth,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/github", githubAuth);
router.get("/google", googleAuth);

module.exports = router;
