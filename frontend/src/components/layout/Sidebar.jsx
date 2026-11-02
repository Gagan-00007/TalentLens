import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileSearch, 
  BarChart3, 
  Info, 
  Sparkles, 
  Layers, 
  Cpu,
  ExternalLink
} from 'lucide-react';

const NAV_ITEMS = [
  {
    to: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    to: '/analyze',
    label: 'Resume Analysis',
    icon: FileSearch,
    badge: 'Core',
  },
  {
    to: '/results',
    label: 'Evaluation Results',
    icon: BarChart3,
    badge: null,
  },
  {
    to: '/about',
    label: 'Platform & Architecture',
    icon: Info,
    badge: null,
  },
];

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-navy-900 text-slate-200 border-r border-navy-800 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="px-6 py-5 border-b border-navy-800/80 flex items-center justify-between">
            <NavLink to="/" onClick={onClose} className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-900/40 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                  TalentLens
                </span>
                <span className="block text-[11px] font-medium text-slate-400 tracking-wider uppercase">
                  AI Recruiter Engine
                </span>
              </div>
            </NavLink>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-6 space-y-1">
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Workspace
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-sm shadow-brand-900/40 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-navy-800/70'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/30 text-brand-200 border border-brand-400/30">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom System & Architecture Info */}
        <div className="p-4 border-t border-navy-800/80 bg-navy-950/40">
          <div className="p-3 rounded-lg bg-navy-850 border border-navy-800 text-xs space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <Cpu className="w-4 h-4 text-brand-400" />
              <span>AI Engine Stack</span>
            </div>
            <div className="text-[11px] text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Model:</span>
                <span className="font-mono text-slate-200">gemini-2.5-flash</span>
              </div>
              <div className="flex justify-between">
                <span>Backend:</span>
                <span className="font-mono text-slate-200">FastAPI 0.115</span>
              </div>
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="font-mono text-emerald-400">Strict JSON</span>
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span>TalentLens v0.1.0</span>
            <span className="font-mono">JIRA: TAL-5</span>
          </div>
        </div>
      </aside>
    </>
  );
}
