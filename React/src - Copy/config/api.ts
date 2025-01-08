// API configuration
export const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:5000',
  ENDPOINTS: {
    HIERARCHY: '/hierarchy',
    TOOLTIPS: '/tooltips'
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