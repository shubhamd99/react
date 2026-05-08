import { Suspense, useState } from 'react';

let slowMessage: string | null = null;
let slowPromise: Promise<void> | null = null;

function readSlowMessage() {
  if (slowMessage) {
    return slowMessage;
  }

  slowPromise ??= new Promise<void>((resolve) => {
    setTimeout(() => {
      slowMessage = 'This content streamed after the shell HTML.';
      resolve();
    }, 1400);
  });

  throw slowPromise;
}

function SlowServerSection() {
  const message = readSlowMessage();

  return (
    <article className="demo-card success-card">
      <p className="eyebrow">React streaming</p>
      <h2>Suspense content</h2>
      <p>{message}</p>
    </article>
  );
}

function HydratedCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <span>Hydrated count: {count}</span>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Add
      </button>
    </div>
  );
}

export function App() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Node + React DOM server</p>
        <h1>Manual streaming SSR with hydrateRoot</h1>
        <p>
          The Node server streams HTML with `renderToPipeableStream`. The browser
          then calls `hydrateRoot` so this server HTML becomes interactive.
        </p>
      </header>

      <section className="demo-grid">
        <article className="demo-card">
          <p className="eyebrow">Hydration</p>
          <h2>Existing HTML becomes interactive</h2>
          <HydratedCounter />
        </article>

        <Suspense
          fallback={
            <article className="demo-card loading-card">
              <p className="eyebrow">Streaming fallback</p>
              <h2>Waiting for slow section...</h2>
              <p>The shell is already visible while React waits.</p>
            </article>
          }
        >
          <SlowServerSection />
        </Suspense>
      </section>
    </main>
  );
}
