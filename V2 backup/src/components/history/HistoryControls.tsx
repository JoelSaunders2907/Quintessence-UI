import React from 'react';
import { Search } from 'lucide-react';

interface HistoryControlsProps {
  sortOrder: string;
  onSortOrderChange: (order: string) => void;
  filterText: string;
  onFilterTextChange: (text: string) => void;
}

export function HistoryControls({
  sortOrder,
  onSortOrderChange,
  filterText,
  onFilterTextChange,
}: HistoryControlsProps) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Filter processes..."
          value={filterText}
          onChange={(e) => onFilterTextChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="process">Sort by Process</option>
        <option value="timestamp">Sort by Timestamp</option>
      </select>
    </div>
  );
}