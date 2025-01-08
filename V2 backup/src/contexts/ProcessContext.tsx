import React, { createContext, useContext } from 'react';
import { ProcessNode, TooltipData } from '../types/process';
import { useProcessData } from '../hooks/useProcessData';

interface ProcessContextType {
  processData: ProcessNode;
  tooltipData: TooltipData;
  lastUpdated: Date;
  isLoading: boolean;
  error: string | null;
  fetchData: (type: 'button' | 'page', params?: any) => Promise<void>;
}

const ProcessContext = createContext<ProcessContextType | undefined>(undefined);

export function ProcessProvider({ children }: { children: React.ReactNode }) {
  const processState = useProcessData();
  
  return (
    <ProcessContext.Provider value={processState}>
      {children}
    </ProcessContext.Provider>
  );
}

export function useProcess() {
  const context = useContext(ProcessContext);
  if (context === undefined) {
    throw new Error('useProcess must be used within a ProcessProvider');
  }
  return context;
}