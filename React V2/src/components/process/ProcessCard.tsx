import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ProcessParameters } from './ProcessParameters';

interface ProcessCardProps {
  name: string;
  parameters: string[];
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
  onParameterChange: (name: string, value: string) => void;
  parameterValues: Record<string, string>;
}

export function ProcessCard({
  name,
  parameters,
  isSelected,
  onSelect,
  onParameterChange,
  parameterValues,
}: ProcessCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <h3 className="font-medium text-gray-900">{name}</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
          <ProcessParameters
            parameters={parameters}
            values={parameterValues}
            onChange={onParameterChange}
          />
        </div>
      )}
    </div>
  );
}