import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles, Brain, CheckCircle2 } from 'lucide-react';

const ANALYSIS_STEPS = [
  'Initializing candidate evaluation request...',
  'Ingesting Job Description & Candidate Resume...',
  'Prompting Google Gemini AI Model (gemini-2.5-flash)...',
  'Analyzing technical skill match & qualifications...',
  'Generating recruiter insights and scoring rubric...',
];

export function LoadingSkeleton() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card-standard p-8 max-w-4xl mx-auto my-6 border-brand-200 bg-gradient-to-b from-white to-brand-50/20">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 shadow-inner mb-4 animate-pulse">
          <Brain className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
        </div>

        <h3 className="text-xl font-bold text-navy-900 tracking-tight flex items-center gap-2">
          Evaluating Candidate Fit
          <Sparkles className="w-5 h-5 text-brand-500 animate-bounce" />
        </h3>
        
        <p className="text-sm text-slate-600 mt-1 max-w-md">
          TalentLens AI is performing deep semantic screening between the requirements and candidate profile.
        </p>

        {/* Step progress list */}
        <div className="w-full max-w-md mt-6 space-y-2 text-left">
          {ANALYSIS_STEPS.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 text-xs font-medium px-3.5 py-2 rounded-lg border transition-all ${
                  isCurrent
                    ? 'bg-brand-50/80 border-brand-300 text-brand-800 shadow-sm'
                    : isDone
                    ? 'bg-slate-50 border-slate-200 text-slate-500 line-through opacity-70'
                    : 'border-transparent text-slate-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-brand-600 animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                )}
                <span>{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Placeholder Skeletons */}
      <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        <div className="h-44 bg-slate-200/60 rounded-xl"></div>
        <div className="h-44 bg-slate-200/60 rounded-xl"></div>
        <div className="h-44 bg-slate-200/60 rounded-xl"></div>
      </div>
    </div>
  );
}
