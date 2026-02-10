import React from "react";

const Home = () => (
  <div>
    <h1>Background Processing in the Web</h1>
    <p style={{ marginTop: "1rem", color: "var(--text-secondary)" }}>
      Modern web applications need to perform complex tasks without freezing the
      user interface. This project explores the various "Worker" technologies
      available in the browser.
    </p>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
        marginTop: "2rem",
      }}
    >
      <div className="card">
        <h3>Web Workers</h3>
        <p
          style={{
            marginTop: "0.5rem",
            color: "var(--text-secondary)",
            fontSize: "0.9rem",
          }}
        >
          Run heavy computations in a separate thread. Perfect for data
          processing, image manipulation, and complex calculations.
        </p>
      </div>

      <div className="card">
        <h3>Service Workers</h3>
        <p
          style={{
            marginTop: "0.5rem",
            color: "var(--text-secondary)",
            fontSize: "0.9rem",
          }}
        >
          Proxy network requests. Enable offline support, caching strategies,
          and background sync.
        </p>
      </div>

      <div className="card">
        <h3>Caching API</h3>
        <p
          style={{
            marginTop: "0.5rem",
            color: "var(--text-secondary)",
            fontSize: "0.9rem",
          }}
        >
          Programmatic control over network response storage. More powerful than
          standard HTTP caching.
        </p>
      </div>
    </div>
  </div>
);

export default Home;
