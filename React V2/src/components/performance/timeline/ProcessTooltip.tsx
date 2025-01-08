import React from 'react';
import { TimeRange } from '../../../types/performance';
import { formatDateTime } from '../../../utils/time';

interface ProcessTooltipProps {
  process: string;
  timeRange: TimeRange;
  position: { x: number; y: number };
}

export function ProcessTooltip({ process, timeRange, position }: ProcessTooltipProps) {
  const formattedStart = formatDateTime(timeRange.start);
  const formattedEnd = formatDateTime(timeRange.end);
  const duration = Math.round(timeRange.duration);

  return (
    <div
      className="fixed z-50 bg-white p-3 rounded-lg shadow-lg border border-gray-200"
      style={{
        left: `${position.x + 10}px`,
        top: `${position.y + 10}px`,
        transform: 'translate(0, -50%)',
      }}
    >
      <div className="space-y-2">
        <div className="font-medium text-gray-800">{process}</div>
        <div className="text-sm text-gray-600 space-y-1">
          <div>Start: {formattedStart}</div>
          <div>End: {formattedEnd}</div>
          <div>Duration: {duration} minutes</div>
        </div>
      </div>
    </div>
  );
}