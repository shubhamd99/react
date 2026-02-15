import { useState } from "react";
import * as styles from "./LoadersDemo.module.css";
import CodeBlock from "../../components/CodeBlock";
import rspackLogo from "../../assets/rspack-logo.svg";

const LoadersDemo = () => {
  const [showImage, setShowImage] = useState(true);

  const configCode = `// rspack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader'],
        type: 'javascript/auto',
      },
      {
        test: /\\.module\\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
        type: 'javascript/auto',
      },
      {
        test: /\\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};`;

  return (
    <div className="page">
      <h1>📦 Loaders Configuration</h1>
      <p className="page-intro">
        Loaders transform files into modules that can be included in your
        bundle. Rspack supports various loaders for CSS, assets, TypeScript, and
        more.
      </p>

      <section className="demo-section">
        <h2>CSS Modules Demo</h2>
        <p>This component uses CSS Modules for scoped styling:</p>
        <div className={styles.cssModuleDemo}>
          <div className={styles.box}>Box with CSS Module</div>
          <div className={styles.gradientBox}>Gradient Box</div>
          <div className={styles.animatedBox}>Animated Box</div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Asset Loading Demo</h2>
        <p>Images and other assets are handled by Rspack's asset modules:</p>
        <div className="asset-demo">
          <button
            onClick={() => setShowImage(!showImage)}
            className="demo-button"
          >
            {showImage ? "Hide" : "Show"} Image
          </button>
          {showImage && (
            <div className="image-container">
              <img src={rspackLogo} alt="Rspack Logo" className="demo-image" />
              <p className="image-caption">Loaded via import statement</p>
            </div>
          )}
        </div>
      </section>

      <section className="demo-section">
        <h2>Configuration Example</h2>
        <CodeBlock code={configCode} language="javascript" />
      </section>

      <section className="demo-section">
        <h2>Key Concepts</h2>
        <div className="concepts-grid">
          <div className="concept-card">
            <h3>🎨 CSS Loaders</h3>
            <p>
              Process CSS files and inject them into the DOM. Supports CSS
              Modules for scoped styles.
            </p>
          </div>
          <div className="concept-card">
            <h3>🖼️ Asset Modules</h3>
            <p>
              Handle images, fonts, and other static files. Can inline small
              files or emit them as separate files.
            </p>
          </div>
          <div className="concept-card">
            <h3>📝 TypeScript</h3>
            <p>
              Built-in TypeScript support via SWC loader for fast compilation.
            </p>
          </div>
          <div className="concept-card">
            <h3>⚡ Performance</h3>
            <p>
              Rspack's Rust-based loaders are significantly faster than
              JavaScript alternatives.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoadersDemo;
