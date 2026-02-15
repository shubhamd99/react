import { useState, useEffect } from "react";
import * as encryption from "../utils/encryption";
import * as quota from "../utils/storageQuota";
import "./Demo.css";

const SecureStorageDemo = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const [items, setItems] = useState({});
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadItems();
    checkAuthentication();
  }, []);

  const loadItems = () => {
    const allKeys = Object.keys(localStorage).filter(
      (k) => !k.startsWith("__"),
    );
    const itemsObj = {};
    allKeys.forEach((k) => {
      itemsObj[k] = localStorage.getItem(k);
    });
    setItems(itemsObj);
  };

  const checkAuthentication = () => {
    const authenticated = encryption.tokenManager.isAuthenticated();
    setIsAuthenticated(authenticated);
  };

  const handleEncryptAndStore = () => {
    if (!key || !value) {
      alert("Please enter both key and value");
      return;
    }

    const keyToUse = encryptionKey || undefined;
    const success = encryption.secureLocalStorage.setItem(key, value, keyToUse);

    if (success) {
      setKey("");
      setValue("");
      loadItems();
      alert("Data encrypted and stored successfully!");
    }
  };

  const handleDecrypt = (itemKey) => {
    const keyToUse = encryptionKey || undefined;
    const decrypted = encryption.secureLocalStorage.getItem(itemKey, keyToUse);

    if (decrypted !== null) {
      alert(`Decrypted value:\n${JSON.stringify(decrypted, null, 2)}`);
    } else {
      alert("Failed to decrypt. Wrong encryption key?");
    }
  };

  const handleRemove = (itemKey) => {
    encryption.secureLocalStorage.removeItem(itemKey);
    loadItems();
  };

  const handleGenerateKey = () => {
    const newKey = encryption.generateKey();
    setEncryptionKey(newKey);
    alert("New encryption key generated! Copy it to use later.");
  };

  const handleLogin = () => {
    if (!token) {
      alert("Please enter a token");
      return;
    }

    const keyToUse = encryptionKey || undefined;
    encryption.tokenManager.setAccessToken(token, keyToUse);
    setToken("");
    setIsAuthenticated(true);
    alert("Token stored securely!");
  };

  const handleLogout = () => {
    encryption.tokenManager.clearTokens();
    setIsAuthenticated(false);
    alert("Tokens cleared!");
  };

  const handleViewToken = () => {
    const keyToUse = encryptionKey || undefined;
    const accessToken = encryption.tokenManager.getAccessToken(keyToUse);

    if (accessToken) {
      alert(`Access Token:\n${accessToken}`);
    } else {
      alert("No token found or decryption failed");
    }
  };

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h2>🔒 Secure Storage Demo</h2>
        <p>Encryption, secure token management, and XSS prevention</p>
      </div>

      {/* Encryption Key */}
      <div className="info-card">
        <h3>🔑 Encryption Key</h3>
        <div className="form-group">
          <label>Custom Encryption Key (optional):</label>
          <div className="key-input-group">
            <input
              type="text"
              value={encryptionKey}
              onChange={(e) => setEncryptionKey(e.target.value)}
              placeholder="Leave empty to use default key"
              className="key-input"
            />
            <button onClick={handleGenerateKey} className="btn btn-secondary">
              Generate Random Key
            </button>
          </div>
          <p className="help-text">
            💡 Use the same key to encrypt and decrypt. Store it securely!
          </p>
        </div>
      </div>

      {/* Token Management */}
      <div className="form-card">
        <h3>🎫 Token Management</h3>
        <div className="auth-status">
          Status:{" "}
          {isAuthenticated ? (
            <span className="status-authenticated">✅ Authenticated</span>
          ) : (
            <span className="status-unauthenticated">❌ Not Authenticated</span>
          )}
        </div>

        {!isAuthenticated ? (
          <div className="form-group">
            <label>Access Token:</label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            />
            <button onClick={handleLogin} className="btn btn-primary">
              Store Token (Login)
            </button>
          </div>
        ) : (
          <div className="button-group">
            <button onClick={handleViewToken} className="btn btn-secondary">
              View Token
            </button>
            <button onClick={handleLogout} className="btn btn-danger">
              Clear Tokens (Logout)
            </button>
          </div>
        )}
      </div>

      {/* Encrypt and Store */}
      <div className="form-card">
        <h3>🔐 Encrypt and Store Data</h3>
        <div className="form-group">
          <label>Key:</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="e.g., sensitive_data"
          />
        </div>
        <div className="form-group">
          <label>Value (will be encrypted):</label>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g., credit card number, personal info"
            rows="3"
          />
        </div>
        <button onClick={handleEncryptAndStore} className="btn btn-primary">
          Encrypt and Store
        </button>
      </div>

      {/* Stored Items */}
      <div className="items-card">
        <div className="items-header">
          <h3>📦 Encrypted Items ({Object.keys(items).length})</h3>
        </div>

        {Object.keys(items).length === 0 ? (
          <p className="empty-message">No encrypted items stored</p>
        ) : (
          <div className="items-list">
            {Object.entries(items).map(([itemKey, itemValue]) => (
              <div key={itemKey} className="item">
                <div className="item-content">
                  <div className="item-key">{itemKey}</div>
                  <div className="item-value encrypted-value">
                    {itemValue.substring(0, 100)}
                    {itemValue.length > 100 && "..."}
                  </div>
                  <p className="help-text">
                    ⚠️ This is encrypted data. Use "Decrypt" to view the
                    original value.
                  </p>
                </div>
                <div className="button-group">
                  <button
                    onClick={() => handleDecrypt(itemKey)}
                    className="btn btn-small btn-secondary"
                  >
                    Decrypt
                  </button>
                  <button
                    onClick={() => handleRemove(itemKey)}
                    className="btn btn-small btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security Best Practices */}
      <div className="security-card">
        <h3>🛡️ Security Best Practices</h3>
        <div className="security-list">
          <div className="security-item">
            <strong>✅ DO:</strong>
            <ul>
              <li>Encrypt sensitive data before storing</li>
              <li>Use strong, unique encryption keys</li>
              <li>Store encryption keys securely (not in localStorage)</li>
              <li>Use HTTPS for all requests</li>
              <li>Implement token expiration and refresh</li>
              <li>Sanitize user input to prevent XSS</li>
            </ul>
          </div>
          <div className="security-item">
            <strong>❌ DON'T:</strong>
            <ul>
              <li>Store passwords or credit cards in plain text</li>
              <li>Use weak or predictable encryption keys</li>
              <li>Store encryption keys in localStorage</li>
              <li>Trust client-side storage for critical security</li>
              <li>Store sensitive data without encryption</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="features-card">
        <h3>✨ Features Demonstrated</h3>
        <ul>
          <li>✅ AES encryption/decryption</li>
          <li>✅ Secure token management</li>
          <li>✅ Custom encryption keys</li>
          <li>✅ Random key generation</li>
          <li>✅ Encrypted localStorage wrapper</li>
          <li>✅ Authentication state management</li>
        </ul>
      </div>

      {/* Tips */}
      <div className="tips-card">
        <h3>💡 Tips</h3>
        <ul>
          <li>
            Check localStorage in DevTools - you'll see encrypted gibberish!
          </li>
          <li>Try decrypting with wrong key - it will fail</li>
          <li>In production, get encryption keys from secure backend</li>
          <li>Consider using Web Crypto API for better security</li>
          <li>Always use HTTPS in production</li>
          <li>Implement token refresh mechanism for long sessions</li>
        </ul>
      </div>
    </div>
  );
};

export default SecureStorageDemo;
