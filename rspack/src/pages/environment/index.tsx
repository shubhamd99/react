import CodeBlock from "../../components/CodeBlock";

const EnvironmentDemo = () => {
  const env = {
    mode: process.env.NODE_ENV || "development",
    dev: process.env.NODE_ENV === "development",
    prod: process.env.NODE_ENV === "production",
  };

  const configCode = `// rspack.config.js
const rspack = require('@rspack/core');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  
  return {
    mode: argv.mode,
    plugins: [
      new rspack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode),
        'process.env.API_URL': JSON.stringify(
          isDevelopment 
            ? 'http://localhost:3000/api' 
            : 'https://api.production.com'
        ),
      }),
    ],
  };
};`;

  const envFileCode = `# .env.development
VITE_API_URL=http://localhost:3000/api
VITE_FEATURE_FLAG=true
VITE_DEBUG=true

# .env.production
VITE_API_URL=https://api.production.com
VITE_FEATURE_FLAG=false
VITE_DEBUG=false`;

  return (
    <div className="page">
      <h1>🌍 Environment Variables</h1>
      <p className="page-intro">
        Environment variables allow you to configure your application
        differently for development, staging, and production environments.
      </p>

      <section className="demo-section">
        <h2>Current Environment</h2>
        <div className="env-display">
          <div className="env-card">
            <h3>Mode</h3>
            <p className="env-value">{env.mode}</p>
          </div>
          <div className="env-card">
            <h3>Development</h3>
            <p className="env-value">{env.dev ? "✅ Yes" : "❌ No"}</p>
          </div>
          <div className="env-card">
            <h3>Production</h3>
            <p className="env-value">{env.prod ? "✅ Yes" : "❌ No"}</p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Rspack Configuration</h2>
        <CodeBlock code={configCode} language="javascript" />
      </section>

      <section className="demo-section">
        <h2>Environment Files</h2>
        <CodeBlock code={envFileCode} language="bash" />
      </section>

      <section className="demo-section">
        <h2>Use Cases</h2>
        <div className="concepts-grid">
          <div className="concept-card">
            <h3>🔌 API Endpoints</h3>
            <p>
              Use different API URLs for development and production
              environments.
            </p>
          </div>
          <div className="concept-card">
            <h3>🎛️ Feature Flags</h3>
            <p>Enable or disable features based on the environment.</p>
          </div>
          <div className="concept-card">
            <h3>🔐 API Keys</h3>
            <p>
              Store sensitive keys securely without committing them to version
              control.
            </p>
          </div>
          <div className="concept-card">
            <h3>🐛 Debug Mode</h3>
            <p>
              Enable verbose logging and debugging tools only in development.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Best Practices</h2>
        <ul className="benefits-list">
          <li>🔒 Never commit .env files with sensitive data</li>
          <li>📝 Provide .env.example as a template</li>
          <li>🏷️ Prefix public variables with VITE_ or REACT_APP_</li>
          <li>✅ Validate required environment variables at build time</li>
          <li>📚 Document all environment variables in README</li>
        </ul>
      </section>
    </div>
  );
};

export default EnvironmentDemo;
