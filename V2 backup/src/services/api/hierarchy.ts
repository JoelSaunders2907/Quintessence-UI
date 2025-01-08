import { ProcessNode } from '../../types/process';
import { APIQueryParams } from '../../types/api';
import { API_CONFIG } from '../../config/api';
import { fetchFromAPI, APIError } from './base';
import { generateRequestId } from '../../utils/request';

export async function fetchHierarchyData(params?: APIQueryParams): Promise<ProcessNode> {
  const requestId = generateRequestId();
  console.log(`[API ${requestId}] Fetching hierarchy data`, params);
  
  const data = await fetchFromAPI<ProcessNode>(
    API_CONFIG.ENDPOINTS.HIERARCHY,
    requestId,
    params
  );
  
  // Validate hierarchy data structure
  if (!data || typeof data !== 'object') {
    throw new APIError('Invalid data format: Expected an object');
  }
  
  Object.entries(data).forEach(([key, value]) => {
    if (!Array.isArray(value) || value.length !== 2) {
      throw new APIError(
        `Invalid data structure for key "${key}": Expected [status, children] array`
      );
    }
  });
  
  return data;
}