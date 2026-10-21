import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux-hooks';
import { ROUTES } from '@/common/app_constants';
import { authStorage } from '@/services/authApi';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const token = typeof window !== 'undefined' ? authStorage.getToken() : null;
  const user = typeof window !== 'undefined' ? authStorage.getUser() : null;

  const isAuth = isAuthenticated || !!(token && user);

  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
