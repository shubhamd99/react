import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <h1 className="hero-title">
          <span className="gradient-text">Rspack</span> Learning Journey
        </h1>
        <p className="hero-subtitle">
          A comprehensive guide to mastering Rspack from basic to advanced
          concepts
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Lightning Fast</h3>
          <p>
            Built with Rust for blazing fast build times - up to 10x faster than
            Webpack
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3>Webpack Compatible</h3>
          <p>
            Drop-in replacement for Webpack with support for most loaders and
            plugins
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Production Ready</h3>
          <p>
            Optimized builds with tree-shaking, minification, and code splitting
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔥</div>
          <h3>Hot Module Replacement</h3>
          <p>Fast refresh for instant feedback during development</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🧩</div>
          <h3>Module Federation</h3>
          <p>
            Build micro-frontends with shared dependencies and runtime
            integration
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📦</div>
          <h3>Rich Ecosystem</h3>
          <p>
            Support for CSS modules, TypeScript, assets, and modern JavaScript
          </p>
        </div>
      </div>

      <div className="info-section">
        <h2>What You'll Learn</h2>
        <div className="learning-path">
          <div className="path-item">
            <span className="path-number">1</span>
            <div className="path-content">
              <h4>Basic Configuration</h4>
              <p>Loaders, plugins, and asset handling</p>
            </div>
          </div>
          <div className="path-item">
            <span className="path-number">2</span>
            <div className="path-content">
              <h4>Development Workflow</h4>
              <p>HMR, dev server, and debugging</p>
            </div>
          </div>
          <div className="path-item">
            <span className="path-number">3</span>
            <div className="path-content">
              <h4>Code Splitting</h4>
              <p>Dynamic imports and chunk optimization</p>
            </div>
          </div>
          <div className="path-item">
            <span className="path-number">4</span>
            <div className="path-content">
              <h4>Production Optimization</h4>
              <p>Tree-shaking, minification, and caching</p>
            </div>
          </div>
          <div className="path-item">
            <span className="path-number">5</span>
            <div className="path-content">
              <h4>Module Federation</h4>
              <p>Micro-frontends and runtime sharing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>
          Navigate through the menu to explore each feature with interactive
          demos
        </p>
        <div className="cta-buttons">
          <a href="/loaders" className="cta-button primary">
            Start Learning
          </a>
          <a
            href="https://rspack.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button secondary"
          >
            Official Docs
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
