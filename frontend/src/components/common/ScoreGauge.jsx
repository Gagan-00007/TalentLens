import React from 'react';
import { Award, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export function getScoreTier(score) {
  if (score >= 90) {
    return {
      tier: 'Exceptional Match',
      description: 'Candidate meets almost all primary and secondary requirements.',
      color: 'emerald',
      strokeColor: '#10b981',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: Award,
    };
  }
  if (score >= 70) {
    return {
      tier: 'Strong Match',
      description: 'Strong technical fit with minor skill or experience gaps.',
      color: 'indigo',
      strokeColor: '#6366f1',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      icon: CheckCircle,
    };
  }
  if (score >= 50) {
    return {
      tier: 'Moderate Match',
      description: 'Candidate matches some requirements but lacks several core skills.',
      color: 'amber',
      strokeColor: '#f59e0b',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: AlertTriangle,
    };
  }
  return {
    tier: 'Weak Match',
    description: 'Significant misalignment with role requirements and required stack.',
    color: 'rose',
    strokeColor: '#f43f5e',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    icon: XCircle,
  };
}

export function ScoreGauge({ score, size = 180, strokeWidth = 14 }) {
  const clampedScore = Math.max(0, Math.min(100, Math.round(score || 0)));
  const tierConfig = getScoreTier(clampedScore);
  const TierIcon = tierConfig.icon;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Background track circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated score stroke circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={tierConfig.strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-navy-900 tracking-tight">
            {clampedScore}
          </span>
          <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
            out of 100
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${tierConfig.badgeBg}`}>
          <TierIcon className="w-3.5 h-3.5" />
          <span>{tierConfig.tier}</span>
        </div>
        <p className="mt-1.5 text-xs text-slate-600 max-w-xs text-center">
          {tierConfig.description}
        </p>
      </div>
    </div>
  );
}
