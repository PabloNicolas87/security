/**
 * Global Types
 * Tipos reutilizables en toda la aplicación
 */

// Auth
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Dashboard
export interface KPI {
  events24h: number;
  critical24h: number;
  agentsOnline: number;
  systemHealth: number;
}

export interface SeriesData {
  hour: string;
  events: number;
}

export interface CategoryData {
  category: string;
  count: number;
}

export interface IncidentStatus {
  status: string;
  value: number;
}

export interface KillChain {
  fase: string;
  valor: number;
}

export interface MetricsData {
  kpis: KPI;
  series: SeriesData[];
  topCategories: CategoryData[];
  incidentStatus: IncidentStatus[];
  killChain: KillChain[];
}

// Events
export interface SecurityEvent {
  id: number;
  timestamp: string;
  severity: 'Alta' | 'Média' | 'Baixa';
  source: string;
  description: string;
}

export interface EventsResponse {
  data: SecurityEvent[];
  totalCount: number;
}

// UI Components
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'glass';
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
}

export interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

// KPI Card specific
export type IconType = 'activity' | 'alert' | 'server' | 'heart';
export type ColorType = 'blue' | 'red' | 'green' | 'purple';

export interface KpiCardProps {
  title: string;
  value: number | string;
  unit?: string;
  icon?: IconType;
  color?: ColorType;
}
