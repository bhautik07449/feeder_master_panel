import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/common/app_constants';
import MasterLoginPage from '@/pages/MasterLoginPage';
import MasterRegisterPage from '@/pages/MasterRegisterPage';
import MasterDashboardPage from '@/pages/MasterDashboardPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Screen 1: Master Panel Login Screen */}
      <Route path={ROUTES.LOGIN} element={<MasterLoginPage />} />

      {/* Screen 1 (Variant): Master Panel Registration Screen */}
      <Route path={ROUTES.REGISTER} element={<MasterRegisterPage />} />

      {/* Screen 2: Master Panel Post-Login Dashboard Screen */}
      <Route path={ROUTES.DASHBOARD} element={<MasterDashboardPage />} />

      {/* Default route */}
      <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
};

export default AppRouter;
