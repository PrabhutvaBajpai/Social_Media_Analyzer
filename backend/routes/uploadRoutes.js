// backend/routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");
const { extractText } = require("../controllers/extractController");

const router = express.Router();

// Multer setup for file upload
const upload = multer({ dest: "uploads/" });

// Single file upload endpoint
router.post("/", upload.single("file"), extractText);

module.exports = router;
