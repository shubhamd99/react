import React, { useState, useEffect, useRef } from "react";
import { Play, Loader2 } from "lucide-react";

const WebWorkerDemo = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uiResponsive, setUiResponsive] = useState(0);
  const [iterations, setIterations] = useState(50000000);
  const [mode, setMode] = useState("worker"); // 'worker' or 'main'

  // Ref to track valid worker instance across renders
  const workerRef = useRef(null);

  useEffect(() => {
    // Create worker on mount
    const heavyWorker = new Worker(
      new URL("../workers/heavyWorker.js", import.meta.url),
      {
        type: "module",
      },
    );

    heavyWorker.onmessage = (e) => {
      const { type, result, time } = e.data;
      if (type === "CALCULATION_DONE") {
        setResult({ type: "Worker", value: result, time: time });
        setLoading(false);
      }
    };

    workerRef.current = heavyWorker;

    // UI Responsiveness Test
    const interval = setInterval(() => {
      setUiResponsive((prev) => (prev + 1) % 100);
    }, 50);

    return () => {
      heavyWorker.terminate();
      clearInterval(interval);
    };
  }, []);

  const runCalculation = () => {
    setLoading(true);
    setResult(null);

    if (mode === "worker") {
      workerRef.current.postMessage({
        type: "HEAVY_CALCULATION",
        payload: iterations,
      });
    } else {
      // Run on main thread (will block UI)
      setTimeout(() => {
        const start = performance.now();
        let val = 0;
        for (let i = 0; i < iterations; i++) {
          val += Math.sqrt(i) * Math.sin(i);
        }
        const end = performance.now();
        setResult({
          type: "Main Thread",
          value: val.toFixed(2),
          time: (end - start).toFixed(2),
        });
        setLoading(false);
      }, 100); // Small timeout to let the 'loading' state render first
    }
  };

  return (
    <div className="container">
      <h1>Web Workers</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
        Web Workers run scripts in background threads. They can perform tasks
        without interfering with the user interface.
      </p>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
      >
        {/* Controls */}
        <div className="card">
          <h3>Heavy Calculation Demo</h3>

          <div style={{ marginTop: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
              }}
            >
              Iterations (Workload)
            </label>
            <input
              type="range"
              min="1000000"
              max="100000000"
              step="1000000"
              value={iterations}
              onChange={(e) => setIterations(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <div
              style={{
                textAlign: "right",
                fontSize: "0.8rem",
                color: "var(--accent)",
              }}
            >
              {iterations.toLocaleString()} Ops
            </div>
          </div>

          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
            <button
              className={`btn ${mode === "worker" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setMode("worker")}
            >
              Use Worker
            </button>
            <button
              className={`btn ${mode === "main" ? "btn-primary" : "btn-outline"}`}
              onClick={() => setMode("main")}
            >
              Use Main Thread
            </button>
          </div>

          <button
            className="btn btn-primary"
            style={{
              width: "100%",
              marginTop: "1.5rem",
              justifyContent: "center",
            }}
            onClick={runCalculation}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Play size={18} />
            )}
            {loading ? "Processing..." : "Start Calculation"}
          </button>
        </div>

        {/* Results & Visualization */}
        <div className="card">
          <h3>UI Responsiveness Check</h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              marginBottom: "1rem",
            }}
          >
            The animation below runs on the main thread. If it freezes, the main
            thread is blocked.
          </p>

          <div
            style={{
              width: "100%",
              height: "24px",
              background: "var(--bg-primary)",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: `${uiResponsive}%`,
                top: 0,
                bottom: 0,
                width: "40px",
                background: "var(--accent)",
                borderRadius: "12px",
                transition: "left 0.05s linear", // Linear transition to show jank clearly
              }}
            />
          </div>

          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              background: "#00000022",
              borderRadius: "0.5rem",
              minHeight: "120px",
            }}
          >
            <h4>Results</h4>
            {result ? (
              <div style={{ marginTop: "0.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span style={{ color: "var(--text-secondary)" }}>
                    Exec Mode:
                  </span>
                  <span
                    style={{
                      color:
                        result.type === "Worker"
                          ? "var(--success)"
                          : "var(--error)",
                    }}
                  >
                    {result.type}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span style={{ color: "var(--text-secondary)" }}>
                    Time Taken:
                  </span>
                  <span>{result.time} ms</span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "var(--text-secondary)" }}>
                    Output:
                  </span>
                  <span style={{ wordBreak: "break-all", fontSize: "0.8rem" }}>
                    {result.value.substring(0, 20)}...
                  </span>
                </div>
              </div>
            ) : (
              <div
                style={{
                  color: "var(--text-secondary)",
                  fontStyle: "italic",
                  marginTop: "0.5rem",
                }}
              >
                Waiting for run...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebWorkerDemo;
