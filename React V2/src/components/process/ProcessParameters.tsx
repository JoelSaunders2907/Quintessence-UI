import React from 'react';

interface ProcessParametersProps {
  parameters: string[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export function ProcessParameters({ parameters, values, onChange }: ProcessParametersProps) {
  return (
    <div className="space-y-3">
      {parameters.map((param) => (
        <div key={param} className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {param}
          </label>
          <input
            type="text"
            value={values[param] || ''}
            onChange={(e) => onChange(param, e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Enter ${param}`}
          />
        </div>
      ))}
    </div>
  );
}