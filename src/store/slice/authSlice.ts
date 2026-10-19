import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, MasterRole } from '@/types';
import { MASTER_ROLES } from '@/common/enums';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  selectedRole: MasterRole;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: true,
  currentUser: {
    id: 'usr_master_01',
    name: 'Dr. Jane Vance',
    email: 'admin@tradeexpert.org',
    role: 'Administrator',
    organization: 'Global Governance Syndicate',
  },
  selectedRole: 'Administrator',
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
      }
    },
    loginSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.selectedRole = action.payload.role;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});

export const { setSelectedRole, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
