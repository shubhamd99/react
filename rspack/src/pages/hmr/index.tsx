import { useState, useEffect } from "react";
import CodeBlock from "../../components/CodeBlock";

const HMRDemo = () => {
  const [count, setCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLastUpdate(new Date().toLocaleTimeString());
  }, []);

  const configCode = `// rspack.config.js
const rspack = require('@rspack/core');

module.exports = {
  devServer: {
    hot: true,
    port: 3000,
  },
  plugins: [
    new rspack.HotModuleReplacementPlugin(),
  ],
};`;

  const hmrCode = `// Enable HMR in your code
if (module.hot) {
  module.hot.accept('./App', () => {
    // Handle hot update
    console.log('App updated!');
  });
}`;

  return (
    <div className="page">
      <h1>🔥 Hot Module Replacement (HMR)</h1>
      <p className="page-intro">
        HMR allows modules to be updated at runtime without a full page reload,
        preserving application state and providing instant feedback.
      </p>

      <section className="demo-section">
        <h2>Live Demo</h2>
        <p>
          Try editing this component's code and watch it update without losing
          state!
        </p>
        <div className="hmr-demo-box">
          <div className="counter-display">
            <h3>Counter: {count}</h3>
            <p className="last-update">Last HMR update: {lastUpdate}</p>
          </div>
          <div className="counter-controls">
            <button onClick={() => setCount(count + 1)} className="demo-button">
              Increment
            </button>
            <button onClick={() => setCount(count - 1)} className="demo-button">
              Decrement
            </button>
            <button
              onClick={() => setCount(0)}
              className="demo-button secondary"
            >
              Reset
            </button>
          </div>
          <div className="hmr-info">
            <p>
              💡 <strong>Try this:</strong> Change the text above, save the
              file, and notice the counter value persists!
            </p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Configuration Example</h2>
        <CodeBlock code={configCode} language="javascript" />
      </section>

      <section className="demo-section">
        <h2>HMR API Usage</h2>
        <CodeBlock code={hmrCode} language="javascript" />
      </section>

      <section className="demo-section">
        <h2>How HMR Works</h2>
        <div className="concepts-grid">
          <div className="concept-card">
            <h3>1️⃣ File Change</h3>
            <p>
              Rspack detects when you save a file and determines which modules
              need updating.
            </p>
          </div>
          <div className="concept-card">
            <h3>2️⃣ Update Sent</h3>
            <p>
              The dev server sends the updated module to the browser via
              WebSocket.
            </p>
          </div>
          <div className="concept-card">
            <h3>3️⃣ Module Replace</h3>
            <p>
              The runtime replaces the old module with the new one without full
              reload.
            </p>
          </div>
          <div className="concept-card">
            <h3>4️⃣ State Preserved</h3>
            <p>
              Application state is maintained, providing instant visual
              feedback.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Benefits of HMR</h2>
        <ul className="benefits-list">
          <li>⚡ Instant feedback during development</li>
          <li>💾 Preserves application state</li>
          <li>🎯 Updates only changed modules</li>
          <li>🚀 Faster development workflow</li>
          <li>🔧 Better debugging experience</li>
        </ul>
      </section>
    </div>
  );
};

export default HMRDemo;
