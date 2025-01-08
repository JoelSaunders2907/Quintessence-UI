import React from 'react';
import { Check } from 'lucide-react';

interface ProcessSelectorProps {
  processes: string[];
  selectedProcesses: string[];
  onToggle: (process: string) => void;
  isLoading: boolean;
}

export function ProcessSelector({
  processes = [],
  selectedProcesses,
  onToggle,
  isLoading
}: ProcessSelectorProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!processes.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        No processes available
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg divide-y">
      {processes.map(process => (
        <div
          key={process}
          className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
          onClick={() => onToggle(process)}
        >
          <div className={`
            w-5 h-5 rounded border mr-3 flex items-center justify-center
            ${selectedProcesses.includes(process)
              ? 'bg-blue-500 border-blue-500'
              : 'border-gray-300'
            }
          `}>
            {selectedProcesses.includes(process) && (
              <Check className="w-3 h-3 text-white" />
            )}
          </div>
          <span className="text-sm text-gray-700">{process}</span>
        </div>
      ))}
    </div>
  );
}