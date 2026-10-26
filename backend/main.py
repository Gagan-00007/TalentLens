"""
TalentLens Backend — FastAPI Server
====================================
Core API server with CORS enabled for cross-origin requests
from the React frontend.
"""

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

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
# Health-check endpoint
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
# Entrypoint for `python main.py` (development convenience)
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
