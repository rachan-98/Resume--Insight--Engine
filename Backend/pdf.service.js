const pdfParse = require("pdf-parse");

/**
 * Extracts plain text from a PDF buffer.
 * Returns the raw text string.
 */
const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    // Normalise whitespace
    return data.text.replace(/\s+/g, " ").trim();
  } catch (err) {
    throw new Error("Failed to parse PDF: " + err.message);
  }
};

module.exports = { extractTextFromPDF };
