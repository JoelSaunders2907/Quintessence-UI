export interface Tab {
  id: string;
  label: string;
  icon?: React.ComponentType;
}

export type TabId = 'process-monitor' | 'performance' | 'api' | 'history';