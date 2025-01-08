import React from 'react';

interface TimeRangeControlsProps {
  startTime: string;
  endTime: string;
  interval: number;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  onIntervalChange: (interval: number) => void;
}

export function TimeRangeControls({
  startTime,
  endTime,
  interval,
  onStartTimeChange,
  onEndTimeChange,
  onIntervalChange
}: TimeRangeControlsProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => onStartTimeChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => onEndTimeChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Interval (minutes):</label>
        <input
          type="number"
          min="1"
          max="60"
          value={interval}
          onChange={(e) => onIntervalChange(parseInt(e.target.value, 10))}
          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}