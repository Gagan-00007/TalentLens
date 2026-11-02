import React from 'react';
import { 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Clock, 
  Target, 
  Code2, 
  Zap, 
  CheckCircle2,
  Lock,
  Workflow
} from 'lucide-react';

export function AboutPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Overview Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>TalentLens Technical Overview</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
          About TalentLens AI Platform
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-3xl">
          TalentLens is a modern, enterprise-grade AI resume screening and candidate evaluation platform. 
          Built with an asynchronous FastAPI backend and a responsive React frontend, it empowers technical recruiters 
          to objectively quantify candidate alignment, uncover hidden skill gaps, and accelerate hiring velocity.
        </p>
      </div>

      {/* Purpose & Core Value Proposition */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-standard p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-navy-900">Platform Purpose</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Traditional keyword search engines (ATS) miss qualified candidates due to semantic phrasing variations or synonym mismatches. 
            TalentLens bridges this gap using LLM reasoning to comprehend the genuine depth of candidate experience relative to real-world role requirements.
          </p>
        </div>

        <div className="card-standard p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-navy-900">Deterministic Scoring</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            By constraining Google Gemini to a strict JSON schema without conversational filler, TalentLens delivers reproducible 
            0–100 match scores and distinct skill arrays that feed directly into recruiter dashboards and analytics workflows.
          </p>
        </div>
      </section>

      {/* Architecture & How It Works */}
      <section className="card-standard p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-brand-600" />
          <h3 className="text-lg font-bold text-navy-900">End-to-End System Architecture</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Frontend Client</span>
              <Code2 className="w-4 h-4 text-slate-400" />
            </div>
            <h4 className="text-sm font-semibold text-navy-900">React 18 + Vite + Tailwind</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Responsive single-page application orchestrating input states, real-time health checks, error management, and SVG score visualization.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">API Gateway</span>
              <Cpu className="w-4 h-4 text-slate-400" />
            </div>
            <h4 className="text-sm font-semibold text-navy-900">FastAPI 0.115 + Pydantic v2</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              High-throughput asynchronous server handling CORS, payload validation (`POST /api/analyze`), and health probes (`GET /api/health`).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">AI Engine</span>
              <Sparkles className="w-4 h-4 text-slate-400" />
            </div>
            <h4 className="text-sm font-semibold text-navy-900">Gemini 2.5 Flash</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Google Generative AI service instructed with recruiter personas and forced to output application/json matching the required response schema.
            </p>
          </div>
        </div>

        {/* API Contract Callout */}
        <div className="p-4 rounded-xl bg-navy-900 text-slate-200 space-y-2 text-xs">
          <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 border-b border-navy-800 pb-2">
            <span>POST /api/analyze</span>
            <span className="text-emerald-400">Content-Type: application/json</span>
          </div>
          <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto pt-1">
{`// Request Payload:
{
  "jd_text": "Job description text...",
  "resume_text": "Candidate resume text..."
}

// Structured AI Response:
{
  "overall_match_score": 85,
  "matched_skills": ["Python", "FastAPI", "React", "Docker"],
  "missing_skills": ["Kubernetes"],
  "experience_summary": "Strong engineering profile with excellent backend API skills..."
}`}
          </pre>
        </div>
      </section>

      {/* Benefits of AI-Assisted Recruitment */}
      <section className="card-standard p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-navy-900">
          Core Benefits for Talent Acquisition Teams
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-navy-900">80% Reduction in Screening Time</h4>
              <p className="text-xs text-slate-600 mt-1">
                Eliminate manual resume parsing and keyword searching. Recruiters evaluate candidate fit in under 5 seconds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-navy-900">Objective Competency Validation</h4>
              <p className="text-xs text-slate-600 mt-1">
                Screening is rooted in verified technical alignment, reducing unconscious bias and ensuring equitable candidate reviews.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-navy-900">Clear Visibility into Skill Gaps</h4>
              <p className="text-xs text-slate-600 mt-1">
                Recruiters immediately see what technical skills the candidate lacks, enabling tailored interview questions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
            <Lock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-navy-900">Privacy & Enterprise Security</h4>
              <p className="text-xs text-slate-600 mt-1">
                Frontend client never touches Gemini API keys directly; all requests flow securely through the private FastAPI gateway.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
