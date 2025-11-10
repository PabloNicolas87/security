declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  DARK_MODE: "darkMode",
} as const;
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 5,
  MAX_PAGE_SIZE: 100,
} as const;
export const UI = {
  SIDEBAR_WIDTH_OPEN: "224px", 
  SIDEBAR_WIDTH_CLOSED: "64px", 
  HEADER_HEIGHT: "64px", 
  ANIMATION_DURATION: 300, 
} as const;
export const SEVERITY_LEVELS = {
  ALTA: "Alta",
  MEDIA: "Média",
  BAIXA: "Baixa",
} as const;
export const FEATURES = {
  CHAT_ENABLED: false,
  ANALYTICS_ENABLED: false,
  EXPORT_CSV: false,
  EXPORT_PDF: false,
} as const;
