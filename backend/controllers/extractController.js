const pdfParser = require("../utils/pdfParser");
const ocrParser = require("../utils/ocrParser");
const path = require("path");
const fs = require("fs");

exports.extractText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "..", req.file.path);
    let extractedText = "";

    // PDF parsing
    if (req.file.mimetype === "application/pdf") {
      extractedText = await pdfParser(filePath);
    }
    // Image OCR parsing
    else if (req.file.mimetype.startsWith("image/")) {
      extractedText = await ocrParser(filePath);
    } else {
      extractedText = "Unsupported file type";
    }

    // Cleanup temp file
    fs.unlinkSync(filePath);

    res.json({ extractedText });
  } catch (err) {
    console.error("Error extracting text:", err);
    res.status(500).json({ error: "Failed to extract text" });
  }
};
