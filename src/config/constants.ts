/**
 * Global Constants
 * Configuraciones centralizadas de la aplicación
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  DARK_MODE: "darkMode",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 5,
  MAX_PAGE_SIZE: 100,
} as const;

// UI Constants
export const UI = {
  SIDEBAR_WIDTH_OPEN: "224px", // w-56
  SIDEBAR_WIDTH_CLOSED: "64px", // w-16
  HEADER_HEIGHT: "64px", // h-16
  ANIMATION_DURATION: 300, // ms
} as const;

// Event Severity Levels
export const SEVERITY_LEVELS = {
  ALTA: "Alta",
  MEDIA: "Média",
  BAIXA: "Baixa",
} as const;

// Feature Flags (para futuras funcionalidades)
export const FEATURES = {
  CHAT_ENABLED: false,
  ANALYTICS_ENABLED: false,
  EXPORT_CSV: false,
  EXPORT_PDF: false,
} as const;
