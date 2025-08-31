// backend/utils/ocrParser.js
const Tesseract = require("tesseract.js");

const ocrParser = async (filePath) => {
  const { data: { text } } = await Tesseract.recognize(filePath, "eng");
  return text;
};

module.exports = ocrParser;
