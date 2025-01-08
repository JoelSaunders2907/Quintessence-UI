import React from 'react';
import { generateTimeIntervals } from '../../../utils/time';

interface TimeAxisProps {
  startTime: string;
  endTime: string;
  interval: number;
  orientation?: 'horizontal' | 'vertical';
}

export function TimeAxis({ 
  startTime = '00:00', 
  endTime = '23:59', 
  interval = 60,
  orientation = 'horizontal' 
}: TimeAxisProps) {
  if (!startTime || !endTime) {
    console.warn('TimeAxis: Missing required time parameters');
    return null;
  }

  const intervals = generateTimeIntervals(startTime, endTime, interval);

  if (orientation === 'vertical') {
    return (
      <div className="absolute left-0 bottom-8 top-0 w-16">
        <div className="h-full flex flex-col justify-between">
          {intervals.reverse().map((time, index) => (
            <div key={index} className="text-xs text-gray-600">
              {time}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-0 right-0 bottom-0 h-8">
      <div className="w-full flex justify-between">
        {intervals.map((time, index) => (
          <div key={index} className="text-xs text-gray-600">
            {time}
          </div>
        ))}
      </div>
    </div>
  );
}