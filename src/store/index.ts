import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import masterReducer from './slice/masterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    master: masterReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
