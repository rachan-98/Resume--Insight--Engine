import React from "react";

const gradeColors = {
  A: { bg: "#d1fae5", text: "#065f46" },
  B: { bg: "#dbeafe", text: "#1e40af" },
  C: { bg: "#fef9c3", text: "#854d0e" },
  D: { bg: "#ffedd5", text: "#9a3412" },
  F: { bg: "#fee2e2", text: "#991b1b" },
};

export default function ScoreCard({ score, wordCount }) {
  const { total, grade, breakdown } = score;
  const color = gradeColors[grade.letter] || gradeColors["C"];

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "2rem", marginBottom: "1.5rem",
      boxShadow: "var(--shadow)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
        {/* Big score */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "100px", height: "100px", borderRadius: "50%",
            background: color.bg, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            border: `3px solid ${color.text}20`
          }}>
            <span style={{ fontSize: "2rem", fontWeight: 700, color: color.text }}>{total}</span>
            <span style={{ fontSize: "0.75rem", color: color.text, fontWeight: 500 }}>/100</span>
          </div>
          <div style={{
            marginTop: "0.5rem", fontWeight: 700, fontSize: "1.1rem", color: color.text,
            background: color.bg, borderRadius: "20px", padding: "2px 12px", display: "inline-block"
          }}>
            {grade.letter} · {grade.label}
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "1rem" }}>
          {[
            { label: "Action Verbs", val: breakdown.actionVerbs.score, max: 20 },
            { label: "Contact Info", val: breakdown.contactInfo.score, max: 10 },
            { label: "Achievements", val: breakdown.quantifiedAchievements.score, max: 20 },
            { label: "Tech Keywords", val: breakdown.techKeywords.score, max: 15 },
          ].map((s) => (
            <div key={s.label} style={{ background: "var(--bg)", borderRadius: "8px", padding: "0.75rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "4px" }}>{s.label}</div>
              <div style={{ fontWeight: 600 }}>{s.val}<span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/{s.max}</span></div>
              <div style={{ marginTop: "6px", height: "4px", background: "#e2e8f0", borderRadius: "2px" }}>
                <div style={{ height: "100%", width: `${(s.val / s.max) * 100}%`, background: "var(--primary)", borderRadius: "2px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        Word count: {wordCount} words
        {wordCount < 300 && " · Too short — aim for 300–700 words."}
        {wordCount > 1000 && " · Too long — try to trim to under 800 words."}
      </p>
    </div>
  );
}
