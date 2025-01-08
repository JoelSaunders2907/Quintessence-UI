import React, { useState, useEffect } from 'react';
import { ProcessPerformanceData, TimeRange } from '../../../types/performance';
import { ProcessTooltip } from './ProcessTooltip';
import { calculateVerticalPosition, calculateBarWidth, calculateBarPosition } from './utils/calculations';
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

  const dates = getUniqueDates(data);
  const barWidth = calculateBarWidth(startDate, endDate);

  useEffect(() => {
    console.group('SLA View Coordinates');
    console.log('Date Range:', { startDate, endDate });
    console.log('Time Range:', { startTime, endTime });
    console.log('Bar Width:', `${barWidth}%`);
    
    Object.entries(data).forEach(([process, dateData]) => {
      console.group(`Process: ${process}`);
      dates.forEach(date => {
        const timeRange = dateData[date];
        if (timeRange) {
          const position = calculateBarPosition(date, startDate, endDate);
          const startPos = calculateVerticalPosition(
            new Date(timeRange.start),
            startTime,
            endTime
          );
          const endPos = calculateVerticalPosition(
            new Date(timeRange.end),
            startTime,
            endTime
          );
          console.log(`${date}:`, {
            horizontalPosition: `${position}%`,
            verticalStart: `${startPos}%`,
            verticalEnd: `${endPos}%`,
            height: `${Math.abs(endPos - startPos)}%`
          });
        }
      });
      console.groupEnd();
    });
    console.groupEnd();
  }, [data, dates, startDate, endDate, startTime, endTime, barWidth]);

  return (
    <div className="absolute inset-0 left-16">
      {Object.entries(data).map(([process, dateData], processIndex) => {
        const color = PROCESS_COLORS[processIndex % PROCESS_COLORS.length];
        
        return dates.map(date => {
          const timeRange = dateData[date];
          if (!timeRange) return null;

          const startPos = calculateVerticalPosition(
            new Date(timeRange.start),
            startTime,
            endTime
          );
          
          const endPos = calculateVerticalPosition(
            new Date(timeRange.end),
            startTime,
            endTime
          );
          
          const height = Math.max(4, Math.abs(endPos - startPos));
          const position = calculateBarPosition(date, startDate, endDate);

          return (
            <div
              key={`${process}-${date}`}
              className={`absolute ${color} rounded-sm transition-all duration-200`}
              style={{
                left: mode === 'multi' ? `${position}%` : '0',
                right: mode === 'multi' ? undefined : '0',
                width: mode === 'multi' ? `${barWidth}%` : undefined,
                bottom: `${Math.min(startPos, endPos)}%`,
                height: `${height}%`,
                transform: 'translateX(-50%)'
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