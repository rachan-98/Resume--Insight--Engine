import React from "react";

// --- BreakdownTable ---
export function BreakdownTable({ breakdown }) {
  const rows = [
    { label: "Contact Info", key: "contactInfo" },
    { label: "Action Verbs", key: "actionVerbs" },
    { label: "Quantified Achievements", key: "quantifiedAchievements" },
    { label: "Key Sections", key: "sections" },
    { label: "Tech Keywords", key: "techKeywords" },
    { label: "Length & Formatting", key: "lengthFormatting" },
  ];

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "1.5rem", marginBottom: "1.5rem"
    }}>
      <h2 style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "1rem" }}>Score Breakdown</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
            <th style={{ textAlign: "left", padding: "8px 0", color: "var(--text-muted)", fontWeight: 500 }}>Category</th>
            <th style={{ textAlign: "right", padding: "8px 0", color: "var(--text-muted)", fontWeight: 500 }}>Score</th>
            <th style={{ width: "40%", padding: "8px 12px", color: "var(--text-muted)", fontWeight: 500 }}>Progress</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, key }) => {
            const b = breakdown[key];
            const pct = Math.round((b.score / b.max) * 100);
            const barColor = pct >= 75 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444";
            return (
              <tr key={key} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "10px 0" }}>{label}</td>
                <td style={{ textAlign: "right", fontWeight: 600 }}>{b.score}/{b.max}</td>
                <td style={{ padding: "10px 12px" }}>
                  <div style={{ height: "6px", background: "#e2e8f0", borderRadius: "3px" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: barColor, borderRadius: "3px", transition: "width 0.6s" }} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {breakdown.sections.missing.length > 0 && (
        <div style={{ marginTop: "1rem", padding: "10px 14px", background: "#fef9c3", borderRadius: "8px", fontSize: "0.85rem" }}>
          ⚠️ Missing sections: <strong>{breakdown.sections.missing.join(", ")}</strong>
        </div>
      )}
    </div>
  );
}

export default BreakdownTable;
