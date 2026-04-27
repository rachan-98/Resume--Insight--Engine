import React from "react";
import { Link, useLocation } from "react-router-dom";

const styles = {
  nav: {
    background: "#fff",
    borderBottom: "1px solid var(--border)",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "60px",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontWeight: 700,
    fontSize: "1.1rem",
    color: "var(--primary)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  links: { display: "flex", gap: "1.5rem", alignItems: "center" },
  link: { fontSize: "0.9rem", fontWeight: 500, color: "var(--text-muted)" },
  activeLink: { fontSize: "0.9rem", fontWeight: 500, color: "var(--primary)" },
  cta: {
    background: "var(--primary)",
    color: "#fff",
    padding: "8px 18px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    fontWeight: 600,
  },
};

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        📄 Resume Insight Engine
      </Link>
      <div style={styles.links}>
        <Link to="/" style={pathname === "/" ? styles.activeLink : styles.link}>Home</Link>
        <Link to="/analyze" style={styles.cta}>Analyze Resume</Link>
      </div>
    </nav>
  );
}
