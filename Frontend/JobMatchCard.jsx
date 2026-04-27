import React from "react";

const recommendationColors = {
  "Apply": { bg: "#d1fae5", text: "#065f46" },
  "Apply with cover letter": { bg: "#fef9c3", text: "#854d0e" },
  "Not recommended": { bg: "#fee2e2", text: "#991b1b" },
};

export default function JobMatchCard({ data }) {
  if (!data) return null;
  const { matchScore, matchedKeywords, missingKeywords, matchedRequirements,
          missingRequirements, recommendation, coverLetterTips } = data;

  const recColor = recommendationColors[recommendation] || recommendationColors["Apply with cover letter"];
  const barColor = matchScore >= 75 ? "#10b981" : matchScore >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div>
      {/* Match score */}
      <div style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "var(--radius)", padding: "2rem", marginBottom: "1.5rem", textAlign: "center"
      }}>
        <div style={{ fontSize: "4rem", fontWeight: 700, color: barColor }}>{matchScore}%</div>
        <div style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>Job Match Score</div>
        <div style={{ height: "8px", background: "#e2e8f0", borderRadius: "4px", maxWidth: "300px", margin: "0 auto" }}>
          <div style={{ height: "100%", width: `${matchScore}%`, background: barColor, borderRadius: "4px" }} />
        </div>
        <div style={{
          display: "inline-block", marginTop: "1.25rem",
          background: recColor.bg, color: recColor.text,
          padding: "6px 20px", borderRadius: "20px", fontWeight: 600, fontSize: "0.9rem"
        }}>
          {recommendation}
        </div>
      </div>

      {/* Keywords grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.25rem" }}>
          <h3 style={{ fontSize: "0.85rem", fontWeight: 600, color: "#065f46", marginBottom: "0.75rem" }}>✅ Matched Keywords</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {matchedKeywords?.map((k) => (
              <span key={k} style={{ background: "#d1fae5", color: "#065f46", padding: "3px 10px", borderRadius: "20px", fontSize: "0.8rem" }}>{k}</span>
            ))}
          </div>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.25rem" }}>
          <h3 style={{ fontSize: "0.85rem", fontWeight: 600, color: "#991b1b", marginBottom: "0.75rem" }}>❌ Missing Keywords</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {missingKeywords?.map((k) => (
              <span key={k} style={{ background: "#fee2e2", color: "#991b1b", padding: "3px 10px", borderRadius: "20px", fontSize: "0.8rem" }}>{k}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Cover letter tips */}
      {coverLetterTips?.length > 0 && (
        <div style={{ background: "#ede9fe30", border: "1px solid #c4b5fd", borderRadius: "var(--radius)", padding: "1.25rem" }}>
          <h3 style={{ fontSize: "0.85rem", fontWeight: 600, color: "#5b21b6", marginBottom: "0.75rem" }}>📝 Cover Letter Tips</h3>
          <ul style={{ paddingLeft: "1.25rem" }}>
            {coverLetterTips.map((tip, i) => (
              <li key={i} style={{ fontSize: "0.875rem", marginBottom: "6px" }}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
