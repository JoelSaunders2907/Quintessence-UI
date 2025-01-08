import React from 'react';
import { HistoryData } from '../../types/history';
import { StatusBadge } from '../StatusBadge';

interface HistoryListProps {
  data: HistoryData;
  sortOrder: string;
  filterText: string;
}

export function HistoryList({ data, sortOrder, filterText }: HistoryListProps) {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const processEntries = Object.entries(data)
    .filter(([process]) => 
      process.toLowerCase().includes(filterText.toLowerCase())
    );

  if (sortOrder === 'timestamp') {
    const allEntries = processEntries.flatMap(([process, entries]) =>
      entries.map(entry => ({
        process,
        ...entry
      }))
    );

    allEntries.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return (
      <div className="space-y-4">
        {allEntries.map((entry, index) => (
          <div
            key={`${entry.process}-${index}`}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-900">{entry.process}</span>
              <StatusBadge status={entry.state as any} />
            </div>
            <span className="text-sm text-gray-600">
              {formatTimestamp(entry.timestamp)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {processEntries.map(([process, entries]) => (
        <div key={process} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">{process}</h3>
          <div className="space-y-3">
            {entries.map((entry, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
              >
                <StatusBadge status={entry.state as any} />
                <span className="text-sm text-gray-600">
                  {formatTimestamp(entry.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}