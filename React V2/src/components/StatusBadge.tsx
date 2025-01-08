import React from 'react';
import { ProcessStatus } from '../types/process';

const statusConfig: Record<ProcessStatus, { color: string; background: string }> = {
  FAILED : { color: 'text-black-700', background: 'bg-black-100' },
  WAITING: { color: 'text-yellow-700', background: 'bg-yellow-100' },
  IMPORTING: { color: 'text-orange-700', background: 'bg-orange-100' },
  RECONCILING: { color: 'text-indigo-700', background: 'bg-indigo-100' },
  RUNNING: { color: 'text-blue-700', background: 'bg-blue-100' },
  READY: { color: 'text-purple-700', background: 'bg-purple-100' },
  COMPLETED: { color: 'text-green-700', background: 'bg-green-100' }
};

interface StatusBadgeProps {
  status: ProcessStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={`
      px-2 py-1 rounded-full text-xs font-medium
      ${config.color} ${config.background}
    `}>
      {status}
    </span>
  );
}

