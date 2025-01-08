import { useState, useCallback } from 'react';
import { fetchHolidays } from '../services/api/holidays';
import { APIQueryParams } from '../types/api';

export function useHolidays() {
  const [holidays, setHolidays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHolidays = useCallback(async (params?: APIQueryParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchHolidays(params);
      setHolidays(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch holidays';
      setError(message);
      setHolidays([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { holidays, isLoading, error, checkHolidays };
}