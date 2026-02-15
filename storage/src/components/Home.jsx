import "./Demo.css";

const Home = () => {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h2>🌐 Welcome to Web Storage Examples</h2>
        <p>Comprehensive guide to all web storage options</p>
      </div>

      <div className="info-card">
        <h3>📚 What You'll Learn</h3>
        <p>
          This interactive guide covers all major web storage mechanisms
          available in modern browsers. Each section includes practical
          examples, best practices, and hands-on demos.
        </p>
      </div>

      <div className="storage-overview">
        <div className="storage-card">
          <div className="storage-icon">💾</div>
          <h3>LocalStorage</h3>
          <p>Persistent key-value storage with no expiration</p>
          <ul>
            <li>✅ Persists across sessions</li>
            <li>✅ ~5-10 MB storage</li>
            <li>✅ Cross-tab synchronization</li>
            <li>✅ TTL/expiration support</li>
          </ul>
        </div>

        <div className="storage-card">
          <div className="storage-icon">⏱️</div>
          <h3>SessionStorage</h3>
          <p>Session-scoped storage per tab/window</p>
          <ul>
            <li>✅ Tab-specific data</li>
            <li>✅ ~5-10 MB storage</li>
            <li>✅ Cleared on tab close</li>
            <li>✅ Perfect for forms</li>
          </ul>
        </div>

        <div className="storage-card">
          <div className="storage-icon">🍪</div>
          <h3>Cookies</h3>
          <p>HTTP cookies sent with every request</p>
          <ul>
            <li>✅ Server-accessible</li>
            <li>✅ ~4 KB per cookie</li>
            <li>✅ Expiration control</li>
            <li>✅ Security attributes</li>
          </ul>
        </div>

        <div className="storage-card">
          <div className="storage-icon">🗄️</div>
          <h3>IndexedDB</h3>
          <p>Powerful client-side database</p>
          <ul>
            <li>✅ Large data storage</li>
            <li>✅ Structured data</li>
            <li>✅ Indexes & queries</li>
            <li>✅ Transactions</li>
          </ul>
        </div>

        <div className="storage-card">
          <div className="storage-icon">🔒</div>
          <h3>Secure Storage</h3>
          <p>Encryption and security patterns</p>
          <ul>
            <li>✅ AES encryption</li>
            <li>✅ Token management</li>
            <li>✅ XSS prevention</li>
            <li>✅ Best practices</li>
          </ul>
        </div>
      </div>

      <div className="comparison-card">
        <h3>📊 Quick Comparison</h3>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>LocalStorage</th>
              <th>SessionStorage</th>
              <th>Cookies</th>
              <th>IndexedDB</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Capacity</strong>
              </td>
              <td>~5-10 MB</td>
              <td>~5-10 MB</td>
              <td>~4 KB</td>
              <td>~50+ MB</td>
            </tr>
            <tr>
              <td>
                <strong>Persistence</strong>
              </td>
              <td>Forever</td>
              <td>Tab session</td>
              <td>Configurable</td>
              <td>Forever</td>
            </tr>
            <tr>
              <td>
                <strong>Scope</strong>
              </td>
              <td>Origin</td>
              <td>Tab</td>
              <td>Origin</td>
              <td>Origin</td>
            </tr>
            <tr>
              <td>
                <strong>Server Access</strong>
              </td>
              <td>❌ No</td>
              <td>❌ No</td>
              <td>✅ Yes</td>
              <td>❌ No</td>
            </tr>
            <tr>
              <td>
                <strong>API Type</strong>
              </td>
              <td>Synchronous</td>
              <td>Synchronous</td>
              <td>Synchronous</td>
              <td>Asynchronous</td>
            </tr>
            <tr>
              <td>
                <strong>Data Type</strong>
              </td>
              <td>String</td>
              <td>String</td>
              <td>String</td>
              <td>Any</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="tips-card">
        <h3>💡 Getting Started</h3>
        <ul>
          <li>Click on any storage type in the navigation above to explore</li>
          <li>Each demo includes interactive examples you can try</li>
          <li>Open DevTools (F12) → Application tab to inspect storage</li>
          <li>Try opening multiple tabs to see cross-tab behavior</li>
          <li>All code is production-ready and follows best practices</li>
        </ul>
      </div>

      <div className="features-card">
        <h3>🎯 Use Cases</h3>
        <div className="use-cases">
          <div className="use-case">
            <strong>LocalStorage:</strong> User preferences, theme settings,
            cached data
          </div>
          <div className="use-case">
            <strong>SessionStorage:</strong> Form data, wizard steps, temporary
            state
          </div>
          <div className="use-case">
            <strong>Cookies:</strong> Authentication tokens, tracking, server
            communication
          </div>
          <div className="use-case">
            <strong>IndexedDB:</strong> Offline apps, large datasets, complex
            queries
          </div>
          <div className="use-case">
            <strong>Secure Storage:</strong> Sensitive data, tokens, encrypted
            information
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
