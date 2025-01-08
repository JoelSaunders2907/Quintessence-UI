import { useState, useCallback } from 'react';
import { ProcessNode, TooltipData } from '../types/process';
import { fetchHierarchyData, fetchTooltipData } from '../services/api';
import { APIQueryParams } from '../types/api';

export function useProcessData() {
  const [processData, setProcessData] = useState<ProcessNode>({});
  const [tooltipData, setTooltipData] = useState<TooltipData>({});
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshType, setRefreshType] = useState<'button' | 'page' | null>(null);

  const fetchData = useCallback(async (type: 'button' | 'page', params?: APIQueryParams) => {
    setIsLoading(true);
    setError(null);
    setRefreshType(type);
    
    console.log(`[${type.toUpperCase()} REFRESH] Starting data fetch...`, params);
    
    try {
      const [processes, tooltips] = await Promise.all([
        fetchHierarchyData(params),
        fetchTooltipData(params)
      ]);
      
      setProcessData(processes);
      setTooltipData(tooltips);
      setLastUpdated(new Date());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error(`[${type.toUpperCase()} REFRESH] Error:`, errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setRefreshType(null);
    }
  }, []);

  return {
    processData,
    tooltipData,
    lastUpdated,
    isLoading,
    error,
    refreshType,
    fetchData
  };
}