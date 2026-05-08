import { Suspense, useState } from 'react';

let slowMessage: string | null = null;
let slowPromise: Promise<void> | null = null;

function readSlowMessage() {
  if (slowMessage) {
    return slowMessage;
  }

  slowPromise ??= new Promise<void>((resolve) => {
    setTimeout(() => {
      slowMessage = 'This section streamed after the shell HTML.';
      resolve();
    }, 1400);
  });

  throw slowPromise;
}

function SlowSection() {
  const message = readSlowMessage();

  return (
    <article className="demo-card success-card">
      <p className="eyebrow">Selective hydration boundary</p>
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
        <p className="eyebrow">React + Node streaming SSR</p>
        <h1>React hydration patterns without a framework</h1>
        <p>
          This React tree is rendered by the Node server, streamed as HTML, and
          hydrated in the browser with `hydrateRoot`.
        </p>
      </header>

      <section className="demo-grid">
        <article className="demo-card">
          <p className="eyebrow">Basic hydration</p>
          <h2>Server HTML becomes interactive</h2>
          <p>
            The HTML arrives from Node first. The client bundle then attaches
            events to this counter.
          </p>
          <HydratedCounter />
        </article>

        <Suspense
          fallback={
            <article className="demo-card loading-card">
              <p className="eyebrow">Progressive streaming</p>
              <h2>Waiting for slow section...</h2>
              <p>The shell can be visible while this boundary is loading.</p>
            </article>
          }
        >
          <SlowSection />
        </Suspense>
      </section>
    </main>
  );
}

export default App;
