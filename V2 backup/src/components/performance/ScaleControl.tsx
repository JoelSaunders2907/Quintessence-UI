import React from 'react';

export type ScaleUnit = 'minutes' | 'hours';

interface ScaleControlProps {
  unit: ScaleUnit;
  onUnitChange: (unit: ScaleUnit) => void;
  max: number;
  onMaxChange: (max: number) => void;
}

export function ScaleControl({ unit, onUnitChange, max, onMaxChange }: ScaleControlProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Scale Unit:</label>
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value as ScaleUnit)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Max Value:</label>
        <input
          type="number"
          min="1"
          value={max}
          onChange={(e) => onMaxChange(Number(e.target.value))}
          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}