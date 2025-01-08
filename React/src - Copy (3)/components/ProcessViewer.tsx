import React from 'react';
import { ProcessNode } from '../types/process';
import { ProcessItem } from './ProcessItem';
import { RefreshButton } from './RefreshButton';
import { LastUpdated } from './LastUpdated';

interface ProcessViewerProps {
  data: ProcessNode;
  tooltipData?: Record<string, Record<string, string>>;
  lastUpdated: Date;
  onRefresh: () => void;
  isLoading: boolean;
}

export function ProcessViewer({ 
  data, 
  tooltipData,
  lastUpdated, 
  onRefresh, 
  isLoading 
}: ProcessViewerProps) {
  const hasData = Object.keys(data).length > 0;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="flex justify-between items-center mb-6">
        <LastUpdated timestamp={lastUpdated} />
        <RefreshButton onClick={onRefresh} isLoading={isLoading} />
      </div>
      
      {isLoading && !hasData ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading process data...</p>
        </div>
      ) : !hasData ? (
        <div className="text-center py-8 text-gray-600">
          No process data available
        </div>
      ) : (
        Object.entries(data).map(([name, [status, children]]) => (
          <ProcessItem
            key={name}
            name={name}
            status={status}
            children={children}
            level={0}
            tooltipData={tooltipData}
          />
        ))
      )}
    </div>
  );
}