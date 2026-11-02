import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/DashboardPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { ResultsPage } from './pages/ResultsPage';
import { AboutPage } from './pages/AboutPage';
import { useBackendHealth } from './hooks/useBackendHealth';

export function App() {
  const health = useBackendHealth(20000);
  const [latestResult, setLatestResult] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout health={health} />}>
          <Route path="/" element={<DashboardPage health={health} />} />
          <Route 
            path="/analyze" 
            element={
              <AnalysisPage 
                health={health} 
                onAnalysisSuccess={(res) => setLatestResult(res)} 
              />
            } 
          />
          <Route 
            path="/results" 
            element={<ResultsPage latestResult={latestResult} />} 
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
