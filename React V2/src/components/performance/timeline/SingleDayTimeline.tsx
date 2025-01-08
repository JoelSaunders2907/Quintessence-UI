import React from 'react';
import { TimeAxis } from './TimeAxis';
import { SLAMarkers } from './SLAMarkers';
import { ProcessBars } from './ProcessBars';
import { Legend } from './Legend';
import { ProcessPerformanceData } from '../../../types/performance';
import { DEFAULT_SLA_TIMES } from '../../../types/performance';
import { PROCESS_COLORS } from './ProcessBars';

interface SingleDayTimelineProps {
  data: ProcessPerformanceData;
  startTime: string;
  endTime: string;
  interval: number;
}

export function SingleDayTimeline({ 
  data, 
  startTime,
  endTime,
  interval 
}: SingleDayTimelineProps) {
  const processes = Object.keys(data);
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="relative h-64">
        <TimeAxis 
          startTime={startTime} 
          endTime={endTime} 
          interval={interval} 
          orientation="horizontal" 
        />
        <SLAMarkers 
          slaTimes={DEFAULT_SLA_TIMES} 
          startTime={startTime}
          endTime={endTime}
          orientation="horizontal" 
        />
        <ProcessBars 
          data={data} 
          startDate={currentDate}
          endDate={currentDate}
          startTime={startTime}
          endTime={endTime}
          mode="single" 
        />
      </div>
      <Legend processes={processes} colors={PROCESS_COLORS} />
    </div>
  );
}