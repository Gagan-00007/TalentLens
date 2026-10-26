"""
TalentLens Backend — FastAPI Server
====================================
Core API server with CORS enabled for cross-origin requests
from the React frontend.
"""

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from backend.services.ai_engine import evaluate_candidate

app = FastAPI(
    title="TalentLens API",
    description="AI-powered resume screening and candidate evaluation platform",
    version="0.1.0",
)

# ---------------------------------------------------------------------------
# CORS — allow the React dev server and any deployed frontend to connect.
# In production, narrow `allow_origins` to the actual frontend domain.
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Request / Response schemas
# ---------------------------------------------------------------------------
class AnalyzeRequest(BaseModel):
    """Body for the /api/analyze endpoint."""
    jd_text: str
    resume_text: str


class AnalyzeResponse(BaseModel):
    """Structured AI evaluation result."""
    overall_match_score: int
    matched_skills: list[str]
    missing_skills: list[str]
    experience_summary: str


# ---------------------------------------------------------------------------
# Health-check endpoints
# ---------------------------------------------------------------------------
@app.get("/", tags=["Health"])
def health_check():
    """Simple liveness probe — returns 200 when the server is up."""
    return {"status": "TalentLens Backend is running"}


@app.get("/api/health", tags=["Health"])
def api_health():
    """Prefixed health endpoint for load-balancer / monitoring use."""
    return {"status": "ok", "service": "TalentLens API", "version": "0.1.0"}


# ---------------------------------------------------------------------------
# AI Analysis endpoint
# ---------------------------------------------------------------------------
@app.post("/api/analyze", response_model=AnalyzeResponse, tags=["Analysis"])
def analyze_resume(payload: AnalyzeRequest):
    """Score a candidate resume against a job description using Gemini AI.

    Accepts JSON body with `jd_text` and `resume_text`.
    Returns a structured evaluation with match score, skill gaps,
    and an experience summary.
    """
    if not payload.jd_text.strip():
        raise HTTPException(status_code=422, detail="jd_text must not be empty")
    if not payload.resume_text.strip():
        raise HTTPException(status_code=422, detail="resume_text must not be empty")

    try:
        result = evaluate_candidate(
            jd_text=payload.jd_text,
            resume_text=payload.resume_text,
        )
    except ValueError as exc:
        raise HTTPException(status_code=502, detail=str(exc))
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"AI engine error: {exc}",
        )

    return result


# ---------------------------------------------------------------------------
# Entrypoint for `python main.py` (development convenience)
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
