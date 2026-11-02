import { useState, useEffect, useCallback } from 'react';
import { checkBackendHealth } from '../services/api';

/**
 * Custom hook to monitor FastAPI backend connectivity
 */
export function useBackendHealth(pollIntervalMs = 25000) {
  const [health, setHealth] = useState({
    online: false,
    status: 'checking',
    service: null,
    version: null,
    message: null,
  });
  const [loading, setLoading] = useState(true);

  const check = useCallback(async () => {
    try {
      const res = await checkBackendHealth();
      setHealth(res);
    } catch (err) {
      setHealth({
        online: false,
        status: 'offline',
        message: err.message || 'Failed to connect',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    check();
    const interval = setInterval(check, pollIntervalMs);
    return () => clearInterval(interval);
  }, [check, pollIntervalMs]);

  return { ...health, loading, refresh: check };
}
