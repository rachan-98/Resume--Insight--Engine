const validateJobDescription = (req, res, next) => {
  const { jobDescription } = req.body;

  if (!jobDescription || typeof jobDescription !== "string") {
    return res.status(400).json({ error: "jobDescription is required." });
  }
  if (jobDescription.trim().length < 50) {
    return res.status(400).json({ error: "Job description is too short (minimum 50 characters)." });
  }
  if (jobDescription.length > 5000) {
    return res.status(400).json({ error: "Job description is too long (maximum 5000 characters)." });
  }

  next();
};

module.exports = { validateJobDescription };
