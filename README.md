# TalentLens — AI Candidate Evaluation Platform

TalentLens is an AI-powered resume screening and candidate evaluation platform developed under JIRA `TAL-5`. It allows recruiters to evaluate candidate resumes against target job descriptions using Google Gemini AI, delivering deterministic 0–100 match scores, verified skill overlap, missing competency identification, and qualitative recruiter insights.

---

## Architecture Overview

TalentLens follows a decoupled full-stack architecture:

- **Backend (`/backend`)**: High-performance asynchronous FastAPI server handling CORS, payload validation, and Google Gemini API integration (`gemini-2.5-flash`) with structured JSON mode.
- **Frontend (`/frontend`)**: Modern single-page application built with React 18, Vite, and Tailwind CSS featuring dashboard analytics, interactive resume screening, circular score gauges, and Markdown report export.

```
TalentLens/
├── backend/
│   ├── main.py                  # FastAPI entry point & API routes
│   ├── requirements.txt         # Python dependencies
│   └── services/
│       └── ai_engine.py         # Google Gemini AI scoring engine
└── frontend/
    ├── src/
    │   ├── components/          # Reusable UI & layout components
    │   ├── pages/               # Dashboard, Analysis, Results, About
    │   ├── services/            # API integration service (api.js)
    │   ├── App.jsx              # Application router
    │   └── main.jsx             # React entry point
    ├── package.json             # Frontend dependencies
    └── vite.config.js           # Vite build configuration
```

---

## Quick Start

### 1. Backend Setup (FastAPI)

```bash
# 1. Install Python dependencies
pip install -r backend/requirements.txt

# 2. Set your Google Gemini API key
# On Windows (PowerShell):
$env:GEMINI_API_KEY = "your-gemini-api-key"
# On Linux/macOS:
export GEMINI_API_KEY="your-gemini-api-key"

# 3. Start the FastAPI server
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000` with interactive docs at `http://localhost:8000/docs`.

### 2. Frontend Setup (React + Vite)

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Core API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Root server liveness probe |
| `GET` | `/api/health` | API health check for monitoring |
| `POST` | `/api/analyze` | Candidate resume evaluation against job description |

---

## Frontend Features

- **Dashboard**: Platform overview, metrics, step-by-step workflow visualizer, and local screening history.
- **Resume Analysis**: Side-by-side JD and Resume textareas with character counters, reset buttons, and 1-click sample presets.
- **Results Dashboard**: Radial SVG score gauge, matched skills matrix, missing skills list, recruiter summary, and Markdown report export.
- **About Page**: Platform architecture, system design documentation, and enterprise benefits.
- **Resilient UI**: Live backend connectivity badge (`GET /api/health`), loading skeletons, and detailed HTTP error troubleshooting (422, 500, 502).

---

## License & Credits

TalentLens is developed by the engineering team under JIRA project `TAL`.
Backend by Gagan, Frontend by Vikas (`TAL-5-react-setup`).
