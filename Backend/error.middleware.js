/**
 * Global error handler — returns consistent error shape across all routes.
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  // Multer errors (file upload issues)
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "File too large. Maximum size is 5MB." });
  }
  if (err.message === "Only PDF files are accepted") {
    return res.status(415).json({ error: err.message });
  }

  // OpenAI / JSON parse errors
  if (err instanceof SyntaxError) {
    return res.status(502).json({ error: "AI returned an unexpected response. Please try again." });
  }

  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "An unexpected error occurred.",
  });
};

module.exports = { errorHandler };
