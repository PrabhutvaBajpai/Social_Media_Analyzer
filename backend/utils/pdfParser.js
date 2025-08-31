const pdfParse = require("pdf-parse");

const pdfParser = async (buffer) => {
  const data = await pdfParse(buffer);
  return data.text;
};

module.exports = pdfParser;
