import { API_CONFIG } from '../../config/api';

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function fetchFromAPI<T>(
  endpoint: string,
  requestId: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_CONFIG.HEADERS.DEFAULT,
        ...options.headers
      },
      credentials: 'omit'
    });

    if (!response.ok) {
      throw new APIError(
        `Server responded with status: ${response.status}`,
        response.status,
        endpoint
      );
    }

    const rawText = await response.text();
    console.log(`[API ${requestId}] Raw response from ${endpoint}:`, rawText);

    try {
      return JSON.parse(rawText);
    } catch (parseError) {
      console.error(`[API ${requestId}] Parse error:`, parseError);
      throw new APIError(`Failed to parse response: ${parseError.message}`);
    }
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new APIError('Unable to connect to the server. Please ensure the API is running');
    }
    throw new APIError(error instanceof Error ? error.message : 'Unknown error occurred');
  }
}