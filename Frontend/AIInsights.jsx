import React from "react";

export default function AIInsights({ analysis }) {
  if (!analysis) return null;
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "1.5rem", marginBottom: "1.5rem"
    }}>
      <h2 style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "1rem" }}>🤖 AI Insights</h2>

      {analysis.summary && (
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.25rem", lineHeight: 1.7 }}>
          {analysis.summary}
        </p>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1rem" }}>
        {analysis.strengths?.length > 0 && (
          <div style={{ background: "#d1fae520", border: "1px solid #a7f3d0", borderRadius: "8px", padding: "1rem" }}>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 600, color: "#065f46", marginBottom: "0.75rem" }}>💪 Strengths</h3>
            <ul style={{ paddingLeft: "1rem" }}>
              {analysis.strengths.map((s, i) => (
                <li key={i} style={{ fontSize: "0.85rem", color: "var(--text)", marginBottom: "4px" }}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {analysis.improvements?.length > 0 && (
          <div style={{ background: "#fef9c320", border: "1px solid #fde68a", borderRadius: "8px", padding: "1rem" }}>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 600, color: "#854d0e", marginBottom: "0.75rem" }}>🔧 Improvements</h3>
            {analysis.improvements.map((imp, i) => (
              <div key={i} style={{ marginBottom: "0.75rem" }}>
                <div style={{ fontWeight: 600, fontSize: "0.8rem" }}>{imp.area}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{imp.fix}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {analysis.suggestedRoles?.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-muted)" }}>🎯 Best-fit roles</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {analysis.suggestedRoles.map((r) => (
              <span key={r} style={{
                background: "#ede9fe", color: "#5b21b6",
                padding: "4px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 500
              }}>{r}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
