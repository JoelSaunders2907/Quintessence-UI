import React from 'react';
import { PerformanceTab } from './PerformanceTab';

interface PlaceholderTabProps {
  title: string;
  type?: 'performance' | 'default';
}

export function PlaceholderTab({ title, type = 'default' }: PlaceholderTabProps) {
  if (type === 'performance') {
    return <PerformanceTab />;
  }

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-gray-600">Functionality coming soon...</p>
    </div>
  );
}