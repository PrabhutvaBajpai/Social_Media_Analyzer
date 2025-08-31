// backend/server.js
const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();

// ✅ Middleware
app.use(cors());

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Parse URL-encoded form bodies (for form-data / x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/analyze", analyzeRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
