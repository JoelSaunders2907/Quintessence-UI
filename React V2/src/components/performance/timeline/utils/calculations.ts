import { PositionCalculationResult } from '../types';

export function calculateVerticalPosition(
  time: Date,
  startTime: string,
  endTime: string
): number {
  const timeValue = time.getHours() * 60 + time.getMinutes();
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  const startValue = startHour * 60 + startMinute;
  const endValue = endHour * 60 + endMinute;
  const totalMinutes = endValue - startValue;
  
  return ((timeValue - startValue) / totalMinutes) * 100;
}

export function calculateBarWidth(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = Math.max(1, (end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  // Calculate width to leave appropriate spacing between bars
  return (70 / totalDays); // Use 70% of space for bars, leaving 30% for spacing
}

export function calculateBarPosition(date: string, startDate: string, endDate: string): number {
  //console.log('FIND ME')
  //console.log(date,startDate,endDate)
  const dateTime = new Date(date).getTime();
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  //const totalDays = Math.max(1, (endTime - startTime) / (24 * 60 * 60 * 1000));
  const totalDays = Math.max(1, (endTime - startTime) / (24 * 60 * 60 * 1000)) + 1;
  
  // Calculate position with equal spacing
  //const dayIndex = (dateTime - startTime) / (24 * 60 * 60 * 1000);
  const dayIndex = Math.round((dateTime - startTime) / (24 * 60 * 60 * 1000));
  const segmentWidth = 100 / totalDays;
  const centerPosition = (dayIndex * segmentWidth) + (segmentWidth / 2);
  
  // Add padding to ensure bars stay within bounds
  return Math.min(Math.max(centerPosition, 5), 95);
}