// react
import type { ReactNode } from 'react';

// routing
import { NavLink, useNavigate } from 'react-router-dom';

// hooks
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from 'host/AuthProvider';

// components / ui
import AppHeader from 'host/AppHeader';
import { NavItem } from '@repo/ui';

interface Props {
  children: ReactNode;
}

export const AppLayout = ({ children }: Props) => {
  const { user, logout } = useAuthStore(
    useShallow((s) => {
      const state = s as { user: { name: string } | null; logout: () => void };
      return {
        user: state.user,
        logout: state.logout,
      };
    })
  );
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-surface-raised">
      <AppHeader
        brand={
          <NavLink to="/" className="hover:opacity-80 transition-opacity">
            Insights
          </NavLink>
        }
        nav={<NavItem to="/insights/products">Product Metrics</NavItem>}
        actions={
          <>
            <span className="text-sm text-muted">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-muted transition-colors hover:text-primary"
            >
              Sign out
            </button>
          </>
        }
      />
      <main className="mx-auto max-w-screen-xl px-6 py-10">{children}</main>
    </div>
  );
};
