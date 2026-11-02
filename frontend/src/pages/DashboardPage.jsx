import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  FileSearch, 
  CheckCircle, 
  Award, 
  Target, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Layers,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { getScoreTier } from '../components/common/ScoreGauge';

export function DashboardPage({ health }) {
  const [recentAnalyses, setRecentAnalyses] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('talentlens_recent_analyses');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentAnalyses(parsed.slice(0, 5));
        }
      }
    } catch {
      // localStorage read fallback
    }
  }, []);

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('talentlens_recent_analyses');
      setRecentAnalyses([]);
    } catch {
      // Storage fallback
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero / Welcome Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 via-navy-850 to-brand-950 p-6 sm:p-10 text-white shadow-xl border border-navy-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>AI-Powered Talent Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Accelerate Candidate Screening with Deterministic AI
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            TalentLens evaluates candidate resumes directly against your Job Descriptions using Google Gemini AI. 
            Receive quantified match scores, verified competency overlap, and missing skill gap analysis in seconds.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/analyze"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 active:bg-brand-700 shadow-md shadow-brand-900/30 transition-all hover:gap-3"
            >
              <span>Start Candidate Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <span>Explore Architecture</span>
            </Link>
          </div>
        </div>

        {/* Decorative background visual elements */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-600/10 to-transparent pointer-events-none hidden md:block" />
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
      </section>

      {/* Platform Key Metrics & Capabilities Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-standard p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Scoring Model
            </span>
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-bold text-navy-900">Gemini 2.5 Flash</div>
            <p className="text-xs text-slate-500 mt-0.5">Strict JSON structured schema</p>
          </div>
        </div>

        <div className="card-standard p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Scoring Precision
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-bold text-navy-900">0 – 100 Scale</div>
            <p className="text-xs text-slate-500 mt-0.5">Recruiter rubric & gap breakdown</p>
          </div>
        </div>

        <div className="card-standard p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              API Throughput
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-bold text-navy-900">FastAPI 0.115</div>
            <p className="text-xs text-slate-500 mt-0.5">Asynchronous Python runtime</p>
          </div>
        </div>

        <div className="card-standard p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Backend Status
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              health.online ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            }`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-bold text-navy-900">
              {health.online ? 'Online' : 'Offline'}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {health.online ? 'Ready for evaluations' : 'Backend required on :8000'}
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="card-standard p-6 sm:p-8">
        <div className="max-w-2xl">
          <h3 className="text-lg font-bold text-navy-900 tracking-tight">
            How TalentLens Evaluates Candidates
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            A three-step deterministic AI pipeline built for modern recruiting and talent acquisition teams.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="relative p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-navy-900 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              1
            </div>
            <h4 className="text-base font-semibold text-navy-900">Input Specification</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paste or load the Job Description requirements alongside the candidate's complete resume text.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-brand-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              2
            </div>
            <h4 className="text-base font-semibold text-navy-900">Semantic AI Evaluation</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              FastAPI invokes Google Gemini 2.5 Flash with strict recruiter prompts to perform semantic competency cross-referencing.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              3
            </div>
            <h4 className="text-base font-semibold text-navy-900">Quantified Breakdown</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive a 0–100 match score, explicit matched skills, identified missing skills, and recruiter insights.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Analyses Section (Only shown when real analysis history exists) */}
      {recentAnalyses.length > 0 && (
        <section className="card-standard p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-navy-900 tracking-tight flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-600" />
                Recent Candidate Evaluations
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Saved locally from your active candidate screening session.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleClearHistory}
                className="text-xs font-medium text-slate-400 hover:text-rose-600 inline-flex items-center gap-1 transition-colors"
                title="Clear local screening history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
              <span className="text-slate-300">•</span>
              <Link
                to="/results"
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
              >
                <span>View Latest</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {recentAnalyses.map((item, idx) => {
              const tier = getScoreTier(item.overall_match_score);
              return (
                <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-navy-900">
                        {item.roleTitle || 'Candidate Screening'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${tier.badgeBg}`}>
                        Score: {item.overall_match_score}% • {tier.tier}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1 max-w-xl">
                      {item.experience_summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <Link
                      to="/results"
                      state={{ result: item }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
                    >
                      Open Report
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Quick Action Prompt Bar */}
      <section className="rounded-xl border border-brand-200 bg-brand-50/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-600 text-white rounded-xl shadow-sm">
            <FileSearch className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-navy-900">Ready to screen your next candidate?</h4>
            <p className="text-xs text-slate-600">
              Select one of our built-in sample presets or paste a custom Job Description and resume.
            </p>
          </div>
        </div>

        <Link
          to="/analyze"
          className="btn-primary w-full sm:w-auto px-6 py-2.5 font-semibold text-sm whitespace-nowrap"
        >
          Launch Resume Analysis
        </Link>
      </section>
    </div>
  );
}
