export type ProcessStatus = 'FAILED' | 'WAITING' | 'IMPORTING' | 'RECONCILING' | 'RUNNING' | 'READY' | 'COMPLETED';

export interface ProcessNode {
  [key: string]: [ProcessStatus, ProcessNode];
}

export interface ProcessItemProps {
  name: string;
  status: ProcessStatus;
  children: ProcessNode;
  level: number;
}

export interface TooltipData {
  [key: string]: {
    [key: string]: string;
  };
}

export interface ProcessTooltip {
  isVisible: boolean;
  content: Record<string, string> | null;
  position: { x: number; y: number } | null;
}

