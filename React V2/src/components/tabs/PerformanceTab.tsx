import React, { useState, useEffect } from 'react';
import { DateRangePicker } from '../performance/DateRangePicker';
import { ProcessHierarchySelector } from '../performance/ProcessHierarchySelector';
import { TimeRangeControls } from '../performance/TimeRangeControls';
import { ViewToggle, ViewMode } from '../performance/ViewToggle';
import { ScaleControl, ScaleUnit } from '../performance/ScaleControl';
import { PerformanceTimeline } from '../performance/timeline/PerformanceTimeline';
import { useProcess } from '../../contexts/ProcessContext';
import { usePerformanceData } from '../../hooks/usePerformanceData';
import { toggleProcessWithChildren } from '../../utils/processHierarchy';
import { useDate } from '../../contexts/DateContext';

export function PerformanceTab() {
  const [startTime, setStartTime] = useState('04:00');
  const [endTime, setEndTime] = useState('20:00');
  const [interval, setInterval] = useState(60);
  const [viewMode, setViewMode] = useState<ViewMode>('sla');
  const [scaleUnit, setScaleUnit] = useState<ScaleUnit>('minutes');
  const [maxScale, setMaxScale] = useState(120);
  
  const { selectedDate } = useDate();
  const [startDate, setStartDate] = useState<string>(selectedDate);
  const [endDate, setEndDate] = useState<string>(startDate);
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  
  const { processData, isLoading: isLoadingProcesses, fetchData } = useProcess();
  const { performanceData, isLoading: isLoadingPerformance } = usePerformanceData(
    selectedProcesses,
    startDate,
    endDate
  );

  useEffect(() => {
    console.log('[PAGE LOAD] Initial data fetch for Performance tab...');
    fetchData('page', { date: selectedDate });
  }, [fetchData, selectedDate]);

  const handleProcessToggle = (process: string) => {
    setSelectedProcesses(prev => 
      toggleProcessWithChildren(process, processData, prev)
    );
  };

  const isMultiDay = startDate !== endDate;

  if (isLoadingProcesses) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading processes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Performance Monitoring</h1>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      <div className="flex justify-between items-center">
        <ViewToggle mode={viewMode} onModeChange={setViewMode} />
        {viewMode === 'performance' && (
          <ScaleControl
            unit={scaleUnit}
            onUnitChange={setScaleUnit}
            max={maxScale}
            onMaxChange={setMaxScale}
          />
        )}
      </div>

      {viewMode === 'sla' && (
        <TimeRangeControls
          startTime={startTime}
          endTime={endTime}
          interval={interval}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
          onIntervalChange={setInterval}
        />
      )}

      <PerformanceTimeline
        data={performanceData}
        startDate={startDate}
        endDate={endDate}
        startTime={startTime}
        endTime={endTime}
        interval={interval}
        viewMode={viewMode}
        scaleUnit={scaleUnit}
        maxScale={maxScale}
        isLoading={isLoadingPerformance}
      />

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Select Processes</h2>
        <ProcessHierarchySelector
          data={processData}
          selectedProcesses={selectedProcesses}
          onProcessToggle={handleProcessToggle}
        />
      </div>
    </div>
  );
}