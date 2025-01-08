import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { ProcessCard } from '../process/ProcessCard';
import { fetchProcessList, executeProcess } from '../../services/api/process';
import { ProcessList } from '../../types/process-execution';

export function APITab() {
  const [processList, setProcessList] = useState<ProcessList>({});
  const [selectedProcesses, setSelectedProcesses] = useState<Set<string>>(new Set());
  const [parameterValues, setParameterValues] = useState<Record<string, Record<string, string>>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    async function loadProcessList() {
      try {
        const data = await fetchProcessList();
        setProcessList(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load process list');
      } finally {
        setIsLoading(false);
      }
    }

    loadProcessList();
  }, []);

  const handleProcessSelect = (processName: string, selected: boolean) => {
    const newSelected = new Set(selectedProcesses);
    if (selected) {
      newSelected.add(processName);
    } else {
      newSelected.delete(processName);
    }
    setSelectedProcesses(newSelected);
  };

  const handleParameterChange = (processName: string, paramName: string, value: string) => {
    setParameterValues(prev => ({
      ...prev,
      [processName]: {
        ...prev[processName],
        [paramName]: value
      }
    }));
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setError(null);

    try {
      for (const processName of selectedProcesses) {
        const parameters = parameterValues[processName] || {};
        await executeProcess(processName, parameters);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute processes');
    } finally {
      setIsExecuting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading processes...</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">API Execution</h1>
        <button
          onClick={handleExecute}
          disabled={selectedProcesses.size === 0 || isExecuting}
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-lg
            ${selectedProcesses.size === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'}
            font-medium transition-colors duration-200
          `}
        >
          <Play className="w-4 h-4" />
          {isExecuting ? 'Executing...' : 'Run Process'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {Object.entries(processList).map(([processName, parameters]) => (
          <ProcessCard
            key={processName}
            name={processName}
            parameters={parameters}
            isSelected={selectedProcesses.has(processName)}
            onSelect={(selected) => handleProcessSelect(processName, selected)}
            onParameterChange={(param, value) => 
              handleParameterChange(processName, param, value)
            }
            parameterValues={parameterValues[processName] || {}}
          />
        ))}
      </div>
    </div>
  );
}