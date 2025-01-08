import { PerformanceData, ProcessPerformanceData } from '../types/performance';

// Transform raw API data into our internal format
export function transformPerformanceData(data: Record<string, Record<string, [string, string]>>): ProcessPerformanceData {
  const result: ProcessPerformanceData = {};
  
  Object.entries(data).forEach(([process, dateData]) => {
    result[process] = {};
    Object.entries(dateData).forEach(([date, [start, end]]) => {
      result[process][date] = {
        start,
        end,
        duration: calculateDuration(start, end)
      };
    });
  });
  
  return result;
}

// Calculate duration between two timestamps in minutes
export function calculateDuration(start: string, end: string): number {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  return (endTime - startTime) / (1000 * 60); // Duration in minutes
}

// Get all unique dates from the performance data, sorted chronologically
export function getUniqueDates(data: ProcessPerformanceData): string[] {
  const dates = new Set<string>();
  Object.values(data).forEach(processData => {
    Object.keys(processData).forEach(date => dates.add(date));
  });
  return Array.from(dates).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
}