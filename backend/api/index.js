
const express = require("express");
const cors = require("cors");
const uploadRoutes = require("../routes/uploadRoutes");
const analyzeRoutes = require("../routes/analyzeRoutes");
const serverless = require("serverless-http");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/upload", uploadRoutes);
app.use("/analyze", analyzeRoutes);

module.exports = serverless(app);
