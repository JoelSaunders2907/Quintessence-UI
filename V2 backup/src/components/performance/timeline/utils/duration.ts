import { ScaleUnit } from '../../ScaleControl';

export function calculateDuration(start: string, end: string, unit: ScaleUnit): number {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const durationMs = endTime - startTime;
  
  return unit === 'minutes' 
    ? durationMs / (1000 * 60)
    : durationMs / (1000 * 60 * 60);
}