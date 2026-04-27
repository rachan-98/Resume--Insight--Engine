import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { analyzeResume, matchToJob } from "../services/api";

export default function AnalyzePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("analyze"); // "analyze" | "match"

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) setFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const handleSubmit = async () => {
    if (!file) return setError("Please upload a PDF resume.");
    if (mode === "match" && jobDesc.trim().length < 50)
      return setError("Please enter a job description (at least 50 characters).");

    setLoading(true);
    setError("");
    try {
      const result = mode === "analyze"
        ? await analyzeResume(file)
        : await matchToJob(file, jobDesc);
      navigate("/results", { state: { result, mode } });
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "680px", margin: "3rem auto", padding: "0 1.5rem" }}>
      <h1 style={{ fontWeight: 700, fontSize: "1.75rem", marginBottom: "0.5rem" }}>Analyze Your Resume</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Upload a PDF and get instant feedback.</p>

      {/* Mode toggle */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {["analyze", "match"].map((m) => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: "8px 20px", borderRadius: "8px", fontWeight: 500, fontSize: "0.9rem",
            background: mode === m ? "var(--primary)" : "var(--surface)",
            color: mode === m ? "#fff" : "var(--text-muted)",
            border: mode === m ? "none" : "1px solid var(--border)",
          }}>
            {m === "analyze" ? "📊 Full Analysis" : "🎯 Job Match"}
          </button>
        ))}
      </div>

      {/* Drop zone */}
      <div {...getRootProps()} style={{
        border: `2px dashed ${isDragActive ? "var(--primary)" : "var(--border)"}`,
        borderRadius: "var(--radius)", padding: "3rem 2rem",
        textAlign: "center", cursor: "pointer", marginBottom: "1.5rem",
        background: isDragActive ? "#ede9fe20" : "var(--surface)",
        transition: "all 0.2s",
      }}>
        <input {...getInputProps()} />
        <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📄</div>
        {file ? (
          <p style={{ fontWeight: 600, color: "var(--primary)" }}>✓ {file.name}</p>
        ) : (
          <>
            <p style={{ fontWeight: 500 }}>{isDragActive ? "Drop it here!" : "Drag & drop your resume PDF"}</p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.4rem" }}>or click to browse • Max 5MB</p>
          </>
        )}
      </div>

      {/* Job description (match mode only) */}
      {mode === "match" && (
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontWeight: 500, display: "block", marginBottom: "0.5rem" }}>Job Description</label>
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste the full job description here..."
            rows={8}
            style={{
              width: "100%", padding: "12px", borderRadius: "8px",
              border: "1px solid var(--border)", fontSize: "0.9rem",
              fontFamily: "inherit", resize: "vertical", outline: "none",
            }}
          />
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
            {jobDesc.length} / 5000 characters
          </p>
        </div>
      )}

      {error && (
        <div style={{
          background: "#fef2f2", border: "1px solid #fecaca",
          borderRadius: "8px", padding: "12px 16px",
          color: "var(--danger)", marginBottom: "1rem", fontSize: "0.9rem"
        }}>
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%", padding: "14px", borderRadius: "10px",
          background: loading ? "#a5b4fc" : "var(--primary)", color: "#fff",
          fontWeight: 600, fontSize: "1rem",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Analyzing..." : mode === "analyze" ? "Analyze Resume →" : "Check Job Match →"}
      </button>
    </div>
  );
}
