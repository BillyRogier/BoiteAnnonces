const express = require("express");
const {
  createAd,
  getAds,
  getAdById,
  updateAd,
  deleteAd,
} = require("../controllers/adController");
const { protect } = require("../middleware/authMiddleware");
const { adCreationLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/", protect, adCreationLimiter, createAd);
router.get("/", getAds);
router.get("/:id", getAdById);
router.put("/:id", protect, updateAd);
router.delete("/:id", protect, deleteAd);

module.exports = router;
