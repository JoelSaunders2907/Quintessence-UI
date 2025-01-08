import React from 'react';
import { SLATime } from '../../../types/performance';
import { getTimePercentage } from '../../../utils/time';

interface SLAMarkersProps {
  slaTimes: SLATime[];
  startTime: string;
  endTime: string;
  orientation?: 'horizontal' | 'vertical';
}

export function SLAMarkers({ 
  slaTimes, 
  startTime, 
  endTime,
  orientation = 'horizontal'
}: SLAMarkersProps) {
  return (
    <>
      {slaTimes.map((sla, index) => {
        const time = new Date();
        time.setHours(sla.hour, sla.minute, 0);
        const position = getTimePercentage(time, startTime, endTime);

        const markerStyle = orientation === 'horizontal' 
          ? { left: `${position}%` }
          : { bottom: `${position}%` };

        const labelStyle = orientation === 'horizontal'
          ? { top: '-24px', left: '50%', transform: 'translateX(-50%)' }
          : { right: '24px', bottom: '50%', transform: 'translateY(50%)' };

        return (
          <div
            key={index}
            className={`absolute border-2 border-red-400 ${
              orientation === 'horizontal' ? 'top-0 bottom-0 border-l-2' : 'left-0 right-0 border-b-2'
            }`}
            style={markerStyle}
          >
            <div 
              className="absolute text-xs text-red-600 whitespace-nowrap"
              style={labelStyle}
            >
              {sla.label}
            </div>
          </div>
        );
      })}
    </>
  );
}