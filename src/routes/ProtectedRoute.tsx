import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../shared/contexts';
export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
