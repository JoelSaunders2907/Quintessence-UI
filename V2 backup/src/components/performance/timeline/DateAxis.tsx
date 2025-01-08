import React, { useEffect } from 'react';
import { generateDateRange } from '../../../utils/time';

interface DateAxisProps {
  startDate: string;
  endDate: string;
}

export function DateAxis({ startDate, endDate }: DateAxisProps) {
  const dates = generateDateRange(startDate, endDate);

  useEffect(() => {
    console.group('Date Axis Coordinates');
    dates.forEach((date, index) => {
      const segmentWidth = 100 / dates.length;
      const startPoint = index * segmentWidth;
      const endPoint = startPoint + segmentWidth;
      console.log(`${date}:`, {
        start: `${startPoint}%`,
        center: `${startPoint + (segmentWidth / 2)}%`,
        end: `${endPoint}%`,
        width: `${segmentWidth}%`
      });
    });
    console.groupEnd();
  }, [dates]);

  return (
    <div className="absolute left-16 right-0 bottom-0 flex">
      {dates.map((date, index) => (
        <div
          key={index}
          className="flex-1 text-center text-sm text-gray-600 border-r border-gray-200 last:border-r-0"
        >
          {date}
        </div>
      ))}
    </div>
  );
}