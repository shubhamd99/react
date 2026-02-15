import { useState, useEffect } from "react";
import "./App.css";
import { loadWasm } from "./utils/wasmLoader";

function App() {
  const [wasmInstance, setWasmInstance] = useState<any>(null);
  const [numA, setNumA] = useState<number>(5);
  const [numB, setNumB] = useState<number>(3);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load the WASM module from the public directory
    // Note: math.wasm must be compiled and placed in /public/math.wasm
    loadWasm("/math.wasm")
      .then((instance) => {
        setWasmInstance(instance);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load WASM:", err);
        setError(
          "WASM module not found. Did you compile math.cpp to public/math.wasm?",
        );
        setLoading(false);
      });
  }, []);

  const handleAdd = () => {
    if (wasmInstance && wasmInstance.add) {
      setResult(wasmInstance.add(numA, numB));
    }
  };

  const handleMultiply = () => {
    if (wasmInstance && wasmInstance.multiply) {
      setResult(wasmInstance.multiply(numA, numB));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Learn WebAssembly with C++</h1>

        <div className="card">
          {loading ? (
            <p>Loading WebAssembly module...</p>
          ) : error ? (
            <div className="error">
              <p>{error}</p>
              <pre>
                emcc wasm/math.cpp -O3 -s WASM=1 -o public/math.wasm --no-entry
              </pre>
            </div>
          ) : (
            <div className="controls">
              <div className="inputs">
                <input
                  type="number"
                  value={numA}
                  onChange={(e) => setNumA(parseInt(e.target.value) || 0)}
                />
                <span> + / * </span>
                <input
                  type="number"
                  value={numB}
                  onChange={(e) => setNumB(parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="buttons">
                <button onClick={handleAdd}>Add (C++)</button>
                <button onClick={handleMultiply}>Multiply (C++)</button>
              </div>

              {result !== null && (
                <div className="result">
                  <h2>Result: {result}</h2>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="instructions">
          <h3>How it works:</h3>
          <ol>
            <li>
              Code is written in C++ (<code>wasm/math.cpp</code>).
            </li>
            <li>
              Compiled to WebAssembly (<code>.wasm</code>).
            </li>
            <li>
              React fetches and instantiates the <code>.wasm</code> file.
            </li>
            <li>JavaScript calls functions directly from the Wasm instance.</li>
          </ol>
        </div>
      </header>
    </div>
  );
}

export default App;
