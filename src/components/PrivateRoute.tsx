import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

interface PrivateRouteProps {
  checkAuth?: boolean;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  checkAuth = false,
  children,
}) => {
  const { user } = useAuth();
  const location = useLocation();

  if ((checkAuth && user) || (location.pathname === '/' && user)) {
    return <Navigate to="/rooms" state={{ from: location }} replace />;
  }

  if (!checkAuth && !user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <div>{children}</div>;
};

export { PrivateRoute };
