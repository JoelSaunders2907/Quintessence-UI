import React from 'react';
import { Clock } from 'lucide-react';

interface LastUpdatedProps {
  timestamp: Date;
}

export function LastUpdated({ timestamp }: LastUpdatedProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="flex items-center gap-2 text-gray-600">
      <Clock className="w-4 h-4" />
      <span>Last updated: {formatDate(timestamp)}</span>
    </div>
  );
}