const { extractTextFromPDF } = require("../services/pdf.service");
const { analyzeResumeWithAI, matchResumeToJob } = require("../services/ai.service");
const { scoreResume } = require("../services/scoring.service");

/**
 * POST /api/resume/analyze
 * Accepts a PDF, extracts text, runs AI analysis + local scoring
 */
const analyzeResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume file uploaded." });
    }

    // Step 1: Extract raw text from PDF buffer
    const resumeText = await extractTextFromPDF(req.file.buffer);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(422).json({
        error: "Could not extract readable text from this PDF. Try a text-based PDF (not a scanned image).",
      });
    }

    // Step 2: Run local scoring (fast, no API cost)
    const localScore = scoreResume(resumeText);

    // Step 3: Run AI analysis (OpenAI)
    const aiAnalysis = await analyzeResumeWithAI(resumeText);

    res.json({
      success: true,
      data: {
        score: localScore,
        analysis: aiAnalysis,
        wordCount: resumeText.split(/\s+/).length,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/resume/match
 * Accepts a PDF + job description text, returns match score
 */
const matchJobDescription = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume file uploaded." });
    }

    const { jobDescription } = req.body;
    const resumeText = await extractTextFromPDF(req.file.buffer);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(422).json({ error: "Could not extract readable text from this PDF." });
    }

    const matchResult = await matchResumeToJob(resumeText, jobDescription);

    res.json({ success: true, data: matchResult });
  } catch (err) {
    next(err);
  }
};

module.exports = { analyzeResume, matchJobDescription };
