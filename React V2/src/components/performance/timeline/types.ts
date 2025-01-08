export interface PositionCalculationResult {
  date: string;
  dayOffset: number;
  totalDays: number;
  position: number;
}

export interface TooltipState {
  visible: boolean;
  process: string;
  start: string;
  end: string;
  position: { x: number; y: number };
}