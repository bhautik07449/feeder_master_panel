import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/common/app_constants';
import MasterLoginPage from '@/pages/MasterLoginPage';
import MasterRegisterPage from '@/pages/MasterRegisterPage';
import MasterDashboardPage from '@/pages/MasterDashboardPage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PublicRoute from '@/components/auth/PublicRoute';
import { useAppSelector } from '@/hooks/redux-hooks';
import { authStorage } from '@/services/authApi';

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const token = typeof window !== 'undefined' ? authStorage.getToken() : null;
  const user = typeof window !== 'undefined' ? authStorage.getUser() : null;
  const isAuth = isAuthenticated || !!(token && user);

  return (
    <Routes>
      {/* Screen 1: Master Panel Login Screen (Guest Only) */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <MasterLoginPage />
          </PublicRoute>
        }
      />

      {/* Screen 1 (Variant): Master Panel Registration Screen (Guest Only) */}
      <Route
        path={ROUTES.REGISTER}
        element={
          <PublicRoute>
            <MasterRegisterPage />
          </PublicRoute>
        }
      />

      {/* Screen 2: Master Panel Post-Login Dashboard Screen (Protected) */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <MasterDashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Default route */}
      <Route
        path="/"
        element={<Navigate to={isAuth ? ROUTES.DASHBOARD : ROUTES.LOGIN} replace />}
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to={isAuth ? ROUTES.DASHBOARD : ROUTES.LOGIN} replace />}
      />
    </Routes>
  );
};

export default AppRouter;
