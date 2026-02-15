import CodeBlock from "../../components/CodeBlock";

const ModuleFederationDemo = () => {
  const hostConfigCode = `// Host App - rspack.config.js
const rspack = require('@rspack/core');

module.exports = {
  plugins: [
    new rspack.container.ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remote: 'remote@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
      },
    }),
  ],
};`;

  const remoteConfigCode = `// Remote App - rspack.config.js
const rspack = require('@rspack/core');

module.exports = {
  plugins: [
    new rspack.container.ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button',
        './Header': './src/components/Header',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
      },
    }),
  ],
};`;

  const usageCode = `// Using remote component in host app
import { lazy, Suspense } from 'react';

const RemoteButton = lazy(() => import('remote/Button'));

function App() {
  return (
    <Suspense fallback="Loading...">
      <RemoteButton />
    </Suspense>
  );
}`;

  return (
    <div className="page">
      <h1>🔗 Module Federation</h1>
      <p className="page-intro">
        Module Federation allows multiple independent builds to form a single
        application. Perfect for micro-frontends and sharing code between
        applications at runtime.
      </p>

      <section className="demo-section">
        <h2>What is Module Federation?</h2>
        <p>
          Module Federation is a revolutionary feature that enables JavaScript
          applications to dynamically load code from other applications at
          runtime. This allows teams to work independently while sharing
          components and dependencies.
        </p>
      </section>

      <section className="demo-section">
        <h2>Host Application Config</h2>
        <CodeBlock code={hostConfigCode} language="javascript" />
      </section>

      <section className="demo-section">
        <h2>Remote Application Config</h2>
        <CodeBlock code={remoteConfigCode} language="javascript" />
      </section>

      <section className="demo-section">
        <h2>Usage Example</h2>
        <CodeBlock code={usageCode} language="javascript" />
      </section>

      <section className="demo-section">
        <h2>Key Concepts</h2>
        <div className="concepts-grid">
          <div className="concept-card">
            <h3>🏠 Host</h3>
            <p>
              The main application that consumes remote modules from other
              applications.
            </p>
          </div>
          <div className="concept-card">
            <h3>📡 Remote</h3>
            <p>
              An application that exposes modules for other applications to
              consume.
            </p>
          </div>
          <div className="concept-card">
            <h3>🔗 Shared</h3>
            <p>
              Dependencies shared between host and remote to avoid duplication.
            </p>
          </div>
          <div className="concept-card">
            <h3>📦 Exposes</h3>
            <p>Modules that a remote application makes available to others.</p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Architecture Diagram</h2>
        <div className="architecture-diagram">
          <div className="arch-box host-box">
            <h4>Host App</h4>
            <p>Main Application</p>
            <div className="arch-arrow">→</div>
          </div>
          <div className="arch-connections">
            <div className="arch-box remote-box">
              <h4>Remote 1</h4>
              <p>Component Library</p>
            </div>
            <div className="arch-box remote-box">
              <h4>Remote 2</h4>
              <p>Feature Module</p>
            </div>
            <div className="arch-box remote-box">
              <h4>Remote 3</h4>
              <p>Shared Utils</p>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Use Cases</h2>
        <div className="concepts-grid">
          <div className="concept-card">
            <h3>🏢 Micro-Frontends</h3>
            <p>Build large applications as independent, deployable pieces.</p>
          </div>
          <div className="concept-card">
            <h3>🔄 Component Sharing</h3>
            <p>
              Share UI components across multiple applications without
              publishing to npm.
            </p>
          </div>
          <div className="concept-card">
            <h3>🚀 Independent Deployment</h3>
            <p>
              Deploy parts of your application independently without rebuilding
              everything.
            </p>
          </div>
          <div className="concept-card">
            <h3>👥 Team Autonomy</h3>
            <p>
              Different teams can work on separate applications with their own
              release cycles.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Benefits</h2>
        <ul className="benefits-list">
          <li>✅ Runtime code sharing between applications</li>
          <li>✅ Independent deployment of micro-frontends</li>
          <li>✅ Reduced bundle duplication</li>
          <li>✅ Better team scalability</li>
          <li>✅ Faster development cycles</li>
          <li>✅ Technology agnostic (can mix frameworks)</li>
        </ul>
      </section>
    </div>
  );
};

export default ModuleFederationDemo;
