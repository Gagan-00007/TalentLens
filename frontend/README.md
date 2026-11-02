# TalentLens Frontend

TalentLens is a modern, enterprise-grade AI resume screening and candidate evaluation platform. This frontend application is built with React 18, Vite, and Tailwind CSS, connecting to an asynchronous FastAPI backend powered by Google Gemini 2.5 Flash.

---

## Technology Stack

- **UI Library**: React 18 (JavaScript / JSX)
- **Bundler & Dev Server**: Vite 6
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v3 with custom brand/navy theme
- **Icons**: Lucide React
- **API Client**: Native `fetch` with typed custom error wrappers (`ApiError`)

---

## Directory Structure

```
frontend/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Images and design assets
│   ├── components/
│   │   ├── common/         # StatusBadge, ScoreGauge, LoadingSkeleton, ErrorBanner
│   │   └── layout/         # Navbar, Sidebar, Footer, MainLayout
│   ├── data/               # Built-in realistic demonstration sample presets
│   ├── hooks/              # Custom hooks (useBackendHealth)
│   ├── pages/              # DashboardPage, AnalysisPage, ResultsPage, AboutPage
│   ├── services/           # api.js (FastAPI client & request orchestration)
│   ├── App.jsx             # Router and global health provider
│   ├── index.css           # Tailwind directives and utility classes
│   └── main.jsx            # React root mount
├── .env                    # Active environment variables
├── .env.example            # Environment template
├── index.html              # HTML shell with Inter typography
├── package.json            # Node.js dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind theme configuration
├── vercel.json             # Vercel SPA routing configuration
└── vite.config.js          # Vite build and dev server config
```

---

## Prerequisites

- **Node.js**: v18.x, v20.x, or v22.x LTS
- **npm**: v9.x or v10.x+
- **Python**: 3.10+ (for running the backend)

---

## Installation & Startup

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

The frontend reads configuration from `.env`:

```env
# URL of the FastAPI backend server (default: http://localhost:8000)
VITE_API_BASE_URL=http://localhost:8000
```

To customize, copy `.env.example` to `.env` and edit `VITE_API_BASE_URL`.

### 3. Start Development Server

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

---

## Running the Backend (FastAPI)

To run the backend server alongside the frontend:

1. From the repository root (`TalentLens`):
   ```bash
   pip install -r backend/requirements.txt
   ```
2. Set the required Google Gemini API key:
   - On Windows (PowerShell):
     ```powershell
     $env:GEMINI_API_KEY = "your-actual-gemini-api-key"
     ```
   - On Linux / macOS:
     ```bash
     export GEMINI_API_KEY="your-actual-gemini-api-key"
     ```
3. Start the FastAPI server on port 8000:
   ```bash
   uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
   ```
4. Verify the backend health:
   - Endpoint: `http://localhost:8000/api/health`
   - OpenAPI Docs: `http://localhost:8000/docs`

---

## Backend Integration Details

The frontend communicates with the backend via two primary endpoints:

### 1. `GET /api/health`
- **Purpose**: Live health probe polled periodically by the frontend navbar to show connection status.
- **Response**: `{"status": "ok", "service": "TalentLens API", "version": "0.1.0"}`

### 2. `POST /api/analyze`
- **Purpose**: Scores candidate resumes against job descriptions.
- **Request Format**:
  ```json
  {
    "jd_text": "Job description text...",
    "resume_text": "Candidate resume text..."
  }
  ```
- **Response Format**:
  ```json
  {
    "overall_match_score": 85,
    "matched_skills": ["Python", "FastAPI", "React", "Docker"],
    "missing_skills": ["Kubernetes", "GraphQL"],
    "experience_summary": "Candidate demonstrates strong fullstack capabilities..."
  }
  ```

### Error Handling
- **HTTP 422**: Form validation failure (empty text inputs). Handled with inline error messages.
- **HTTP 502**: Model JSON formatting failure. Handled with actionable retry options.
- **HTTP 500**: Backend AI engine or server exceptions.
- **Connection Refused**: Visual warning that FastAPI is offline with instructions on starting `uvicorn`.

---

## Build & Production Deployment

To create an optimized production build:

```bash
npm run build
```

This compiles minified HTML, CSS, and JavaScript into `frontend/dist/`.

To preview the production build locally:

```bash
npm run preview
```

### Vercel Deployment
The repository includes `frontend/vercel.json` configured with SPA rewrites (`/(.*) -> /index.html`), ensuring client-side routes (`/analyze`, `/results`, `/about`) load directly without 404 errors.

---

## Testing & Quality Assurance

1. **Production Build Validation**:
   ```bash
   npm run build
   ```
   Ensures zero compilation errors, unresolved imports, or syntax warnings.

2. **Route Testing**:
   - `/`: Dashboard with platform metrics, workflow visualizer, and local recent analyses.
   - `/analyze`: Candidate analysis form with character counters, preset loaders, and reset button.
   - `/results`: Evaluation report with circular score gauge, matched skills, missing skills, and Markdown export.
   - `/about`: Architecture blueprint and system documentation.

3. **Validation & State Checks**:
   - Submitting with empty fields displays clear client-side validation notices.
   - While an analysis is in flight, the multi-step loading skeleton renders.
   - If the backend is unreachable, a persistent diagnostic alert displays troubleshooting steps.

---

## Known Limitations

1. **Plain Text Ingestion**: The backend AI engine accepts text payloads. Binary PDF and DOCX files must have their plain text copied and pasted into the text area (the UI provides a clear warning if a `.pdf` is selected).
2. **Local Screening History**: Recent analyses are stored in browser `localStorage` for privacy and session persistence; they are not synced across devices or written to a central database.
