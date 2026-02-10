import React, { useState, useEffect } from "react";
import { Activity, Radio, Wifi, WifiOff } from "lucide-react";

const ServiceWorkerDemo = () => {
  const [swStatus, setSwStatus] = useState(() => {
    if (!("serviceWorker" in navigator)) {
      return "Not Supported";
    }
    if (navigator.serviceWorker.controller) {
      return "Active & Controlling";
    }
    return "Unregistered";
  });
  const [swInstance, setSwInstance] = useState(null);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [mockApiData, setMockApiData] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Check if browser supports SW
    if ("serviceWorker" in navigator) {
      // Register
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          setSwInstance(registration);
          if (!navigator.serviceWorker.controller) {
            setSwStatus("Registered (Refresh to activate)");
          }

          if (registration.installing) setSwStatus("Installing");
          if (registration.waiting) setSwStatus("Installed / Waiting");
          if (registration.active && navigator.serviceWorker.controller)
            setSwStatus("Active");

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  setSwStatus("New Content Available");
                } else {
                  setSwStatus("Installed");
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
          setSwStatus("Registration Failed");
        });

      // Listen for messages from SW
      const messageHandler = (event) => {
        if (event.data && event.data.type === "REPLY") {
          setReply(event.data.payload);
        }
      };

      navigator.serviceWorker.addEventListener("message", messageHandler);

      return () => {
        navigator.serviceWorker.removeEventListener("message", messageHandler);
      };
    }
  }, []); // Run once on mount

  useEffect(() => {
    // Online/Offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const sendMessageToSW = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "HELLO",
        payload: message || "Hello from React!",
      });
      setMessage("");
    } else {
      alert("Service Worker is not controlling the page yet. Refresh?");
    }
  };

  const fetchMockData = async () => {
    try {
      // This URL doesn't actually exist on the server, but the SW will intercept it
      const response = await fetch("/api/mock-time");
      const data = await response.json();
      setMockApiData(data);
    } catch (error) {
      console.error("Fetch failed:", error);
      setMockApiData({ error: "Fetch failed (SW might not be active)" });
    }
  };

  const unregisterSW = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
          registration.unregister();
        }
        setSwStatus("Unregistered");
        setSwInstance(null);
        window.location.reload();
      });
    }
  };

  return (
    <div className="container">
      <h1>Service Workers</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
        Service Workers act as proxy servers that sit between web applications,
        the browser, and the network. They enable features like offline support,
        push notifications, and background sync.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem",
        }}
      >
        {/* Helper Panel */}
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h3>Status Dashboard</h3>
            {isOnline ? (
              <span
                className="badge"
                style={{
                  background: "var(--success)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <Wifi size={12} /> Online
              </span>
            ) : (
              <span
                className="badge"
                style={{
                  background: "var(--error)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <WifiOff size={12} /> Offline
              </span>
            )}
          </div>

          <div
            style={{
              background: "#00000022",
              padding: "1rem",
              borderRadius: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <Activity size={18} color="var(--accent)" />
              <span style={{ fontWeight: 600 }}>SW Status:</span>
              <span
                style={{
                  color: swStatus.includes("Active")
                    ? "var(--success)"
                    : "var(--warning)",
                }}
              >
                {swStatus}
              </span>
            </div>
            {swInstance && (
              <div
                style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}
              >
                Scope: {swInstance.scope}
              </div>
            )}
          </div>

          <button
            onClick={unregisterSW}
            className="btn btn-outline"
            style={{ fontSize: "0.8rem", width: "100%" }}
          >
            Unregister & Reload
          </button>
        </div>

        {/* Interception Demo */}
        <div className="card">
          <h3>Network Interception</h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              marginBottom: "1rem",
            }}
          >
            Try to fetch data from <code>/api/mock-time</code>. This endpoint
            does not exist on the server, but the Service Worker will intercept
            the request and return a mock response.
          </p>

          <button
            onClick={fetchMockData}
            className="btn btn-primary"
            style={{ marginBottom: "1rem" }}
          >
            <Radio size={18} /> Fetch Intercepted Data
          </button>

          {mockApiData && (
            <div
              style={{
                background: "#00000022",
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              <pre>{JSON.stringify(mockApiData, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Messaging Demo */}
        <div className="card">
          <h3>Two-way Messaging</h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              marginBottom: "1rem",
            }}
          >
            Send messages to the Service Worker and receive replies.
          </p>

          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--border)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
            <button onClick={sendMessageToSW} className="btn btn-primary">
              Send
            </button>
          </div>

          {reply && (
            <div
              style={{
                background: "#00000022",
                padding: "1rem",
                borderRadius: "0.5rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  display: "block",
                  marginBottom: "0.25rem",
                }}
              >
                Latest Reply:
              </span>
              <code style={{ background: "transparent", padding: 0 }}>
                {reply}
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceWorkerDemo;
