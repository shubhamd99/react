import { useState, useEffect } from "react";
import * as storage from "../utils/sessionStorage";
import * as quota from "../utils/storageQuota";
import "./Demo.css";

const SessionStorageDemo = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [items, setItems] = useState({});
  const [sessionId, setSessionId] = useState("");
  const [storageInfo, setStorageInfo] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadItems();
    // eslint-disable-next-line react-hooks/immutability
    loadStorageInfo();
    setSessionId(storage.getSessionId());
  }, []);

  const loadItems = () => {
    const allItems = storage.getAllItems();
    setItems(allItems);
  };

  const loadStorageInfo = async () => {
    const info = await quota.getAllStorageSizes();
    setStorageInfo(info);
  };

  const handleSet = () => {
    if (!key || !value) {
      alert("Please enter both key and value");
      return;
    }

    const success = storage.setItem(key, value);

    if (success) {
      setKey("");
      setValue("");
      loadItems();
      loadStorageInfo();
    }
  };

  const handleRemove = (itemKey) => {
    storage.removeItem(itemKey);
    loadItems();
    loadStorageInfo();
  };

  const handleClear = () => {
    if (confirm("Clear all sessionStorage items?")) {
      storage.clear();
      loadItems();
      loadStorageInfo();
    }
  };

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h2>⏱️ SessionStorage Demo</h2>
        <p>Session-based storage that persists only for the current tab</p>
      </div>

      {/* Session Info */}
      <div className="info-card">
        <h3>🆔 Session Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Session ID:</span>
            <span className="info-value session-id">{sessionId}</span>
          </div>
          {storageInfo && (
            <div className="info-item">
              <span className="info-label">SessionStorage Size:</span>
              <span className="info-value">
                {storageInfo.sessionStorage.kb} KB
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Add Item Form */}
      <div className="form-card">
        <h3>➕ Add Item</h3>
        <div className="form-group">
          <label>Key:</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="e.g., formData"
          />
        </div>
        <div className="form-group">
          <label>Value:</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g., temporary data"
          />
        </div>
        <button onClick={handleSet} className="btn btn-primary">
          Set Item
        </button>
      </div>

      {/* Stored Items */}
      <div className="items-card">
        <div className="items-header">
          <h3>📦 Stored Items ({Object.keys(items).length})</h3>
          <button onClick={handleClear} className="btn btn-danger">
            Clear All
          </button>
        </div>

        {Object.keys(items).length === 0 ? (
          <p className="empty-message">No items stored</p>
        ) : (
          <div className="items-list">
            {Object.entries(items).map(([itemKey, itemValue]) => (
              <div key={itemKey} className="item">
                <div className="item-content">
                  <div className="item-key">{itemKey}</div>
                  <div className="item-value">
                    {typeof itemValue === "object"
                      ? JSON.stringify(itemValue, null, 2)
                      : String(itemValue)}
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(itemKey)}
                  className="btn btn-small btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comparison */}
      <div className="comparison-card">
        <h3>⚖️ SessionStorage vs LocalStorage</h3>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>SessionStorage</th>
              <th>LocalStorage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Persistence</td>
              <td>Until tab/window closes</td>
              <td>Forever (until cleared)</td>
            </tr>
            <tr>
              <td>Scope</td>
              <td>Per tab/window</td>
              <td>Shared across tabs</td>
            </tr>
            <tr>
              <td>Storage Size</td>
              <td>~5-10 MB</td>
              <td>~5-10 MB</td>
            </tr>
            <tr>
              <td>Cross-tab Sync</td>
              <td>❌ No</td>
              <td>✅ Yes</td>
            </tr>
            <tr>
              <td>Use Case</td>
              <td>Form data, session state</td>
              <td>User preferences, tokens</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Features */}
      <div className="features-card">
        <h3>✨ Features Demonstrated</h3>
        <ul>
          <li>✅ Basic CRUD operations</li>
          <li>✅ Session-specific storage (isolated per tab)</li>
          <li>✅ Unique session ID generation</li>
          <li>✅ Type-safe JSON serialization</li>
          <li>✅ Storage size monitoring</li>
          <li>✅ Automatic cleanup on tab close</li>
        </ul>
      </div>

      {/* Tips */}
      <div className="tips-card">
        <h3>💡 Tips</h3>
        <ul>
          <li>
            Open this page in a new tab - you'll see a different Session ID
          </li>
          <li>Data stored here won't appear in other tabs</li>
          <li>Close and reopen the tab - all data will be lost</li>
          <li>Perfect for temporary form data or wizard steps</li>
          <li>Duplicate tab (Ctrl+Shift+K) copies sessionStorage to new tab</li>
        </ul>
      </div>
    </div>
  );
};

export default SessionStorageDemo;
