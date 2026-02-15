import { lazy, Suspense, useState } from "react";
import CodeBlock from "../../components/CodeBlock";

// Lazy load a heavy component
const HeavyComponent = lazy(() => import("../../components/HeavyComponent"));

const CodeSplittingDemo = () => {
  const [showHeavy, setShowHeavy] = useState(false);

  const configCode = `// rspack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          priority: 10,
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: 'single',
  },
};`;

  const dynamicImportCode = `// Dynamic import example
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}`;

  return (
    <div className="page">
      <h1>✂️ Code Splitting</h1>
      <p className="page-intro">
        Code splitting allows you to split your code into smaller chunks that
        can be loaded on demand, improving initial load time and overall
        performance.
      </p>

      <section className="demo-section">
        <h2>Dynamic Import Demo</h2>
        <p>Click the button to load a component dynamically:</p>
        <button
          onClick={() => setShowHeavy(!showHeavy)}
          className="demo-button"
        >
          {showHeavy ? "Hide" : "Load"} Heavy Component
        </button>
        {showHeavy && (
          <Suspense
            fallback={<div className="loading">Loading component...</div>}
          >
            <HeavyComponent />
          </Suspense>
        )}
      </section>

      <section className="demo-section">
        <h2>Configuration Example</h2>
        <CodeBlock code={configCode} language="javascript" />
      </section>

      <section className="demo-section">
        <h2>Dynamic Import Code</h2>
        <CodeBlock code={dynamicImportCode} language="javascript" />
      </section>

      <section className="demo-section">
        <h2>Code Splitting Strategies</h2>
        <div className="concepts-grid">
          <div className="concept-card">
            <h3>📦 Entry Points</h3>
            <p>
              Split code by defining multiple entry points in your
              configuration.
            </p>
          </div>
          <div className="concept-card">
            <h3>🔄 Dynamic Imports</h3>
            <p>
              Use import() to load modules on demand, perfect for route-based
              splitting.
            </p>
          </div>
          <div className="concept-card">
            <h3>📚 Vendor Splitting</h3>
            <p>
              Separate third-party libraries into a vendor chunk for better
              caching.
            </p>
          </div>
          <div className="concept-card">
            <h3>⚡ Performance</h3>
            <p>
              Smaller initial bundles mean faster page loads and better user
              experience.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Benefits</h2>
        <ul className="benefits-list">
          <li>✅ Faster initial page load</li>
          <li>✅ Better caching strategy</li>
          <li>✅ Load code only when needed</li>
          <li>✅ Improved performance on slow networks</li>
          <li>✅ Reduced bundle size</li>
        </ul>
      </section>
    </div>
  );
};

export default CodeSplittingDemo;
