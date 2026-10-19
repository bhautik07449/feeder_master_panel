export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'master_panel_token',
  USER_SESSION: 'master_panel_session',
} as const;
