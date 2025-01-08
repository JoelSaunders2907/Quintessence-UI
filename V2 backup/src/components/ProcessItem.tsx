import React, { useState, useCallback } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ProcessStatus, ProcessNode, ProcessItemProps, ProcessTooltip } from '../types/process';
import { StatusBadge } from './StatusBadge';
import { Tooltip } from './Tooltip';

interface ExtendedProcessItemProps extends ProcessItemProps {
  tooltipData?: Record<string, Record<string, string>>;
}

export function ProcessItem({ name, status, children, level, tooltipData }: ExtendedProcessItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tooltip, setTooltip] = useState<ProcessTooltip>({
    isVisible: false,
    content: null,
    position: null
  });
  
  const hasChildren = Object.keys(children).length > 0;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (tooltipData?.[name]) {
      setTooltip({
        isVisible: true,
        content: tooltipData[name],
        position: {
          x: e.clientX,
          y: e.clientY
        }
      });
    }
  }, [tooltipData, name]);

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => ({ ...prev, isVisible: false }));
  }, []);

  return (
    <div className="w-full">
      <div 
        className={`
          relative flex items-center gap-2 p-2 hover:bg-gray-50
          ${level === 0 ? 'bg-white shadow-sm rounded-lg mb-2' : 'pl-6'}
          ${hasChildren ? 'cursor-pointer' : 'cursor-help'}
        `}
        onClick={hasChildren ? () => setIsExpanded(!isExpanded) : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {hasChildren && (
          <span className="text-gray-500">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
        <span className="flex-1 font-medium">{name}</span>
        <StatusBadge status={status} />
        
        {tooltip.isVisible && tooltip.position && (
          <Tooltip 
            content={tooltip.content}
            position={tooltip.position}
          />
        )}
      </div>
      
      {isExpanded && hasChildren && (
        <div className="ml-4 border-l border-gray-200">
          {Object.entries(children).map(([childName, [childStatus, childChildren]]) => (
            <ProcessItem
              key={childName}
              name={childName}
              status={childStatus}
              children={childChildren}
              level={level + 1}
              tooltipData={tooltipData}
            />
          ))}
        </div>
      )}
    </div>
  );
}