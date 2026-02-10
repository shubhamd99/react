import React, { useState, useEffect, useCallback } from "react";
import { Database, Plus, Trash2, FileText } from "lucide-react";

const CachingDemo = () => {
  const [cachesList, setCachesList] = useState([]);
  const [selectedCache, setSelectedCache] = useState(null);
  const [cacheItems, setCacheItems] = useState([]);
  const [newCacheName, setNewCacheName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Load list of caches
  const loadCaches = useCallback(async () => {
    if ("caches" in window) {
      const keys = await caches.keys();
      setCachesList(keys);
      if (keys.length > 0 && !selectedCache) {
        setSelectedCache(keys[0]);
      }
    }
  }, [selectedCache]);

  // Load items in selected cache
  const loadCacheItems = useCallback(async () => {
    if (selectedCache && "caches" in window) {
      setLoading(true);
      try {
        const cache = await caches.open(selectedCache);
        const requests = await cache.keys();
        setCacheItems(requests.map((req) => req.url));
      } catch (err) {
        console.error("Error loading cache items:", err);
      } finally {
        setLoading(false);
      }
    }
  }, [selectedCache]);

  useEffect(() => {
    // Initial load
    loadCaches();
  }, [loadCaches]); // Only run once on mount

  useEffect(() => {
    if (selectedCache) {
      loadCacheItems();
    }
  }, [selectedCache, loadCacheItems]);

  const createCache = async () => {
    if (!newCacheName) return;
    if ("caches" in window) {
      await caches.open(newCacheName);
      setNewCacheName("");
      // Refresh list
      const keys = await caches.keys();
      setCachesList(keys);
      setSelectedCache(newCacheName);
    }
  };

  const deleteCache = async (name) => {
    if (window.confirm(`Delete cache "${name}"?`)) {
      await caches.delete(name);
      if (selectedCache === name) setSelectedCache(null);

      const keys = await caches.keys();
      setCachesList(keys);
    }
  };

  const addToCache = async () => {
    if (!newUrl || !selectedCache) return;
    setLoading(true);
    try {
      const cache = await caches.open(selectedCache);
      // We need to fetch it first to ensure it's valid, or just add()
      // add() fetches automatically
      await cache.add(newUrl);
      setNewUrl("");
      loadCacheItems();
    } catch (err) {
      alert(
        `Failed to cache URL. Ensure CORS is allowed and URL is valid.\n${err.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (url) => {
    if (!selectedCache) return;
    const cache = await caches.open(selectedCache);
    await cache.delete(url);
    loadCacheItems();
  };

  return (
    <div className="container">
      <h1>Cache Storage API</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
        Directly interact with the browser's Cache Storage. This is what Service
        Workers use to store responses, but it's also available to the main
        thread!
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* Sidebar: List of Caches */}
        <div className="card">
          <h3
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Database size={20} /> Caches
          </h3>

          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <input
              type="text"
              value={newCacheName}
              onChange={(e) => setNewCacheName(e.target.value)}
              placeholder="New Cache Name"
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--border)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
            <button
              onClick={createCache}
              className="btn btn-primary"
              style={{ padding: "0.5rem" }}
            >
              <Plus size={18} />
            </button>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {cachesList.length === 0 && (
              <span
                style={{ color: "var(--text-secondary)", fontStyle: "italic" }}
              >
                No caches found
              </span>
            )}
            {cachesList.map((name) => (
              <div
                key={name}
                onClick={() => setSelectedCache(name)}
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  background:
                    selectedCache === name
                      ? "var(--accent)"
                      : "var(--bg-primary)",
                  color:
                    selectedCache === name
                      ? "var(--bg-primary)"
                      : "var(--text-primary)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: 500,
                }}
              >
                {name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCache(name);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "inherit",
                    opacity: 0.7,
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Main: Cache Details */}
        <div className="card">
          {selectedCache ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <h3>
                  Contents of{" "}
                  <span style={{ color: "var(--accent)" }}>
                    {selectedCache}
                  </span>
                </h3>
                <span className="badge" style={{ fontSize: "0.9rem" }}>
                  {cacheItems.length} items
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="URL to cache (e.g. /favicon.ico)"
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--border)",
                    background: "var(--bg-primary)",
                    color: "var(--text-primary)",
                  }}
                />
                <button
                  onClick={addToCache}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? "Adding..." : "Add URL"}
                </button>
              </div>

              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                {cacheItems.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Cache is empty
                  </div>
                )}
                {cacheItems.map((url, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "0.75rem",
                      borderBottom: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    <FileText size={16} color="var(--text-secondary)" />
                    <span style={{ flex: 1, wordBreak: "break-all" }}>
                      {url}
                    </span>
                    <button
                      onClick={() => deleteItem(url)}
                      style={{
                        color: "var(--error)",
                        padding: "0.25rem",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "var(--text-secondary)",
              }}
            >
              Select a cache to view its contents
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CachingDemo;
