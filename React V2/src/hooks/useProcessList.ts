import { useState, useEffect } from 'react';
import { fetchPerformanceProcessList } from '../services/api/performanceProcess';

export function useProcessList() {
  const [processList, setProcessList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProcessList() {
      try {
        const data = await fetchPerformanceProcessList();
        setProcessList(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load process list');
      } finally {
        setIsLoading(false);
      }
    }

    loadProcessList();
  }, []);

  return { processList, isLoading, error };
}