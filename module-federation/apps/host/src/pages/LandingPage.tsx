// hooks
import { useShallow } from 'zustand/react/shallow';
import {
  useAuthStore,
  type AuthStore,
} from '../features/auth/stores/authStore';

// components
import { NavCard } from '../components/NavCard';
import AppHeader from '../components/AppHeader';

export const LandingPage = () => {
  const { user, logout } = useAuthStore(
    useShallow((s: AuthStore) => ({ user: s.user, logout: s.logout }))
  );

  return (
    <div className="min-h-screen bg-surface-raised">
      <AppHeader
        brand={
          <>
            ecommerce<span className="text-accent">.</span>
          </>
        }
        actions={
          <>
            <span className="text-sm text-muted">{user?.name}</span>
            <button
              onClick={logout}
              className="text-sm text-muted transition-colors hover:text-primary"
            >
              Sign out
            </button>
          </>
        }
      />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Platform
          </p>
          <h1 className="text-4xl font-bold leading-tight text-primary">
            Welcome back,
            <br />
            {user?.name?.split(' ')[0]}.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Your ecommerce workspace. Manage content, track performance, and
            keep things running.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <NavCard
            title="Admin"
            description="Manage your product catalogue. Create, edit, and publish with full control."
            href="/admin"
            label="Products →"
          />
          <NavCard
            title="Insights"
            description="Track product views, cart activity, and engagement across all your content."
            href="/insights"
            label="Analytics →"
          />
        </div>

        <p className="mt-16 text-xs text-muted">v{__APP_VERSION__}</p>
      </main>
    </div>
  );
};
