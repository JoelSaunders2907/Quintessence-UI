import { TooltipData } from '../../types/process';
import { API_CONFIG } from '../../config/api';
import { fetchFromAPI } from './base';
import { generateRequestId } from '../../utils/request';

export async function fetchTooltipData(): Promise<TooltipData> {
  const requestId = generateRequestId();
  console.log(`[API ${requestId}] Fetching tooltip data`);
  
  return fetchFromAPI<TooltipData>(
    API_CONFIG.ENDPOINTS.TOOLTIPS,
    requestId
  );
}