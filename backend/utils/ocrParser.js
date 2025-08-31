const Tesseract = require("tesseract.js");

const ocrParser = async (buffer) => {
  const { data: { text } } = await Tesseract.recognize(buffer, "eng");
  return text;
};

module.exports = ocrParser;
