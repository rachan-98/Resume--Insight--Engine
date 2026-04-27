/**
 * Local heuristic resume scorer.
 * No OpenAI API calls — runs instantly, scores 0–100.
 *
 * Breakdown:
 *  - Contact info (10 pts)
 *  - Action verbs (20 pts)
 *  - Quantified achievements (20 pts)
 *  - Key sections present (25 pts)
 *  - Tech keywords (15 pts)
 *  - Length & formatting (10 pts)
 */

const ACTION_VERBS = [
  "developed", "built", "designed", "implemented", "led", "managed",
  "created", "optimised", "improved", "reduced", "increased", "launched",
  "architected", "deployed", "automated", "integrated", "collaborated",
  "delivered", "scaled", "refactored", "migrated", "analysed",
];

const TECH_KEYWORDS = [
  "javascript", "typescript", "python", "java", "react", "node", "express",
  "mongodb", "postgresql", "mysql", "redis", "docker", "kubernetes", "aws",
  "git", "rest", "api", "graphql", "ci/cd", "agile", "sql", "nosql",
];

const REQUIRED_SECTIONS = [
  { label: "experience", patterns: ["experience", "work history", "employment"] },
  { label: "education", patterns: ["education", "degree", "university", "college"] },
  { label: "skills", patterns: ["skills", "technologies", "tech stack", "tools"] },
  { label: "projects", patterns: ["projects", "portfolio"] },
];

const scoreResume = (text) => {
  const lower = text.toLowerCase();
  const breakdown = {};

  // 1. Contact info (10 pts)
  let contactScore = 0;
  if (/[\w.]+@[\w.]+\.\w+/.test(text)) contactScore += 4;  // email
  if (/(\+?\d[\d\s\-().]{7,})\d/.test(text)) contactScore += 3;           // phone
  if (/linkedin\.com|github\.com/.test(lower)) contactScore += 3;         // links
  breakdown.contactInfo = { score: contactScore, max: 10 };

  // 2. Action verbs (20 pts)
  const verbsFound = ACTION_VERBS.filter((v) => lower.includes(v));
  const verbScore = Math.min(20, Math.round((verbsFound.length / 8) * 20));
  breakdown.actionVerbs = { score: verbScore, max: 20, found: verbsFound.slice(0, 6) };

  // 3. Quantified achievements (20 pts)
  const quantMatches = text.match(/\d+[\s]*(%|x|users|customers|ms|seconds|hours|days|team|engineers|repos|services|endpoints|requests)/gi) || [];
  const quantScore = Math.min(20, quantMatches.length * 4);
  breakdown.quantifiedAchievements = { score: quantScore, max: 20, examples: quantMatches.slice(0, 4) };

  // 4. Key sections (25 pts)
  let sectionScore = 0;
  const missingSections = [];
  REQUIRED_SECTIONS.forEach(({ label, patterns }) => {
    if (patterns.some((p) => lower.includes(p))) {
      sectionScore += 6;
    } else {
      missingSections.push(label);
    }
  });
  sectionScore = Math.min(25, sectionScore);
  breakdown.sections = { score: sectionScore, max: 25, missing: missingSections };

  // 5. Tech keywords (15 pts)
  const techFound = TECH_KEYWORDS.filter((k) => lower.includes(k));
  const techScore = Math.min(15, Math.round((techFound.length / 6) * 15));
  breakdown.techKeywords = { score: techScore, max: 15, found: techFound.slice(0, 8) };

  // 6. Length & formatting (10 pts)
  const wordCount = text.split(/\s+/).length;
  let lengthScore = 0;
  if (wordCount >= 300 && wordCount <= 800) lengthScore = 10;
  else if (wordCount >= 200 && wordCount < 300) lengthScore = 6;
  else if (wordCount > 800 && wordCount <= 1200) lengthScore = 7;
  else if (wordCount > 1200) lengthScore = 4;
  else lengthScore = 2;
  breakdown.lengthFormatting = { score: lengthScore, max: 10, wordCount };

  const total = Object.values(breakdown).reduce((sum, b) => sum + b.score, 0);

  return {
    total,
    grade: gradeFromScore(total),
    breakdown,
  };
};

const gradeFromScore = (score) => {
  if (score >= 85) return { letter: "A", label: "Excellent" };
  if (score >= 70) return { letter: "B", label: "Good" };
  if (score >= 55) return { letter: "C", label: "Average" };
  if (score >= 40) return { letter: "D", label: "Needs Work" };
  return { letter: "F", label: "Poor" };
};

module.exports = { scoreResume };
