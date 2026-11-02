/**
 * TalentLens API Client Service
 * =====================================
 * Handles communication with the FastAPI backend.
 * Provides unified request handling, error normalization,
 * and health checking.
 */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '');

/**
 * Standardized API Error Class
 */
export class ApiError extends Error {
  constructor(message, status = null, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Check backend server health status
 * @returns {Promise<{ status: string, service?: string, version?: string, online: boolean }>}
 */
export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        online: false,
        status: 'degraded',
        message: `Backend returned status ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      online: true,
      status: data.status || 'ok',
      service: data.service || 'TalentLens API',
      version: data.version || '0.1.0',
    };
  } catch (err) {
    return {
      online: false,
      status: 'offline',
      message: err.name === 'AbortError' ? 'Connection timed out' : 'Backend server unreachable at ' + API_BASE_URL,
    };
  }
}

/**
 * Evaluate Candidate Resume against Job Description via Gemini AI
 * 
 * @param {Object} payload
 * @param {string} payload.jd_text - Job description text
 * @param {string} payload.resume_text - Candidate resume text
 * @returns {Promise<{ overall_match_score: number, matched_skills: string[], missing_skills: string[], experience_summary: string }>}
 */
export async function analyzeResume({ jd_text, resume_text }) {
  // Client-side guard rails before network roundtrip
  if (!jd_text || !jd_text.trim()) {
    throw new ApiError('Job description must not be empty.', 422);
  }
  if (!resume_text || !resume_text.trim()) {
    throw new ApiError('Resume text must not be empty.', 422);
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        jd_text: jd_text.trim(),
        resume_text: resume_text.trim(),
      }),
    });
  } catch (netErr) {
    throw new ApiError(
      `Cannot connect to TalentLens backend at ${API_BASE_URL}. Please ensure the FastAPI server is running.`,
      0,
      netErr.message
    );
  }

  // Handle HTTP status codes
  if (!response.ok) {
    let errorDetail = '';
    try {
      const errorJson = await response.json();
      errorDetail = errorJson.detail || JSON.stringify(errorJson);
    } catch {
      errorDetail = response.statusText || `HTTP ${response.status}`;
    }

    if (response.status === 422) {
      throw new ApiError(
        `Validation error: ${errorDetail}`,
        422,
        errorDetail
      );
    }

    if (response.status === 502) {
      throw new ApiError(
        `AI Engine formatting error (502): The Gemini model did not return valid JSON. Detail: ${errorDetail}`,
        502,
        errorDetail
      );
    }

    if (response.status === 500) {
      throw new ApiError(
        `Backend server error (500): ${errorDetail}`,
        500,
        errorDetail
      );
    }

    throw new ApiError(
      `Request failed with status ${response.status}: ${errorDetail}`,
      response.status,
      errorDetail
    );
  }

  const result = await response.json();

  // Validate response contract
  if (
    typeof result.overall_match_score !== 'number' ||
    !Array.isArray(result.matched_skills) ||
    !Array.isArray(result.missing_skills) ||
    typeof result.experience_summary !== 'string'
  ) {
    throw new ApiError(
      'Malformed response from server: Missing required scoring fields.',
      502,
      result
    );
  }

  return result;
}

export { API_BASE_URL };
