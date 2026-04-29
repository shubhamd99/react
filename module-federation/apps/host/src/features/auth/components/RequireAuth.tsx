// react
import type { ReactNode } from 'react';

// routing
import { Navigate, useLocation } from 'react-router-dom';

// hooks
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore, type AuthStore } from '../stores/authStore';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStore(
    useShallow((s: AuthStore) => ({
      isAuthenticated: s.isAuthenticated,
      isLoading: s.isLoading,
    }))
  );
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-raised">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-surface-border border-t-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
