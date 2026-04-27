import React from "react";
import { useLocation, Link } from "react-router-dom";
import ScoreCard from "../components/ui/ScoreCard";
import BreakdownTable from "../components/ui/BreakdownTable";
import KeywordBadges from "../components/ui/KeywordBadges";
import AIInsights from "../components/ui/AIInsights";
import JobMatchCard from "../components/ui/JobMatchCard";

export default function ResultsPage() {
  const { state } = useLocation();

  if (!state?.result) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <p style={{ color: "var(--text-muted)" }}>No results found.</p>
        <Link to="/analyze" style={{ color: "var(--primary)", fontWeight: 600 }}>← Analyze a resume</Link>
      </div>
    );
  }

  const { result, mode } = state;
  const { data } = result;

  return (
    <div style={{ maxWidth: "820px", margin: "2rem auto", padding: "0 1.5rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontWeight: 700, fontSize: "1.75rem" }}>
          {mode === "match" ? "Job Match Results" : "Resume Analysis"}
        </h1>
        <Link to="/analyze" style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          padding: "8px 16px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 500
        }}>
          ← Analyze Another
        </Link>
      </div>

      {mode === "match" ? (
        <JobMatchCard data={data} />
      ) : (
        <>
          <ScoreCard score={data.score} wordCount={data.wordCount} />
          <BreakdownTable breakdown={data.score.breakdown} />
          <AIInsights analysis={data.analysis} />
          <KeywordBadges
            found={data.score.breakdown.techKeywords.found}
            missing={data.analysis.missingKeywords || []}
          />
        </>
      )}
    </div>
  );
}
