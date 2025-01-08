// Format functions
export function formatDateTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr);
  if (isNaN(date.getTime())) return 'Invalid Date';
  
  return date.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short'
  });
}

// Time calculations
export function generateTimeIntervals(
  startTime: string = '00:00',
  endTime: string = '23:59',
  intervalMinutes: number = 60
): string[] {
  const intervals: string[] = [];
  const start = parseTimeString(startTime);
  const end = parseTimeString(endTime);
  
  let current = start;
  while (current <= end) {
    intervals.push(formatTime(current));
    current += intervalMinutes * 60 * 1000;
  }
  
  return intervals;
}

export function parseTimeString(timeStr: string): number {
  if (!timeStr) return 0;
  const [hours = 0, minutes = 0] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.getTime();
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export function generateDateRange(startDate: string, endDate: string): string[] {
  const dates: string[] = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  
  while (current <= end) {
    dates.push(formatDate(current.toISOString()));
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
}

export function getTimePercentage(time: Date, startTime: string = '00:00', endTime: string = '23:59'): number {
  if (!time || isNaN(time.getTime())) return 0;

  const timeValue = time.getHours() * 60 + time.getMinutes();
  const [startHours = 0, startMinutes = 0] = (startTime || '00:00').split(':').map(Number);
  const [endHours = 23, endMinutes = 59] = (endTime || '23:59').split(':').map(Number);
  
  const startValue = startHours * 60 + startMinutes;
  const endValue = endHours * 60 + endMinutes;
  const totalMinutes = endValue - startValue;
  
  return ((timeValue - startValue) / totalMinutes) * 100;
}