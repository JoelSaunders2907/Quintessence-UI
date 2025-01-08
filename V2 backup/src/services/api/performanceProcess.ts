import { API_CONFIG } from '../../config/api';
import { fetchFromAPI } from './base';
import { generateRequestId } from '../../utils/request';

export async function fetchPerformanceProcessList(): Promise<string[]> {
  const requestId = generateRequestId();
  return fetchFromAPI<string[]>(
    API_CONFIG.ENDPOINTS.PROCESS_LIST,
    requestId
  );
}