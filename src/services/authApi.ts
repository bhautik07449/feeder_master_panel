import { STORAGE_KEYS } from '@/common/app_constants';
import { MasterRole, UserProfile } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3031/v1';

export interface MasterLoginPayload {
  email: string;
  password: string;
  role?: MasterRole;
  rememberMe?: boolean;
}

export interface MasterRegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: MasterRole;
  phone?: string;
  organization?: string;
  photo?: string;
}

export interface AuthResponse<T = any> {
  success: boolean;
  message: string;
  access_token?: string;
  userType?: string;
  user?: T;
  data?: T;
}

export const authStorage = {
  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },
  setToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },
  getUser: (): UserProfile | null => {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_SESSION);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  setUser: (user: UserProfile): void => {
    localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(user));
  },
  clear: (): void => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
  },
};

export const masterAuthApi = {
  async login(payload: MasterLoginPayload): Promise<AuthResponse> {
    console.log('[Master Auth API] Sending POST /auth/master/login', { email: payload.email, role: payload.role });
    try {
      const res = await fetch(`${API_BASE_URL}/auth/master/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('[Master Auth API] Login response status:', res.status, data);

      if (!res.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      if (data.access_token) {
        authStorage.setToken(data.access_token);
      }
      const user = data.user || data.data;
      if (user) {
        authStorage.setUser(user);
      }

      return data;
    } catch (err: any) {
      console.warn('[Master Auth API] Login request error:', err.message);
      // Fallback for offline/demo mode when backend is not running
      if (err.message?.includes('Failed to fetch') || err.name === 'TypeError') {
        const mockToken = 'mock_master_token_' + Date.now();
        const mockUser: UserProfile = {
          id: 'usr_master_01',
          name: payload.email.split('@')[0],
          email: payload.email,
          role: payload.role || 'Administrator',
          organization: 'Global Governance Syndicate',
        };
        authStorage.setToken(mockToken);
        authStorage.setUser(mockUser);
        return {
          success: true,
          message: 'Authenticated in offline demo mode',
          access_token: mockToken,
          user: mockUser,
        };
      }
      throw err;
    }
  },

  async register(payload: MasterRegisterPayload): Promise<AuthResponse> {
    console.log('[Master Auth API] Sending POST /auth/master/register', { name: payload.name, email: payload.email, role: payload.role });
    try {
      const res = await fetch(`${API_BASE_URL}/auth/master/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('[Master Auth API] Register response status:', res.status, data);

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed. Please review your details.');
      }

      if (data.access_token) {
        authStorage.setToken(data.access_token);
      }
      const user = data.user || data.data;
      if (user) {
        authStorage.setUser(user);
      }

      return data;
    } catch (err: any) {
      console.warn('[Master Auth API] Register request error:', err.message);
      // Fallback for offline/demo mode when backend is not running
      if (err.message?.includes('Failed to fetch') || err.name === 'TypeError') {
        const mockToken = 'mock_master_token_' + Date.now();
        const mockUser: UserProfile = {
          id: 'usr_master_01',
          name: payload.name,
          email: payload.email,
          role: payload.role || 'Administrator',
          phone: payload.phone,
          organization: payload.organization || 'Global Governance Syndicate',
        };
        authStorage.setToken(mockToken);
        authStorage.setUser(mockUser);
        return {
          success: true,
          message: 'Registered in offline demo mode',
          access_token: mockToken,
          user: mockUser,
        };
      }
      throw err;
    }
  },

  async getProfile(): Promise<UserProfile> {
    const token = authStorage.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch user profile');
    }

    return data;
  },

  async logout(): Promise<void> {
    const token = authStorage.getToken();
    try {
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch {
      // Ignore network errors on logout
    } finally {
      authStorage.clear();
    }
  },
};
