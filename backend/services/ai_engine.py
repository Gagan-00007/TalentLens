"""
TalentLens — Gemini AI Scoring Engine
=======================================
Evaluates a candidate's resume against a job description using
the Google Gemini API. Returns a structured JSON analysis with
match score, matched/missing skills, and an experience summary.
"""

import json
import os

import google.generativeai as genai

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
# In production the API key MUST come from an environment variable.
# Fallback to a placeholder only to make local development obvious
# when the key is missing.
_API_KEY = os.getenv("GEMINI_API_KEY", "")

if not _API_KEY:
    print(
        "\n⚠️  WARNING: GEMINI_API_KEY is not set. "
        "AI scoring will fail until you export it.\n"
    )

genai.configure(api_key=_API_KEY)

# ---------------------------------------------------------------------------
# System instruction — forces structured JSON output
# ---------------------------------------------------------------------------
_SYSTEM_INSTRUCTION = """\
You are a seasoned technical recruiter with deep knowledge of technology stacks,
job-market expectations, and resume best practices.

Compare the provided Job Description against the Candidate Resume and return
**ONLY** a valid JSON object that exactly matches the following schema — no
markdown fences, no extra keys, no commentary:

{
  "overall_match_score": <integer 0-100>,
  "matched_skills": ["skill_1", "skill_2"],
  "missing_skills": ["skill_a", "skill_b"],
  "experience_summary": "<1-3 sentence summary of how the candidate's experience aligns with the role>"
}

Scoring guidelines:
- 90-100 → Exceptional match, nearly all requirements met.
- 70-89  → Strong match with minor gaps.
- 50-69  → Moderate match, several key skills missing.
- Below 50 → Weak match, significant skill/experience gaps.
"""


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------
def evaluate_candidate(jd_text: str, resume_text: str) -> dict:
    """Score *resume_text* against *jd_text* using Gemini.

    Returns a dict with keys:
        overall_match_score  (int)
        matched_skills       (list[str])
        missing_skills       (list[str])
        experience_summary   (str)

    Raises ``ValueError`` if Gemini returns unparseable JSON, or
    ``google.api_core.exceptions.*`` on network / auth errors.
    """
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=_SYSTEM_INSTRUCTION,
        generation_config={"response_mime_type": "application/json"},
    )

    prompt = (
        f"## Job Description\n{jd_text}\n\n"
        f"## Candidate Resume\n{resume_text}"
    )

    response = model.generate_content(prompt)

    try:
        result = json.loads(response.text)
    except json.JSONDecodeError as exc:
        raise ValueError(
            f"Gemini returned non-JSON response: {response.text!r}"
        ) from exc

    return result
