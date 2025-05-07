import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const currentUserEmail =
    localStorage.getItem('currentUserEmail') || sessionStorage.getItem('currentUserEmail');

  const currentUser = users.find((u: any) => u.email === currentUserEmail);
  const location = useLocation();

  if (!currentUserEmail || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.isAdmin && !location.pathname.startsWith('/admin')) {
    return <Navigate to="/admin" replace />;
  }

  if (!currentUser.isAdmin && location.pathname.startsWith('/admin')) {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
}
