import React, { useEffect, useState } from 'react';
import { ProcessViewer } from './components/ProcessViewer';
import { DatePicker } from './components/DatePicker';
import { useProcessData } from './hooks/useProcessData';

export function App() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  
  const { 
    processData, 
    tooltipData,
    lastUpdated, 
    isLoading, 
    error, 
    fetchData 
  } = useProcessData();

  useEffect(() => {
    console.log('[PAGE LOAD] Initial data fetch...');
    fetchData('page');
  }, [fetchData]);

  const handleRefresh = () => {
    console.log('[BUTTON CLICK] Manual refresh triggered');
    fetchData('button');
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    // TODO: Add API call with date parameter when ready
    console.log('[DATE CHANGE] Selected date:', date);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Process Monitor</h1>
            <DatePicker
              selectedDate={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium">Connection Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}
          
          <ProcessViewer 
            data={processData}
            tooltipData={tooltipData}
            lastUpdated={lastUpdated}
            onRefresh={handleRefresh}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}