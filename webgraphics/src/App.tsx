import React from "react";
import WebGLTriangle from "./components/examples/WebGL/WebGLTriangle";
import WebGPUTriangle from "./components/examples/WebGPU/WebGPUTriangle";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>Web Graphics Learning Journey</h1>
        <p>Exploring WebGL and WebGPU with React</p>
      </header>

      <main className="examples-grid">
        <section className="example-card">
          <div className="card-header">
            <span className="badge webgl">WebGL 1.0</span>
          </div>
          <WebGLTriangle />
        </section>

        <section className="example-card">
          <div className="card-header">
            <span className="badge webgpu">WebGPU</span>
          </div>
          <WebGPUTriangle />
        </section>
      </main>

      <footer className="footer">
        <p>Built with React + Vite + Web APIs</p>
      </footer>
    </div>
  );
};

export default App;
