# Workspace

## Overview

AI Resume Analyzer + Job Matcher — a full-stack MERN-style monorepo app that parses resumes (PDF upload), uses OpenAI to score them, gives AI feedback, and matches against job roles.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **AI**: OpenAI GPT-5.2 via Replit AI Integrations (no user API key needed)
- **PDF parsing**: pdfjs-dist (client-side text extraction)

## Features

- PDF resume upload (client-side text extraction via pdfjs-dist)
- AI analysis: Overall Score, Keyword Score, Structure Score, Impact Score (0-100)
- Strengths & Weaknesses lists
- Missing keywords chip list
- Actionable improvement suggestions (high/medium/low priority)
- Job matching (5-7 matched roles with match %, required/missing skills, salary range)
- Analysis history with sidebar navigation
- Optional job description input for targeted matching

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server (resume routes, OpenAI integration)
│   └── resume-analyzer/    # React + Vite frontend (PDF upload, results dashboard)
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   ├── db/                 # Drizzle ORM schema + DB connection
│   ├── integrations-openai-ai-server/  # OpenAI server-side client
│   └── integrations-openai-ai-react/   # OpenAI React hooks (audio)
├── scripts/
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Database Schema

- `resume_analyses` table — stores each resume analysis with all scores, strengths, weaknesses, suggestions, and job matches as JSONB

## API Endpoints

- `GET /api/healthz` — health check
- `POST /api/resume/analyze` — analyze resume text, returns full analysis + saves to DB
- `GET /api/resume/history` — list past analyses
- `GET /api/resume/history/:id` — get specific analysis by ID

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server with resume analysis routes using OpenAI GPT-5.2.

### `artifacts/resume-analyzer` (`@workspace/resume-analyzer`)

React + Vite frontend with PDF upload, score gauges, job match cards, and analysis history sidebar.

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

- `src/schema/resumes.ts` — `resume_analyses` table

Production migrations are handled by Replit when publishing. In development: `pnpm --filter @workspace/db run push`.

### `lib/api-spec` (`@workspace/api-spec`)

OpenAPI 3.1 spec for all resume analysis endpoints.

Run codegen: `pnpm --filter @workspace/api-spec run codegen`
