// react
import { useState } from 'react';

// routing
import { useNavigate, useLocation } from 'react-router-dom';

// hooks
import cn from 'classnames';
import { useAuthStore } from '../stores/authStore';

// components / ui
import { Input } from '@repo/ui';

export const LoginScreen = () => {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-raised px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <span className="font-display text-2xl font-bold tracking-tight text-primary">
            ecommerce<span className="text-accent">.</span>
          </span>
          <p className="mt-2 text-sm text-muted">Sign in to your workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-danger">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={cn(
              'mt-2 h-9 w-full rounded-md bg-primary text-sm font-medium text-white transition-opacity hover:opacity-90',
              { 'opacity-40': loading }
            )}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-xs text-muted">
          Demo — <span className="font-mono">admin@example.com / password</span>
        </p>
      </div>
    </div>
  );
};
