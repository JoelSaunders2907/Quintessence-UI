import { HistoryData } from '../../types/history';
import { APIQueryParams } from '../../types/api';
import { API_CONFIG } from '../../config/api';
import { fetchFromAPI } from './base';
import { generateRequestId } from '../../utils/request';

export async function fetchHistoryData(params?: APIQueryParams): Promise<HistoryData> {
  const requestId = generateRequestId();
  console.log(`[API ${requestId}] Fetching history data`, params);
  
  return fetchFromAPI<HistoryData>(
    API_CONFIG.ENDPOINTS.HISTORY,  // Use the endpoint from config
    requestId,
    params
  );
}