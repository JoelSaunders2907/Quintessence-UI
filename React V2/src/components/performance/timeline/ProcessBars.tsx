import React, { useState, useEffect } from 'react';
import { ProcessPerformanceData, TimeRange } from '../../../types/performance';
import { ProcessTooltip } from './ProcessTooltip';
import { getTimePercentage } from '../../../utils/time';
import { getUniqueDates } from '../../../utils/performanceData';

export const PROCESS_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
  'bg-red-500'
] as const;

interface ProcessBarsProps {
  data: ProcessPerformanceData;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  mode: 'single' | 'multi';
}

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function ProcessBars({
  data,
  startDate,
  endDate,
  startTime,
  endTime,
  mode
}: ProcessBarsProps) {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    process: string;
    timeRange: TimeRange;
    position: { x: number; y: number };
  } | null>(null);

  // Convert time range to minutes for scaling calculations
  const startMinutes = parseTimeToMinutes(startTime);
  const endMinutes = parseTimeToMinutes(endTime);
  const totalMinutes = endMinutes - startMinutes;

  // Sort processes by start time
  const sortedProcesses = Object.entries(data).sort((a, b) => {
    const aStart = new Date(Object.values(a[1])[0]?.start || 0).getTime();
    const bStart = new Date(Object.values(b[1])[0]?.start || 0).getTime();
    return aStart - bStart;
  });

  // Calculate vertical spacing for single mode
  const totalProcesses = sortedProcesses.length;
  const verticalSpacing = totalProcesses > 0 ? 100 / totalProcesses : 0;

  if (mode === 'single') {
    return (
      <div className="absolute inset-0 left-16">
        {sortedProcesses.map(([process, dateData], processIndex) => {
          const color = PROCESS_COLORS[processIndex % PROCESS_COLORS.length];
          
          return Object.entries(dateData).map(([date, timeRange]) => {
            const startTimePercent = getTimePercentage(new Date(timeRange.start), startTime, endTime);
            const endTimePercent = getTimePercentage(new Date(timeRange.end), startTime, endTime);
            const width = endTimePercent - startTimePercent;
            const verticalPosition = processIndex * verticalSpacing;

            return (
              <div
                key={`${process}-${date}`}
                className={`absolute ${color} rounded-sm transition-all duration-200`}
                style={{
                  left: `${startTimePercent}%`,
                  top: `${verticalPosition}%`,
                  width: `${width}%`,
                  height: `${verticalSpacing * 0.8}%`,
                }}
                onMouseEnter={(e) => setTooltip({
                  visible: true,
                  process,
                  timeRange,
                  position: { x: e.clientX, y: e.clientY }
                })}
                onMouseLeave={() => setTooltip(null)}
              />
            );
          });
        })}
      </div>
    );
  }

  // Multi-day mode with stacked vertical bars
  const dates = getUniqueDates(data);
  const dateWidth = 100 / dates.length;

  return (
    <div className="absolute inset-0 left-16 flex">
      {dates.map((date, dateIndex) => (
        <div
          key={date}
          className="relative h-full"
          style={{ width: `${dateWidth}%` }}
        >
          {sortedProcesses.map(([process, dateData], processIndex) => {
            const timeRange = dateData[date];
            if (!timeRange) return null;

            const color = PROCESS_COLORS[processIndex % PROCESS_COLORS.length];
            const startTime = new Date(timeRange.start);
            const endTime = new Date(timeRange.end);
            
            // Calculate position and height based on the selected time range
            const processStartMinutes = startTime.getHours() * 60 + startTime.getMinutes();
            const processEndMinutes = endTime.getHours() * 60 + endTime.getMinutes();
            
            // Calculate percentages relative to the selected time range
            const startPercent = ((processStartMinutes - startMinutes) / totalMinutes) * 100;
            const endPercent = ((processEndMinutes - startMinutes) / totalMinutes) * 100;
            const height = endPercent - startPercent;

            // Only render if the process falls within the selected time range
            if (processStartMinutes < startMinutes || processEndMinutes > endMinutes) {
              return null;
            }

            return (
              <div
                key={`${process}-${date}`}
                className={`absolute ${color} rounded-sm transition-all duration-200`}
                style={{
                  left: '10%',
                  bottom: `${startPercent}%`,
                  width: '80%',
                  height: `${height}%`,
                }}
                onMouseEnter={(e) => setTooltip({
                  visible: true,
                  process,
                  timeRange,
                  position: { x: e.clientX, y: e.clientY }
                })}
                onMouseLeave={() => setTooltip(null)}
              />
            );
          })}
        </div>
      ))}

      {tooltip && tooltip.visible && (
        <ProcessTooltip
          process={tooltip.process}
          timeRange={tooltip.timeRange}
          position={tooltip.position}
        />
      )}
    </div>
  );
}