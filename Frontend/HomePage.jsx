import React from "react";
import { Link } from "react-router-dom";

const features = [
  { icon: "🎯", title: "ATS Score", desc: "See exactly how your resume scores against ATS systems with a detailed breakdown." },
  { icon: "🤖", title: "AI Analysis", desc: "GPT-4 powered insights on strengths, tone, and areas to improve." },
  { icon: "🔍", title: "Job Matching", desc: "Paste a job description and see your match score with missing keywords." },
  { icon: "⚡", title: "Instant Results", desc: "Get your full analysis in under 10 seconds." },
];

export default function HomePage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 2rem" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <span style={{
          background: "#ede9fe", color: "#7c3aed", padding: "4px 14px",
          borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600
        }}>
          AI-Powered · Free to Use
        </span>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, marginTop: "1rem", lineHeight: 1.2 }}>
          Beat the ATS.<br />Land more interviews.
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginTop: "1rem", maxWidth: "560px", margin: "1rem auto 0" }}>
          Upload your resume and get an instant score, AI feedback, keyword gaps, and job match analysis — all in one place.
        </p>
        <Link to="/analyze" style={{
          display: "inline-block", marginTop: "2rem",
          background: "var(--primary)", color: "#fff",
          padding: "14px 32px", borderRadius: "10px",
          fontWeight: 600, fontSize: "1rem"
        }}>
          Analyze My Resume →
        </Link>
      </div>

      {/* Features */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.5rem" }}>
        {features.map((f) => (
          <div key={f.title} style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", padding: "1.5rem",
            boxShadow: "var(--shadow)"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{f.icon}</div>
            <h3 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{f.title}</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
