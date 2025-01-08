import React from 'react';
import { TimeAxis } from './TimeAxis';
import { DateAxis } from './DateAxis';
import { ProcessBars } from './ProcessBars';
import { Legend } from './Legend';
import { PerformanceView } from './PerformanceView';
import { ViewMode } from '../ViewToggle';
import { ScaleUnit } from '../ScaleControl';
import { ProcessPerformanceData } from '../../../types/performance';
import { PROCESS_COLORS } from './ProcessBars';

interface MultiDayTimelineProps {
  data: ProcessPerformanceData;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  viewMode: ViewMode;
  scaleUnit: ScaleUnit;
  maxScale: number;
}

export function MultiDayTimeline({ 
  data, 
  startDate, 
  endDate,
  startTime,
  endTime,
  viewMode,
  scaleUnit,
  maxScale
}: MultiDayTimelineProps) {
  const processes = Object.keys(data);

  if (viewMode === 'performance') {
    return (
      <PerformanceView
        data={data}
        scaleUnit={scaleUnit}
        maxScale={maxScale}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative h-64">
        <TimeAxis orientation="vertical" startTime={startTime} endTime={endTime} />
        <DateAxis startDate={startDate} endDate={endDate} />
        <ProcessBars 
          data={data} 
          startDate={startDate} 
          endDate={endDate}
          startTime={startTime}
          endTime={endTime}
          mode="multi" 
        />
      </div>
      <Legend processes={processes} colors={PROCESS_COLORS} />
    </div>
  );
}