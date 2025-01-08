import { API_CONFIG } from '../../config/api';
import { fetchFromAPI } from './base';
import { generateRequestId } from '../../utils/request';
import { APIQueryParams } from '../../types/api';

export async function fetchHolidays(params?: APIQueryParams): Promise<string[]> {
  const requestId = generateRequestId();
  console.log(`[API ${requestId}] Fetching holidays`, params);
  
  return fetchFromAPI<string[]>(
    API_CONFIG.ENDPOINTS.HOLIDAYS,
    requestId,
    params
  );
}