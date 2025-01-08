import { API_CONFIG } from '../../config/api';
import { fetchFromAPI } from './base';
import { generateRequestId } from '../../utils/request';
import { transformPerformanceData } from '../../utils/performanceData';
import { PerformanceData } from '../../types/performance';

export async function fetchPerformanceData(
  processes: string[],
  startDate: string,
  endDate: string
): Promise<PerformanceData> {
  const requestId = generateRequestId();
  
  const queryParams = new URLSearchParams();
  processes.forEach(process => queryParams.append('process', process));
  queryParams.append('startdate', startDate);
  queryParams.append('enddate', endDate);
  
  const rawData = await fetchFromAPI(
    `${API_CONFIG.ENDPOINTS.PROCESS_PERFORMANCE_DATA}?${queryParams.toString()}`,
    requestId
  );
  
  return transformPerformanceData(rawData);
}