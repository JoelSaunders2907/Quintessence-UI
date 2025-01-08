import React from 'react';
import { SingleDayTimeline } from './SingleDayTimeline';
import { MultiDayTimeline } from './MultiDayTimeline';
import { PerformanceData } from '../../../types/performance';
import { ViewMode } from '../ViewToggle';
import { ScaleUnit } from '../ScaleControl';

interface PerformanceTimelineProps {
  data: PerformanceData;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  interval: number;
  viewMode: ViewMode;
  scaleUnit: ScaleUnit;
  maxScale: number;
  isLoading: boolean;
}

export function PerformanceTimeline({
  data,
  startDate,
  endDate,
  startTime,
  endTime,
  interval,
  viewMode,
  scaleUnit,
  maxScale,
  isLoading
}: PerformanceTimelineProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const isSingleDay = startDate === endDate;

  if (isSingleDay) {
    return (
      <SingleDayTimeline 
        data={data} 
        startTime={startTime}
        endTime={endTime}
        interval={interval}
      />
    );
  }

  return (
    <MultiDayTimeline 
      data={data}
      startDate={startDate}
      endDate={endDate}
      startTime={startTime}
      endTime={endTime}
      viewMode={viewMode}
      scaleUnit={scaleUnit}
      maxScale={maxScale}
    />
  );
}