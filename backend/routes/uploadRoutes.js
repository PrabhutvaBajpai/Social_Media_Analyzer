const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { extractText } = require("../controllers/extractController");
const serverless = require("serverless-http");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Use memory storage instead of writing to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/", upload.single("file"), extractText);

module.exports = serverless(app);
