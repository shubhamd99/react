import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InfiniteQueryVirtualList } from './examples/InfiniteQueryVirtualList';
import { ReactVirtuosoList } from './examples/ReactVirtuosoList';
import { TanStackTableVirtual } from './examples/TanStackTableVirtual';
import { TanStackVirtualList } from './examples/TanStackVirtualList';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="app-shell">
        <header className="page-header">
          <p className="eyebrow">React virtualization interview examples</p>
          <h1>Four simple ways to render large lists</h1>
          <p>
            Each example keeps the code small and shows the core idea: render only
            the visible UI, fetch data in pages when needed, and keep scrolling
            smooth.
          </p>
          <nav className="quick-links" aria-label="Demo links">
            <a href="#tanstack-virtual">TanStack Virtual</a>
            <a href="#react-virtuoso">React Virtuoso</a>
            <a href="#tanstack-table">Virtual Table</a>
            <a href="#infinite-query">Infinite Query</a>
          </nav>
        </header>

        <div className="demo-grid">
          <TanStackVirtualList />
          <ReactVirtuosoList />
          <TanStackTableVirtual />
          <InfiniteQueryVirtualList />
        </div>
      </main>
    </QueryClientProvider>
  );
};

export default App;
