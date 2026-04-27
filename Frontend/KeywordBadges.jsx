import React from "react";

export default function KeywordBadges({ found, missing }) {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "1.5rem", marginBottom: "1.5rem"
    }}>
      <h2 style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "1rem" }}>Keyword Analysis</h2>
      {found.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.5rem", fontWeight: 500 }}>✅ Found in resume</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {found.map((k) => (
              <span key={k} style={{
                background: "#d1fae5", color: "#065f46",
                padding: "3px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 500
              }}>{k}</span>
            ))}
          </div>
        </div>
      )}
      {missing.length > 0 && (
        <div>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.5rem", fontWeight: 500 }}>❌ Missing keywords</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {missing.map((k) => (
              <span key={k} style={{
                background: "#fee2e2", color: "#991b1b",
                padding: "3px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 500
              }}>{k}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
