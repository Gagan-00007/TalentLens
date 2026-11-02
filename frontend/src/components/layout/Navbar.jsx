import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, PlusCircle } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export function Navbar({ health, onToggleSidebar, isSidebarOpen }) {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return 'Dashboard Overview';
      case '/analyze':
        return 'Candidate Resume Analysis';
      case '/results':
        return 'Evaluation Report';
      case '/about':
        return 'Platform Architecture & About';
      default:
        return 'TalentLens AI';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200/80 px-4 sm:px-6 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                TalentLens
              </span>
              <span className="text-xs text-slate-400">/</span>
              <span className="text-xs font-medium text-slate-500">
                {getPageTitle(location.pathname)}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-navy-900 tracking-tight leading-tight hidden sm:block">
              {getPageTitle(location.pathname)}
            </h1>
          </div>
        </div>

        {/* Right: API Health Status & Quick CTA */}
        <div className="flex items-center gap-3">
          <StatusBadge
            online={health.online}
            loading={health.loading}
            status={health.status}
            refresh={health.refresh}
            version={health.version}
          />

          {location.pathname !== '/analyze' && (
            <Link
              to="/analyze"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Screen</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
