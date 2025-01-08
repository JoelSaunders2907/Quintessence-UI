export interface HistoryEntry {
  state: string;
  timestamp: string;
}

export interface HistoryData {
  [process: string]: HistoryEntry[];
}

export type SortOrder = 'process' | 'timestamp';