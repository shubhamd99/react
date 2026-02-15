import { useState, useEffect } from "react";
import * as cookies from "../utils/cookies";
import "./Demo.css";

const CookieDemo = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [expires, setExpires] = useState("");
  const [path, setPath] = useState("/");
  const [secure, setSecure] = useState(false);
  const [sameSite, setSameSite] = useState("Lax");
  const [allCookies, setAllCookies] = useState({});

  useEffect(() => {
    loadCookies();
  }, []);

  const loadCookies = () => {
    const cookieData = cookies.getAllCookies();
    setAllCookies(cookieData);
  };

  const handleSet = () => {
    if (!name || !value) {
      alert("Please enter both name and value");
      return;
    }

    const options = {
      path,
      secure,
      sameSite,
    };

    if (expires) {
      options.expires = parseInt(expires);
    }

    const success = cookies.setCookie(name, value, options);

    if (success) {
      setName("");
      setValue("");
      setExpires("");
      loadCookies();
    }
  };

  const handleRemove = (cookieName) => {
    cookies.removeCookie(cookieName, { path });
    loadCookies();
  };

  const handleClearAll = () => {
    if (confirm("Clear all cookies?")) {
      cookies.clearAllCookies();
      loadCookies();
    }
  };

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h2>🍪 Cookies Demo</h2>
        <p>HTTP cookies with all attributes and security options</p>
      </div>

      {/* Cookie Info */}
      <div className="info-card">
        <h3>📊 Cookie Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Total Cookies:</span>
            <span className="info-value">{Object.keys(allCookies).length}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Size:</span>
            <span className="info-value">
              {cookies.getTotalCookiesSize().kb} KB
            </span>
          </div>
        </div>
      </div>

      {/* Add Cookie Form */}
      <div className="form-card">
        <h3>➕ Add Cookie</h3>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., user_preference"
          />
        </div>
        <div className="form-group">
          <label>Value:</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g., dark_mode"
          />
        </div>
        <div className="form-group">
          <label>Expires (days):</label>
          <input
            type="number"
            value={expires}
            onChange={(e) => setExpires(e.target.value)}
            placeholder="e.g., 7"
          />
        </div>
        <div className="form-group">
          <label>Path:</label>
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="/"
          />
        </div>
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={secure}
              onChange={(e) => setSecure(e.target.checked)}
            />
            Secure (HTTPS only)
          </label>
        </div>
        <div className="form-group">
          <label>SameSite:</label>
          <select
            value={sameSite}
            onChange={(e) => setSameSite(e.target.value)}
          >
            <option value="Strict">Strict</option>
            <option value="Lax">Lax</option>
            <option value="None">None</option>
          </select>
        </div>
        <button onClick={handleSet} className="btn btn-primary">
          Set Cookie
        </button>
      </div>

      {/* Stored Cookies */}
      <div className="items-card">
        <div className="items-header">
          <h3>🍪 Stored Cookies ({Object.keys(allCookies).length})</h3>
          <button onClick={handleClearAll} className="btn btn-danger">
            Clear All
          </button>
        </div>

        {Object.keys(allCookies).length === 0 ? (
          <p className="empty-message">No cookies stored</p>
        ) : (
          <div className="items-list">
            {Object.entries(allCookies).map(([cookieName, cookieValue]) => (
              <div key={cookieName} className="item">
                <div className="item-content">
                  <div className="item-key">{cookieName}</div>
                  <div className="item-value">
                    {typeof cookieValue === "object"
                      ? JSON.stringify(cookieValue, null, 2)
                      : String(cookieValue)}
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(cookieName)}
                  className="btn btn-small btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cookie Attributes */}
      <div className="attributes-card">
        <h3>🔧 Cookie Attributes Explained</h3>
        <div className="attribute-list">
          <div className="attribute-item">
            <strong>Expires/Max-Age:</strong>
            <p>
              Sets when the cookie will be deleted. Without this, cookie is
              session-only.
            </p>
          </div>
          <div className="attribute-item">
            <strong>Path:</strong>
            <p>
              URL path that must exist in the requested URL. Default is current
              path.
            </p>
          </div>
          <div className="attribute-item">
            <strong>Secure:</strong>
            <p>Cookie only sent over HTTPS. Important for sensitive data.</p>
          </div>
          <div className="attribute-item">
            <strong>SameSite:</strong>
            <p>
              <strong>Strict:</strong> Cookie not sent with cross-site requests
              <br />
              <strong>Lax:</strong> Cookie sent with top-level navigation
              <br />
              <strong>None:</strong> Cookie sent with all requests (requires
              Secure)
            </p>
          </div>
          <div className="attribute-item">
            <strong>HttpOnly:</strong>
            <p>
              ⚠️ Cannot be set via JavaScript (server-side only). Prevents XSS
              attacks.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="features-card">
        <h3>✨ Features Demonstrated</h3>
        <ul>
          <li>✅ Creating cookies with all attributes</li>
          <li>✅ Reading and parsing cookies</li>
          <li>✅ Updating and deleting cookies</li>
          <li>✅ Secure cookie patterns</li>
          <li>✅ SameSite attribute for CSRF protection</li>
          <li>✅ Cookie size monitoring</li>
        </ul>
      </div>

      {/* Tips */}
      <div className="tips-card">
        <h3>💡 Tips</h3>
        <ul>
          <li>Cookies are sent with every HTTP request to the same domain</li>
          <li>Maximum size is typically 4KB per cookie</li>
          <li>Use Secure flag for sensitive data (requires HTTPS)</li>
          <li>SameSite=Strict provides best CSRF protection</li>
          <li>HttpOnly cookies (server-side) are immune to XSS attacks</li>
          <li>Check DevTools → Application → Cookies to see all attributes</li>
        </ul>
      </div>
    </div>
  );
};

export default CookieDemo;
