import React from 'react';
import { RotateCw } from 'lucide-react';

interface RefreshButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function RefreshButton({ onClick, isLoading }: RefreshButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg
        bg-blue-500 text-white font-medium
        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
      `}
    >
      <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
      {isLoading ? 'Refreshing...' : 'Refresh'}
    </button>
  );
}