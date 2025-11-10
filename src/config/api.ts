import { API_CONFIG } from './constants';

/**
 * Endpoints de API centralizados
 * Evita duplicación de URLs en múltiples hooks
 */
export const API_ENDPOINTS = {
  // Dashboard
  METRICS: `${API_CONFIG.BASE_URL}/metrics`,
  KPIS: `${API_CONFIG.BASE_URL}/metrics`,

  // Events
  EVENTS: `${API_CONFIG.BASE_URL}/events`,

  // Auth
  USERS: `${API_CONFIG.BASE_URL}/users`,
} as const;

/**
 * Construye parámetros de query para filtros
 */
export const buildQueryParams = (filters: Record<string, any>): string => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
};
