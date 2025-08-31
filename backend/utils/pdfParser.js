// backend/utils/pdfParser.js
const fs = require("fs");
const pdfParse = require("pdf-parse");

const pdfParser = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

module.exports = pdfParser;
