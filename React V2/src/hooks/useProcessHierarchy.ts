import { useState, useEffect } from 'react';
import { ProcessNode } from '../types/process';
import { fetchHierarchyData } from '../services/api/hierarchy';

export function useProcessHierarchy() {
  const [hierarchyData, setHierarchyData] = useState<ProcessNode>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHierarchy() {
      try {
        const data = await fetchHierarchyData();
        setHierarchyData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load process hierarchy');
      } finally {
        setIsLoading(false);
      }
    }

    loadHierarchy();
  }, []);

  return { hierarchyData, isLoading, error };
}