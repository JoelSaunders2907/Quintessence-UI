import { TooltipData } from '../../types/process';
import { APIQueryParams } from '../../types/api';
import { API_CONFIG } from '../../config/api';
import { fetchFromAPI } from './base';
import { generateRequestId } from '../../utils/request';

export async function fetchTooltipData(params?: APIQueryParams): Promise<TooltipData> {
  const requestId = generateRequestId();
  console.log(`[API ${requestId}] Fetching tooltip data`, params);
  
  return fetchFromAPI<TooltipData>(
    API_CONFIG.ENDPOINTS.TOOLTIPS,
    requestId,
    params
  );
}