import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  RotateCcw, 
  FileText, 
  Briefcase, 
  Play, 
  HelpCircle, 
  Upload, 
  Check, 
  Layers,
  Info
} from 'lucide-react';
import { analyzeResume, ApiError } from '../services/api';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { SAMPLE_PRESETS } from '../data/samplePresets';

export function AnalysisPage({ onAnalysisSuccess, health }) {
  const navigate = useNavigate();

  const [jdText, setJdText] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Handle Preset selection
  const handleSelectPreset = (presetId) => {
    setSelectedPresetId(presetId);
    setError(null);
    setValidationErrors({});
    if (!presetId) return;

    const preset = SAMPLE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setJdText(preset.jd);
      setResumeText(preset.resume);
    }
  };

  // Clear inputs
  const handleReset = () => {
    setJdText('');
    setResumeText('');
    setSelectedPresetId('');
    setError(null);
    setValidationErrors({});
  };

  // Client validation
  const validate = () => {
    const errors = {};
    if (!jdText.trim()) {
      errors.jd = 'Job description is required and cannot be empty.';
    } else if (jdText.trim().length < 30) {
      errors.jd = 'Job description is too short (min 30 characters recommended).';
    }

    if (!resumeText.trim()) {
      errors.resume = 'Candidate resume text is required and cannot be empty.';
    } else if (resumeText.trim().length < 30) {
      errors.resume = 'Resume text is too short (min 30 characters recommended).';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit analysis
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await analyzeResume({
        jd_text: jdText,
        resume_text: resumeText,
      });

      // Augment result with metadata for dashboard recent list
      const enrichedResult = {
        ...response,
        id: `eval_${Date.now()}`,
        timestamp: new Date().toISOString(),
        roleTitle: selectedPresetId 
          ? SAMPLE_PRESETS.find(p => p.id === selectedPresetId)?.role 
          : 'Custom Candidate Screen',
        jdSnippet: jdText.slice(0, 150),
        resumeSnippet: resumeText.slice(0, 150),
      };

      // Save to localStorage for recent analyses view
      try {
        const stored = localStorage.getItem('talentlens_recent_analyses');
        const history = stored ? JSON.parse(stored) : [];
        const updated = [enrichedResult, ...history.filter(h => h.id !== enrichedResult.id)].slice(0, 10);
        localStorage.setItem('talentlens_recent_analyses', JSON.stringify(updated));
        localStorage.setItem('talentlens_latest_result', JSON.stringify(enrichedResult));
      } catch {
        // Storage failover
      }

      if (onAnalysisSuccess) {
        onAnalysisSuccess(enrichedResult);
      }

      // Navigate to results page
      navigate('/results', { state: { result: enrichedResult } });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Optional: Simple file reader for .txt / .md files
  const handleFileUpload = (e, targetField) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.toLowerCase().endsWith('.pdf') || file.name.toLowerCase().endsWith('.docx')) {
      setError(
        new ApiError(
          'TalentLens backend accepts plain text input. For PDF or Word documents, please copy and paste the plain text directly into the text area.',
          400
        )
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        if (targetField === 'jd') setJdText(text);
        if (targetField === 'resume') setResumeText(text);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
            Screen Resume Against Job Description
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Compare candidate credentials against your exact job description using Gemini AI.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">
            Sample Preset:
          </span>
          <select
            value={selectedPresetId}
            onChange={(e) => handleSelectPreset(e.target.value)}
            disabled={loading}
            className="text-xs font-medium bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-700 hover:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
          >
            <option value="">-- Choose Sample Job & Resume --</option>
            {SAMPLE_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Backend Offline Advisory */}
      {!health.online && !health.loading && (
        <div className="p-3.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Notice:</strong> FastAPI backend appears offline at <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">http://localhost:8000</code>. You can compose and validate inputs now; ensure your backend is started before clicking Analyze.
            </span>
          </div>
          {health.refresh && (
            <button
              onClick={health.refresh}
              className="text-xs font-semibold text-amber-800 underline hover:text-amber-950 whitespace-nowrap"
            >
              Recheck Connection
            </button>
          )}
        </div>
      )}

      {/* Error Banner */}
      <ErrorBanner
        error={error}
        onRetry={handleSubmit}
        onDismiss={() => setError(null)}
      />

      {/* Loading Skeleton */}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        /* Input Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Job Description Field */}
            <div className="card-standard p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-600" />
                    <label htmlFor="jd-input" className="text-sm font-bold text-navy-900">
                      Job Description (JD)
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="upload-jd"
                      className="cursor-pointer text-[11px] font-medium text-slate-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
                      title="Load plain text / markdown file"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload .txt</span>
                      <input
                        id="upload-jd"
                        type="file"
                        accept=".txt,.md"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'jd')}
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-3">
                  <textarea
                    id="jd-input"
                    rows={14}
                    value={jdText}
                    onChange={(e) => {
                      setJdText(e.target.value);
                      if (validationErrors.jd) {
                        setValidationErrors((prev) => ({ ...prev, jd: null }));
                      }
                    }}
                    placeholder="Paste the target job description here, including responsibilities, required technical skills, qualifications, and years of experience..."
                    className={`w-full p-3.5 text-xs font-mono leading-relaxed bg-slate-50/70 border rounded-xl resize-y focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      validationErrors.jd
                        ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30'
                        : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500'
                    }`}
                  />
                  {validationErrors.jd && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">
                      {validationErrors.jd}
                    </p>
                  )}
                </div>
              </div>

              {/* Character and Word Count */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{jdText.trim() ? jdText.trim().split(/\s+/).length : 0} words</span>
                <span className="font-mono">{jdText.length} characters</span>
              </div>
            </div>

            {/* Right: Candidate Resume Field */}
            <div className="card-standard p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-600" />
                    <label htmlFor="resume-input" className="text-sm font-bold text-navy-900">
                      Candidate Resume
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="upload-resume"
                      className="cursor-pointer text-[11px] font-medium text-slate-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
                      title="Load plain text / markdown resume file"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload .txt</span>
                      <input
                        id="upload-resume"
                        type="file"
                        accept=".txt,.md"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'resume')}
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-3">
                  <textarea
                    id="resume-input"
                    rows={14}
                    value={resumeText}
                    onChange={(e) => {
                      setResumeText(e.target.value);
                      if (validationErrors.resume) {
                        setValidationErrors((prev) => ({ ...prev, resume: null }));
                      }
                    }}
                    placeholder="Paste the candidate resume text here (summary, technical proficiencies, work history, education, certifications)..."
                    className={`w-full p-3.5 text-xs font-mono leading-relaxed bg-slate-50/70 border rounded-xl resize-y focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      validationErrors.resume
                        ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/30'
                        : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500'
                    }`}
                  />
                  {validationErrors.resume && (
                    <p className="mt-1 text-xs text-rose-600 font-medium">
                      {validationErrors.resume}
                    </p>
                  )}
                </div>
              </div>

              {/* Character and Word Count */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0} words</span>
                <span className="font-mono">{resumeText.length} characters</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleReset}
                disabled={loading || (!jdText && !resumeText)}
                className="btn-secondary w-full sm:w-auto text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Form</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('fullstack-engineer')}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 underline"
              >
                Load Sample Text
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full sm:w-auto px-8 py-3 text-sm font-bold shadow-md shadow-brand-900/20"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Analyze Resume with AI</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
