// API configuration
export const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:5000',
  ENDPOINTS: {
    HIERARCHY: '/hierarchy',
    TOOLTIPS: '/tooltips',
    HOLIDAYS: '/holiday',
    HISTORY: '/history',
    PROCESS_LIST: '/process_list',
    API_PROCESS_LIST: '/api_process_list',
    EXECUTE_PROCESS: '/execute_process_via_api',
    PROCESS_PERFORMANCE_DATA: '/process_performance_data'
  },
  HEADERS: {
    DEFAULT: {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  }
} as const;