import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

interface ProcessComboboxProps {
  processes: string[];
  selectedProcesses: string[];
  onToggle: (process: string) => void;
  isLoading: boolean;
}

export function ProcessCombobox({
  processes = [],
  selectedProcesses,
  onToggle,
  isLoading
}: ProcessComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const filteredProcesses = processes.filter(process =>
    process.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-lg">
        <input
          type="text"
          placeholder="Search processes..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-r-lg"
        >
          <ChevronsUpDown className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredProcesses.map(process => (
            <div
              key={process}
              className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => onToggle(process)}
            >
              <div className={`
                w-4 h-4 rounded border mr-3 flex items-center justify-center
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
      )}
    </div>
  );
}