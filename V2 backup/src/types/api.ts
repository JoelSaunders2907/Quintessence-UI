export interface APIQueryParams {
  date?: string;
}

export interface APIEndpoint {
  path: string;
  queryParams?: APIQueryParams;
}