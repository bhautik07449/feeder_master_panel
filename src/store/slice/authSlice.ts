import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, MasterRole } from '@/types';
import { authStorage } from '@/services/authApi';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  selectedRole: MasterRole;
  loading: boolean;
  error: string | null;
}

const savedUser = typeof window !== 'undefined' ? authStorage.getUser() : null;
const savedToken = typeof window !== 'undefined' ? authStorage.getToken() : null;

const initialState: AuthState = {
  isAuthenticated: !!(savedToken && savedUser),
  currentUser: savedUser,
  selectedRole: (savedUser?.role as MasterRole) || 'Administrator',
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSelectedRole: (state, action: PayloadAction<MasterRole>) => {
      state.selectedRole = action.payload;
      if (state.currentUser) {
        state.currentUser.role = action.payload;
        authStorage.setUser(state.currentUser);
      }
    },
    loginSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.selectedRole = action.payload.role;
      state.error = null;
      authStorage.setUser(action.payload);
      if (!authStorage.getToken()) {
        authStorage.setToken('mock_master_token_' + Date.now());
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      authStorage.clear();
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSelectedRole, loginSuccess, logout, setAuthLoading, setAuthError } = authSlice.actions;
export default authSlice.reducer;
