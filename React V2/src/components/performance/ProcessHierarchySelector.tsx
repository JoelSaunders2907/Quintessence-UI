import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';
import { ProcessNode, ProcessStatus } from '../../types/process';

interface ProcessHierarchySelectorProps {
  data: ProcessNode;
  selectedProcesses: string[];
  onProcessToggle: (process: string) => void;
}

export function ProcessHierarchySelector({
  data,
  selectedProcesses,
  onProcessToggle
}: ProcessHierarchySelectorProps) {
  return (
    <div className="border border-gray-200 rounded-lg divide-y">
      {Object.entries(data).map(([process, [status, children]]) => (
        <ProcessItem
          key={process}
          name={process}
          children={children}
          isSelected={selectedProcesses.includes(process)}
          onSelect={onProcessToggle}
          selectedProcesses={selectedProcesses}
        />
      ))}
    </div>
  );
}

interface ProcessItemProps {
  name: string;
  children: ProcessNode;
  isSelected: boolean;
  selectedProcesses: string[];
  onSelect: (process: string) => void;
}

function ProcessItem({
  name,
  children,
  isSelected,
  selectedProcesses,
  onSelect
}: ProcessItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = Object.keys(children).length > 0;

  return (
    <div className="w-full">
      <div
        className="flex items-center p-3 hover:bg-gray-50"
      >
        <div className="flex items-center flex-1 gap-2">
          {hasChildren && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
          <div
            className="flex items-center gap-2 flex-1 cursor-pointer"
            onClick={() => onSelect(name)}
          >
            <div className={`
              w-4 h-4 rounded border flex items-center justify-center
              ${isSelected
                ? 'bg-blue-500 border-blue-500'
                : 'border-gray-300'
              }
            `}>
              {isSelected && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm text-gray-700">{name}</span>
          </div>
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className="ml-6 border-l border-gray-200">
          {Object.entries(children).map(([childName, [childStatus, childChildren]]) => (
            <ProcessItem
              key={childName}
              name={childName}
              children={childChildren}
              isSelected={selectedProcesses.includes(childName)}
              selectedProcesses={selectedProcesses}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}