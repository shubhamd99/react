import { Suspense } from 'react';
import { ClientCounter } from './components/ClientCounter';
import { ClientSearch } from './components/ClientSearch';
import { ServerProfile } from './components/ServerProfile';
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
          <p className="eyebrow">React Server Component</p>
          <h2>No client JavaScript needed</h2>
          <p>
            This card is rendered on the server. It is visible as HTML, but it
            does not need hydration because it has no browser event handlers.
          </p>
          <code>{'No "use client" in this file'}</code>
        </article>

        <ServerProfile />

        <article className="demo-card">
          <p className="eyebrow">Client hydration island</p>
          <h2>Hydrated only where needed</h2>
          <p>This component has `use client`, state, and a click handler.</p>
          <code>{'"use client" + useState'}</code>
          <ClientCounter />
        </article>

        <article className="demo-card">
          <p className="eyebrow">Progressive client hydration</p>
          <h2>More client UI can hydrate separately</h2>
          <p>Another independent client island with its own browser state.</p>
          <code>{'<ClientSearch />'}</code>
          <ClientSearch />
        </article>

        <article className="demo-card">
          <p className="eyebrow">Selective hydration</p>
          <h2>React can prioritize interactive boundaries</h2>
          <p>
            These `use client` islands and Suspense boundaries give React
            separate units of hydration work.
          </p>
          <code>{'Suspense + "use client" boundaries'}</code>
        </article>

        <Suspense
          fallback={
            <article className="demo-card loading-card">
              <p className="eyebrow">Progressive streaming SSR + selective boundary</p>
              <h2>Fallback streamed first</h2>
              <p>The page shell can arrive before this slow data finishes.</p>
              <code>{'<Suspense fallback={...}>'}</code>
            </article>
          }
        >
          <SlowServerPanel />
        </Suspense>
      </section>
    </main>
  );
}
