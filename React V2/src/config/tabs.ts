import { Tab } from '../types/tabs';
import { Activity, BarChart2, History, Network } from 'lucide-react';

export const TABS: Tab[] = [
  { id: 'process-monitor', label: 'Process Monitor', icon: Activity },
  { id: 'performance', label: 'Performance Monitoring', icon: BarChart2 },
  { id: 'api', label: 'API', icon: Network },
  { id: 'history', label: 'History', icon: History },
];