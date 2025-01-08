import React from 'react';

export type ViewMode = 'sla' | 'performance';

interface ViewToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export function ViewToggle({ mode, onModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">View Mode:</label>
      <select
        value={mode}
        onChange={(e) => onModeChange(e.target.value as ViewMode)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="sla">SLA View</option>
        <option value="performance">Performance View</option>
      </select>
    </div>
  );
}