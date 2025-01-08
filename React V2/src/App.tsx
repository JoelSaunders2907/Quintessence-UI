import React, { useState, useEffect } from 'react';
import { ProcessViewer } from './components/ProcessViewer';
import { DatePicker } from './components/DatePicker';
import { TabNavigation } from './components/TabNavigation';
import { PlaceholderTab } from './components/tabs/PlaceholderTab';
import { HistoryTab } from './components/tabs/HistoryTab';
import { APITab } from './components/tabs/APITab';
import { HolidayNotification } from './components/HolidayNotification';
import { useProcessData } from './hooks/useProcessData';
import { useHolidays } from './hooks/useHolidays';
import { useDate } from './contexts/DateContext';
import { TABS } from './config/tabs';
import { TabId } from './types/tabs';
import { PerformanceTab } from './components/tabs/PerformanceTab';

export function App() {
  const [activeTab, setActiveTab] = useState<TabId>('process-monitor');
  const { selectedDate, setSelectedDate } = useDate();
  
  const { 
    processData, 
    tooltipData,
    lastUpdated, 
    isLoading: isLoadingProcesses, 
    error: processError, 
    fetchData 
  } = useProcessData();

  const {
    holidays,
    isLoading: isLoadingHolidays,
    checkHolidays
  } = useHolidays();

  useEffect(() => {
    if (activeTab === 'process-monitor') {
      console.log('[PAGE LOAD] Initial data fetch...');
      fetchData('page', { date: selectedDate });
    }
  }, [fetchData, selectedDate, activeTab]);

  useEffect(() => {
    checkHolidays({ date: selectedDate });
  }, [checkHolidays, selectedDate]);

  const handleRefresh = () => {
    console.log('[BUTTON CLICK] Manual refresh triggered');
    fetchData('button', { date: selectedDate });
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'process-monitor':
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Process Monitor</h1>
              <div>
                <DatePicker
                  selectedDate={selectedDate}
                  onChange={setSelectedDate}
                />
                <HolidayNotification
                  holidays={holidays}
                  isLoading={isLoadingHolidays}
                />
              </div>
            </div>
            
            {processError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <p className="font-medium">Connection Error</p>
                <p className="text-sm mt-1">{processError}</p>
              </div>
            )}
            
            <ProcessViewer 
              data={processData}
              tooltipData={tooltipData}
              lastUpdated={lastUpdated}
              onRefresh={handleRefresh}
              isLoading={isLoadingProcesses}
            />
          </>
        );
      case 'history':
        return <HistoryTab />;
      case 'performance':
        return <PlaceholderTab title="Performance Monitoring" type="performance" />;
      case 'api':
        return <APITab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 pt-6">
            <TabNavigation
              tabs={TABS}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
          <div className="p-6">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
}