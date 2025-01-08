import { useState, useEffect } from 'react';
import { fetchPerformanceData } from '../services/api/performance';
import { PerformanceData } from '../types/performance';

export function usePerformanceData(
  processes: string[],
  startDate: string,
  endDate: string
) {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPerformanceData() {
      if (processes.length === 0) {
        setPerformanceData({});
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchPerformanceData(processes, startDate, endDate);
        setPerformanceData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load performance data');
      } finally {
        setIsLoading(false);
      }
    }

    loadPerformanceData();
  }, [processes, startDate, endDate]);

  return { performanceData, isLoading, error };
}