import React from 'react';
import { ShieldCheck, Cpu, Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white py-6 px-4 sm:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">TalentLens</span>
          <span>•</span>
          <span>AI Candidate Screening & Recruitment Intelligence</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Cpu className="w-3.5 h-3.5 text-brand-500" />
            <span>FastAPI + Gemini 2.5 Flash</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zero Data Retention</span>
          </div>
          <span className="text-slate-400">JIRA TAL-5</span>
        </div>
      </div>
    </footer>
  );
}
