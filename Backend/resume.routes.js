const express = require("express");
const router = express.Router();
const multer = require("multer");
const { analyzeResume, matchJobDescription } = require("../controllers/resume.controller");
const { validateJobDescription } = require("../middleware/validation.middleware");

// Store file in memory (no disk writes needed)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are accepted"), false);
    }
  },
});

// POST /api/resume/analyze - Upload PDF and get analysis
router.post("/analyze", upload.single("resume"), analyzeResume);

// POST /api/resume/match - Match resume against a job description
router.post("/match", upload.single("resume"), validateJobDescription, matchJobDescription);

module.exports = router;
