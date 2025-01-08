import React, { useState, useEffect } from 'react';
import { HistoryControls } from '../history/HistoryControls';
import { HistoryList } from '../history/HistoryList';
import { DatePicker } from '../DatePicker';
import { useDate } from '../../contexts/DateContext';
import { fetchHistoryData } from '../../services/api/history';
import { HistoryData } from '../../types/history';

export function HistoryTab() {
  const { selectedDate, setSelectedDate } = useDate();
  const [historyData, setHistoryData] = useState<HistoryData>({});
  const [sortOrder, setSortOrder] = useState<string>('process');
  const [filterText, setFilterText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHistoryData() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchHistoryData({ date: selectedDate });
        setHistoryData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load history data');
      } finally {
        setIsLoading(false);
      }
    }

    loadHistoryData();
  }, [selectedDate]);

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading history data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold text-gray-800">History</h1>
        <DatePicker
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
      </div>
      
      <HistoryControls
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        filterText={filterText}
        onFilterTextChange={setFilterText}
      />
      
      <HistoryList
        data={historyData}
        sortOrder={sortOrder}
        filterText={filterText}
      />
    </div>
  );
}