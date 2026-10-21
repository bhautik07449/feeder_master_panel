import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux-hooks';
import { ROUTES } from '@/common/app_constants';
import { authStorage } from '@/services/authApi';

interface PublicRouteProps {
  children: React.ReactElement;
}

/**
 * PublicRoute prevents authenticated master users from accessing login/register.
 * If already logged in, automatically redirects to the Master Dashboard.
 */
export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const token = typeof window !== 'undefined' ? authStorage.getToken() : null;
  const user = typeof window !== 'undefined' ? authStorage.getUser() : null;

  const isAuth = isAuthenticated || !!(token && user);

  if (isAuth) {
    const from = (location.state as any)?.from?.pathname || ROUTES.DASHBOARD;
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;
