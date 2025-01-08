import { ProcessList } from '../../types/process-execution';
import { API_CONFIG } from '../../config/api';
import { fetchFromAPI } from './base';
import { generateRequestId } from '../../utils/request';

export async function fetchProcessList(): Promise<ProcessList> {
  const requestId = generateRequestId();
  return fetchFromAPI<ProcessList>(
    API_CONFIG.ENDPOINTS.API_PROCESS_LIST,
    requestId
  );
}

export async function executeProcess(processName: string, parameters: Record<string, string>): Promise<void> {
  const requestId = generateRequestId();
  const queryParams = new URLSearchParams({ ProcessName: processName });
  
  // Add all parameters to query string
  Object.entries(parameters).forEach(([key, value]) => {
    queryParams.append(key, value);
  });
  
  return fetchFromAPI(
    `${API_CONFIG.ENDPOINTS.EXECUTE_PROCESS}?${queryParams.toString()}`,
    requestId
  );
}