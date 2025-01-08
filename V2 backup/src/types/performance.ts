export interface TimeRange {
  start: string;
  end: string;
  duration: number;
}

export interface ProcessPerformanceData {
  [process: string]: {
    [date: string]: TimeRange;
  };
}

export interface SLATime {
  hour: number;
  minute: number;
  label: string;
}

export const DEFAULT_SLA_TIMES: SLATime[] = [
  { hour: 8, minute: 30, label: 'Morning SLA' },
  { hour: 15, minute: 30, label: 'Afternoon SLA' },
  { hour: 16, minute: 0, label: 'EOD SLA' }
];