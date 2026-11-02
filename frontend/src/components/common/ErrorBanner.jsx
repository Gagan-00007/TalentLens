import React from 'react';
import { AlertCircle, RefreshCw, ServerOff, HelpCircle, X } from 'lucide-react';

export function ErrorBanner({ error, onRetry, onDismiss }) {
  if (!error) return null;

  const isNetwork = error.status === 0 || error.message?.toLowerCase().includes('cannot connect');
  const is422 = error.status === 422;
  const is502 = error.status === 502;
  const is500 = error.status === 500;

  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50/90 p-5 shadow-sm text-rose-900 transition-all">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-rose-100 rounded-lg text-rose-600 flex-shrink-0 mt-0.5">
          {isNetwork ? <ServerOff className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-rose-950 flex items-center gap-2">
              {isNetwork
                ? 'Backend Connection Failed'
                : is422
                ? 'Invalid Input Data (HTTP 422)'
                : is502
                ? 'AI Engine Parse Failure (HTTP 502)'
                : is500
                ? 'Internal Server Error (HTTP 500)'
                : 'Analysis Request Failed'}
              {error.status ? (
                <span className="px-2 py-0.5 rounded text-xs bg-rose-200/80 font-mono font-semibold">
                  Status: {error.status}
                </span>
              ) : null}
            </h4>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-rose-400 hover:text-rose-600 p-1 rounded-md"
                aria-label="Dismiss error"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <p className="mt-1 text-sm text-rose-800 leading-relaxed font-normal">
            {error.message || 'An unexpected error occurred during candidate analysis.'}
          </p>

          {/* Diagnostic Context & Actionable Tips */}
          <div className="mt-3 p-3 bg-white/70 rounded-lg border border-rose-200 text-xs text-rose-700 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-rose-800">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Troubleshooting Tips:</span>
            </div>
            {isNetwork && (
              <ul className="list-disc list-inside space-y-0.5 pl-1">
                <li>Verify your FastAPI server is running on <code className="font-mono bg-rose-100 px-1 py-0.5 rounded">http://localhost:8000</code>.</li>
                <li>Start it via terminal: <code className="font-mono bg-rose-100 px-1 py-0.5 rounded">uvicorn backend.main:app --reload</code>.</li>
                <li>Check that CORS permits your current port.</li>
              </ul>
            )}
            {is422 && (
              <p>Both Job Description and Candidate Resume must contain non-empty text before submission.</p>
            )}
            {is502 && (
              <p>The AI model returned text that did not conform to the expected JSON schema. Please re-run the analysis.</p>
            )}
            {is500 && (
              <p>Check your backend terminal logs. Ensure your <code className="font-mono bg-rose-100 px-1 py-0.5 rounded">GEMINI_API_KEY</code> environment variable is set.</p>
            )}
          </div>

          {onRetry && (
            <div className="mt-4">
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
