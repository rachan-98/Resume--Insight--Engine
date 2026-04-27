const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const ANALYSIS_SYSTEM_PROMPT = `You are an expert technical recruiter and resume coach with 15 years of experience hiring software engineers.
Analyse the provided resume text and return a JSON object with this EXACT structure:

{
  "summary": "2-3 sentence overall assessment",
  "atsIssues": ["list of ATS red flags — formatting, missing keywords, odd symbols"],
  "strengths": ["3-5 specific strengths you see in this resume"],
  "improvements": [
    {
      "area": "short label",
      "issue": "what is wrong",
      "fix": "concrete actionable fix"
    }
  ],
  "missingKeywords": ["important keywords absent from this resume based on the content"],
  "suggestedRoles": ["3-4 job titles this resume is best suited for"],
  "tone": "professional | casual | too casual | too formal"
}

Return ONLY valid JSON. No markdown, no explanation outside the JSON.`;

const JOB_MATCH_SYSTEM_PROMPT = `You are an expert ATS system and technical recruiter.
Compare the resume text to the job description and return a JSON object with this EXACT structure:

{
  "matchScore": 0-100,
  "matchedKeywords": ["keywords from JD found in resume"],
  "missingKeywords": ["important JD keywords NOT in resume"],
  "matchedRequirements": ["requirements the candidate meets"],
  "missingRequirements": ["requirements the candidate lacks"],
  "recommendation": "Apply | Apply with cover letter | Not recommended",
  "coverLetterTips": ["2-3 specific points to address in cover letter"]
}

Return ONLY valid JSON.`;

/**
 * Run OpenAI analysis on resume text.
 * Returns structured JSON from the model.
 */
const analyzeResumeWithAI = async (resumeText) => {
  if (!process.env.OPENAI_API_KEY) {
    // Return mock data if no API key (for local dev without burning credits)
    return getMockAnalysis();
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",          // cheap + fast for this task
    max_tokens: 1000,
    temperature: 0.3,              // low temp = consistent structured output
    messages: [
      { role: "system", content: ANALYSIS_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Here is the resume text:\n\n${resumeText.slice(0, 4000)}`, // cap tokens
      },
    ],
  });

  const raw = response.choices[0].message.content.trim();
  return JSON.parse(raw);
};

/**
 * Match resume text against a job description.
 */
const matchResumeToJob = async (resumeText, jobDescription) => {
  if (!process.env.OPENAI_API_KEY) {
    return getMockMatchResult();
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 800,
    temperature: 0.2,
    messages: [
      { role: "system", content: JOB_MATCH_SYSTEM_PROMPT },
      {
        role: "user",
        content: `RESUME:\n${resumeText.slice(0, 3000)}\n\nJOB DESCRIPTION:\n${jobDescription.slice(0, 1500)}`,
      },
    ],
  });

  const raw = response.choices[0].message.content.trim();
  return JSON.parse(raw);
};

// Mock data for local development without an API key
const getMockAnalysis = () => ({
  summary: "This is a demo analysis (no OpenAI key configured). Add OPENAI_API_KEY to .env for real results.",
  atsIssues: ["Demo mode — no real ATS analysis performed"],
  strengths: ["Demo: Strong project descriptions", "Demo: Good use of action verbs"],
  improvements: [
    { area: "Quantification", issue: "Achievements lack numbers", fix: "Add metrics like '40% reduction in load time'" },
    { area: "Keywords", issue: "Missing cloud/DevOps keywords", fix: "Add Docker, CI/CD, AWS if applicable" },
  ],
  missingKeywords: ["Docker", "CI/CD", "TypeScript", "REST APIs"],
  suggestedRoles: ["Full Stack Developer", "Backend Engineer", "Node.js Developer"],
  tone: "professional",
});

const getMockMatchResult = () => ({
  matchScore: 72,
  matchedKeywords: ["React", "Node.js", "REST APIs"],
  missingKeywords: ["TypeScript", "Docker", "GraphQL"],
  matchedRequirements: ["3+ years experience", "React proficiency"],
  missingRequirements: ["TypeScript required", "Docker experience"],
  recommendation: "Apply with cover letter",
  coverLetterTips: ["Highlight your REST API projects", "Mention willingness to learn TypeScript"],
});

module.exports = { analyzeResumeWithAI, matchResumeToJob };
