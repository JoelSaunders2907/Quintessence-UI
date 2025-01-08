import React from 'react';

interface LegendProps {
  processes: string[];
  colors: string[];
}

export function Legend({ processes, colors }: LegendProps) {
  return (
    <div className="flex flex-wrap gap-4 mt-4 px-4">
      {processes.map((process, index) => (
        <div key={process} className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded ${colors[index % colors.length]}`} />
          <span className="text-sm text-gray-700">{process}</span>
        </div>
      ))}
    </div>
  );
}