import React from 'react';
import { Activity, Wifi, WifiOff, RefreshCw } from 'lucide-react';

export function StatusBadge({ online, loading, status, refresh, version }) {
  return (
    <div className="flex items-center gap-2">
      <div 
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
          loading
            ? 'bg-amber-50 text-amber-700 border-amber-200'
            : online
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-rose-50 text-rose-700 border-rose-200'
        }`}
        title={online ? `FastAPI Backend Online (v${version || '0.1.0'})` : 'Backend server is offline at http://localhost:8000'}
      >
        <span className="relative flex h-2 w-2">
          {online && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          )}
          <span 
            className={`relative inline-flex rounded-full h-2 w-2 ${
              loading ? 'bg-amber-500' : online ? 'bg-emerald-500' : 'bg-rose-500'
            }`} 
          />
        </span>
        <span className="font-semibold tracking-wide">
          {loading ? 'Checking...' : online ? 'API Online' : 'API Offline'}
        </span>
      </div>

      {refresh && (
        <button
          onClick={refresh}
          title="Recheck backend health"
          className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-brand-600' : ''}`} />
        </button>
      )}
    </div>
  );
}
