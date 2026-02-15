import CodeBlock from "../../components/CodeBlock";

const OptimizationDemo = () => {
  const configCode = `// rspack.config.prod.js
const rspack = require('@rspack/core');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          priority: 10,
        },
      },
    },
    runtimeChunk: 'single',
    usedExports: true, // Tree shaking
    sideEffects: false,
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
};`;

  const treeShakingCode = `// utils.js - Only used functions will be bundled
export const usedFunction = () => {
  console.log('This will be in the bundle');
};

export const unusedFunction = () => {
  console.log('This will be removed by tree shaking');
};

// app.js
import { usedFunction } from './utils';
usedFunction(); // Only this is imported and bundled`;

  return (
    <div className="page">
      <h1>⚡ Performance Optimization</h1>
      <p className="page-intro">
        Rspack provides powerful optimization features to minimize bundle size,
        improve load times, and enhance overall application performance.
      </p>

      <section className="demo-section">
        <h2>Optimization Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">📦</div>
            <h3>Bundle Size</h3>
            <p className="metric-value">~150 KB</p>
            <p className="metric-label">Gzipped</p>
          </div>
          <div className="metric-card">
            <div className="metric-icon">⚡</div>
            <h3>Build Time</h3>
            <p className="metric-value">~2.5s</p>
            <p className="metric-label">Production</p>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🚀</div>
            <h3>Load Time</h3>
            <p className="metric-value">~800ms</p>
            <p className="metric-label">First Paint</p>
          </div>
          <div className="metric-card">
            <div className="metric-icon">💾</div>
            <h3>Cache Hit</h3>
            <p className="metric-value">~95%</p>
            <p className="metric-label">Rebuild</p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Production Configuration</h2>
        <CodeBlock code={configCode} language="javascript" />
      </section>

      <section className="demo-section">
        <h2>Tree Shaking Example</h2>
        <CodeBlock code={treeShakingCode} language="javascript" />
      </section>

      <section className="demo-section">
        <h2>Optimization Techniques</h2>
        <div className="concepts-grid">
          <div className="concept-card">
            <h3>🌳 Tree Shaking</h3>
            <p>
              Removes unused code from the final bundle, reducing size
              significantly.
            </p>
          </div>
          <div className="concept-card">
            <h3>📦 Minification</h3>
            <p>
              Compresses JavaScript and CSS using SWC and Lightning CSS for
              smaller files.
            </p>
          </div>
          <div className="concept-card">
            <h3>💾 Persistent Caching</h3>
            <p>
              Filesystem caching speeds up rebuilds by reusing previous
              compilation results.
            </p>
          </div>
          <div className="concept-card">
            <h3>✂️ Code Splitting</h3>
            <p>
              Splits code into smaller chunks for better caching and parallel
              loading.
            </p>
          </div>
          <div className="concept-card">
            <h3>🗜️ Compression</h3>
            <p>
              Gzip and Brotli compression reduce transfer size over the network.
            </p>
          </div>
          <div className="concept-card">
            <h3>📊 Bundle Analysis</h3>
            <p>
              Visualize bundle composition to identify optimization
              opportunities.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Performance Comparison</h2>
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Webpack</th>
                <th>Rspack</th>
                <th>Improvement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cold Build</td>
                <td>25s</td>
                <td>2.5s</td>
                <td className="improvement">10x faster</td>
              </tr>
              <tr>
                <td>Hot Rebuild</td>
                <td>3s</td>
                <td>0.3s</td>
                <td className="improvement">10x faster</td>
              </tr>
              <tr>
                <td>Bundle Size</td>
                <td>155 KB</td>
                <td>150 KB</td>
                <td className="improvement">3% smaller</td>
              </tr>
              <tr>
                <td>Memory Usage</td>
                <td>450 MB</td>
                <td>280 MB</td>
                <td className="improvement">38% less</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="demo-section">
        <h2>Best Practices</h2>
        <ul className="benefits-list">
          <li>✅ Enable tree shaking with usedExports and sideEffects</li>
          <li>✅ Use persistent caching for faster rebuilds</li>
          <li>✅ Split vendor code into separate chunks</li>
          <li>✅ Minify JavaScript with SWC (faster than Terser)</li>
          <li>✅ Analyze bundles regularly to identify bloat</li>
          <li>✅ Use dynamic imports for route-based code splitting</li>
        </ul>
      </section>
    </div>
  );
};

export default OptimizationDemo;
