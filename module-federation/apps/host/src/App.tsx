// react
import { Suspense, lazy } from 'react';

// third-party
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// feature
import { RequireAuth } from './features/auth/components/RequireAuth';
import { LoginScreen } from './features/auth/screens/LoginScreen';
import { LandingPage } from './pages/LandingPage';
import { ErrorBoundary } from './components/ErrorBoundary';

const AdminShell    = lazy(() => import('admin/AdminShell'));
const InsightsShell = lazy(() => import('insights/InsightsShell'));

function RemoteFallback() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-surface-border border-t-primary" />
    </div>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <LandingPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/*"
          element={
            <RequireAuth>
              <ErrorBoundary>
                <Suspense fallback={<RemoteFallback />}>
                  <AdminShell />
                </Suspense>
              </ErrorBoundary>
            </RequireAuth>
          }
        />
        <Route
          path="/insights/*"
          element={
            <RequireAuth>
              <ErrorBoundary>
                <Suspense fallback={<RemoteFallback />}>
                  <InsightsShell />
                </Suspense>
              </ErrorBoundary>
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
