import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute() {
  const location = useLocation();
  const { status, user } = useAuth();

  if (status === 'checking') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F7F5EF]" aria-live="polite">
        <p className="text-sm text-[#657166]">Memeriksa sesi...</p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
