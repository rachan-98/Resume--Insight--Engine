const { scoreResume } = require("../src/services/scoring.service");

const STRONG_RESUME = `
John Doe | john@example.com | +91 9876543210 | linkedin.com/in/johndoe | github.com/johndoe

EXPERIENCE
Senior Software Engineer — Acme Corp (2021–2024)
- Developed and deployed 3 microservices handling 1M+ requests/day using Node.js and Express
- Reduced API response time by 40% through Redis caching and query optimisation
- Led a team of 5 engineers to deliver a payment integration on schedule
- Increased unit test coverage from 30% to 85% across the codebase

Junior Developer — StartupXYZ (2019–2021)
- Built React frontend with 10,000+ daily active users
- Implemented JWT authentication and role-based access control

EDUCATION
B.Tech Computer Science — NIT Hyderabad (2015–2019)

SKILLS
JavaScript, TypeScript, React, Node.js, Express, MongoDB, PostgreSQL, Redis, Docker, Git, REST APIs, GraphQL

PROJECTS
Resume Insight Engine — AI-powered ATS resume analyser built with React, Node.js, and OpenAI
Travel Booker Hub — Full-stack booking app with Redis caching serving 500 concurrent users
`;

const WEAK_RESUME = `
Jane Smith
I am a developer. I worked at various companies.
I know programming.
`;

describe("scoreResume", () => {
  describe("with a strong resume", () => {
    let result;
    beforeAll(() => { result = scoreResume(STRONG_RESUME); });

    test("returns a total score >= 70", () => {
      expect(result.total).toBeGreaterThanOrEqual(70);
    });

    test("detects contact info", () => {
      expect(result.breakdown.contactInfo.score).toBeGreaterThan(0);
    });

    test("detects action verbs", () => {
      expect(result.breakdown.actionVerbs.found.length).toBeGreaterThan(0);
    });

    test("detects quantified achievements", () => {
      expect(result.breakdown.quantifiedAchievements.score).toBeGreaterThan(0);
    });

    test("detects tech keywords", () => {
      expect(result.breakdown.techKeywords.found.length).toBeGreaterThan(3);
    });

    test("assigns grade A or B", () => {
      expect(["A", "B"]).toContain(result.grade.letter);
    });
  });

  describe("with a weak resume", () => {
    let result;
    beforeAll(() => { result = scoreResume(WEAK_RESUME); });

    test("returns a total score <= 40", () => {
      expect(result.total).toBeLessThanOrEqual(40);
    });

    test("flags missing sections", () => {
      expect(result.breakdown.sections.missing.length).toBeGreaterThan(0);
    });

    test("assigns grade D or F", () => {
      expect(["D", "F"]).toContain(result.grade.letter);
    });
  });

  test("total score is between 0 and 100", () => {
    const result = scoreResume(STRONG_RESUME);
    expect(result.total).toBeGreaterThanOrEqual(0);
    expect(result.total).toBeLessThanOrEqual(100);
  });
});
