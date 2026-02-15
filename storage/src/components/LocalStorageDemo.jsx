import { useState, useEffect } from "react";
import * as storage from "../utils/localStorage";
import * as quota from "../utils/storageQuota";
import "./Demo.css";

const LocalStorageDemo = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [ttl, setTtl] = useState("");
  const [items, setItems] = useState({});
  const [storageInfo, setStorageInfo] = useState(null);
  const [syncMessage, setSyncMessage] = useState("");

  // Load items on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadItems();
    // eslint-disable-next-line react-hooks/immutability
    loadStorageInfo();

    // Listen for cross-tab changes
    const cleanup = storage.onStorageChange((change) => {
      setSyncMessage(`🔄 Storage changed in another tab: ${change.key}`);
      setTimeout(() => setSyncMessage(""), 3000);
      loadItems();
    });

    return cleanup;
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

    const ttlMs = ttl ? parseInt(ttl) * 1000 : null;
    const success = storage.setItem(key, value, ttlMs);

    if (success) {
      setKey("");
      setValue("");
      setTtl("");
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
    if (confirm("Clear all localStorage items?")) {
      storage.clear();
      loadItems();
      loadStorageInfo();
    }
  };

  const handleCleanExpired = () => {
    const cleaned = storage.cleanExpired();
    alert(`Cleaned ${cleaned} expired items`);
    loadItems();
  };

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h2>💾 LocalStorage Demo</h2>
        <p>Persistent storage with TTL support and cross-tab synchronization</p>
      </div>

      {syncMessage && <div className="sync-message">{syncMessage}</div>}

      {/* Storage Info */}
      {storageInfo && (
        <div className="info-card">
          <h3>📊 Storage Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">LocalStorage Size:</span>
              <span className="info-value">
                {storageInfo.localStorage.kb} KB
              </span>
            </div>
            {storageInfo.quota && (
              <>
                <div className="info-item">
                  <span className="info-label">Total Usage:</span>
                  <span className="info-value">
                    {storageInfo.quota.usageInMB} MB
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Total Quota:</span>
                  <span className="info-value">
                    {storageInfo.quota.quotaInMB} MB
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Usage:</span>
                  <span className="info-value">
                    {storageInfo.quota.usagePercent}%
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Add Item Form */}
      <div className="form-card">
        <h3>➕ Add Item</h3>
        <div className="form-group">
          <label>Key:</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="e.g., username"
          />
        </div>
        <div className="form-group">
          <label>Value:</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g., John Doe"
          />
        </div>
        <div className="form-group">
          <label>TTL (seconds, optional):</label>
          <input
            type="number"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
            placeholder="e.g., 60"
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
          <div className="items-actions">
            <button onClick={handleCleanExpired} className="btn btn-secondary">
              Clean Expired
            </button>
            <button onClick={handleClear} className="btn btn-danger">
              Clear All
            </button>
          </div>
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

      {/* Features */}
      <div className="features-card">
        <h3>✨ Features Demonstrated</h3>
        <ul>
          <li>✅ Basic CRUD operations</li>
          <li>✅ Type-safe JSON serialization</li>
          <li>✅ TTL/Expiration support</li>
          <li>✅ Cross-tab synchronization (open in multiple tabs to test)</li>
          <li>✅ Storage quota monitoring</li>
          <li>✅ Error handling for quota exceeded</li>
          <li>✅ Automatic cleanup of expired items</li>
        </ul>
      </div>

      {/* Tips */}
      <div className="tips-card">
        <h3>💡 Tips</h3>
        <ul>
          <li>
            Open this page in multiple tabs to see cross-tab sync in action
          </li>
          <li>Set a TTL of 10 seconds and wait to see automatic expiration</li>
          <li>LocalStorage persists even after browser restart</li>
          <li>Maximum storage is typically 5-10 MB per origin</li>
        </ul>
      </div>
    </div>
  );
};

export default LocalStorageDemo;
