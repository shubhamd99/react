import { Suspense } from 'react';
import { ClientCounter } from './components/ClientCounter';
import { ClientSearch } from './components/ClientSearch';
import { SlowServerPanel } from './components/SlowServerPanel';

export default function Home() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Next.js App Router</p>
        <h1>Server rendering, streaming, and client hydration</h1>
        <p>
          Next renders server components to HTML, streams Suspense boundaries,
          and hydrates only client components marked with `use client`.
        </p>
      </header>

      <section className="demo-grid">
        <article className="demo-card">
          <p className="eyebrow">Server component</p>
          <h2>No client JavaScript needed</h2>
          <p>
            This card is rendered on the server. It is visible as HTML, but it
            does not need hydration because it has no browser event handlers.
          </p>
        </article>

        <article className="demo-card">
          <p className="eyebrow">Client island</p>
          <h2>Hydrated only where needed</h2>
          <ClientCounter />
        </article>

        <article className="demo-card">
          <p className="eyebrow">Progressive hydration</p>
          <h2>More client UI can hydrate separately</h2>
          <ClientSearch />
        </article>

        <Suspense
          fallback={
            <article className="demo-card loading-card">
              <p className="eyebrow">Streaming SSR</p>
              <h2>Streaming fallback...</h2>
              <p>The page shell can arrive before this slow data finishes.</p>
            </article>
          }
        >
          <SlowServerPanel />
        </Suspense>
      </section>
    </main>
  );
}
