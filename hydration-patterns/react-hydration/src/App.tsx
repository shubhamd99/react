import './App.css';
import React from 'react';

const App = () => {
  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">React client app</p>
        <h1>Client-side rendering has no server hydration step</h1>
        <p>
          This Rsbuild app demonstrates the baseline: the browser downloads an
          empty HTML shell, React creates the UI on the client, and event handlers
          are attached immediately during the first render.
        </p>
      </header>

      <section className="demo-grid">
        <article className="demo-card">
          <p className="eyebrow">CSR</p>
          <h2>Client render</h2>
          <p>
            `createRoot` mounts React into `#root`. There is no existing server
            HTML to reuse, so this is rendering, not hydration.
          </p>
        </article>

        <article className="demo-card">
          <p className="eyebrow">Interactive immediately</p>
          <h2>Counter island</h2>
          <ClientCounter />
        </article>

        <article className="demo-card">
          <p className="eyebrow">Trade-off</p>
          <h2>Simple, but less SSR</h2>
          <p>
            CSR is easy to reason about, but users wait for JavaScript before
            meaningful UI appears.
          </p>
        </article>
      </section>
    </main>
  );
};

function ClientCounter() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="counter">
      <span>Clicked {count} times</span>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Add
      </button>
    </div>
  );
}

export default App;
