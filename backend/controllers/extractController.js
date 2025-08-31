const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

exports.extractText = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const buffer = req.file.buffer;
    let extractedText = "";

    // PDF parsing
    if (req.file.mimetype === "application/pdf") {
      const data = await pdfParse(buffer);
      extractedText = data.text;
    }
    // Image OCR parsing
    else if (req.file.mimetype.startsWith("image/")) {
      const result = await Tesseract.recognize(buffer, "eng");
      extractedText = result.data.text;
    } else {
      extractedText = "Unsupported file type";
    }

    res.json({ extractedText });
  } catch (err) {
    console.error("Error extracting text:", err);
    res.status(500).json({ error: "Failed to extract text" });
  }
};
