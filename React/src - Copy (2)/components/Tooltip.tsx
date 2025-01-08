import React from 'react';

interface TooltipProps {
  content: Record<string, string> | null;
  position: { x: number; y: number };
}

export function Tooltip({ content, position }: TooltipProps) {
  if (!content) return null;
  
  // Calculate position to keep tooltip within viewport
  const tooltipOffset = { x: 10, y: 10 }; // Offset from cursor
  
  return (
    <div 
      className="fixed z-50 bg-white p-3 rounded-lg shadow-lg border border-gray-200"
      style={{
        left: `${position.x + tooltipOffset.x}px`,
        top: `${position.y + tooltipOffset.y}px`,
        maxWidth: '300px',
        transform: 'translate(0, -50%)', // Center vertically relative to cursor
      }}
    >
      {Object.keys(content).length > 0 ? (
        <div className="space-y-2">
          {Object.entries(content).map(([key, value]) => (
            <div key={key} className="grid grid-cols-2 gap-2">
              <span className="text-sm font-medium text-gray-600">{key}:</span>
              <span className="text-sm text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-600 italic">
          No additional data available
        </div>
      )}
    </div>
  );
}