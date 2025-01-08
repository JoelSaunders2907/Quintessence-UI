import React from 'react';
import { SingleDayTimeline } from './timeline/SingleDayTimeline';
import { MultiDayTimeline } from './timeline/MultiDayTimeline';
import { PerformanceData } from '../../types/performance';

interface PerformanceTimelineProps {
  data: PerformanceData;
  startDate: string;
  endDate: string;
  isLoading: boolean;
}

export function PerformanceTimeline({
  data,
  startDate,
  endDate,
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

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      {isSingleDay ? (
        <SingleDayTimeline data={data} date={startDate} />
      ) : (
        <MultiDayTimeline data={data} startDate={startDate} endDate={endDate} />
      )}
    </div>
  );
}