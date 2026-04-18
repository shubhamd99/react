import React from "react";
import "./App.css";

// React 18 Examples
import BatchingExample from "./components/React18/BatchingExample";
import TransitionExample from "./components/React18/TransitionExample";
import SuspenseExample from "./components/React18/SuspenseExample";

// React 19 Examples
import ActionFormExample from "./components/React19/ActionFormExample";
import OptimisticExample from "./components/React19/OptimisticExample";
import RefAndContextExample from "./components/React19/RefAndContextExample";
import MetadataExample from "./components/React19/MetadataExample";
import UseEffectEventExample from "./components/React19/UseEffectEventExample";
import AsyncReact19Example from "./components/React19/AsyncReact19Example";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>React 18 & 19 Feature Playground</h1>
        <p>Interactive examples demonstrating new features.</p>
      </header>

      <main className="container">
        <section className="section react-18">
          <h2>⚛️ React 18 Features</h2>
          <BatchingExample />
          <TransitionExample />
          <SuspenseExample />
        </section>

        <section className="section react-19">
          <h2>⚛️ React 19 Features</h2>
          <ActionFormExample />
          <OptimisticExample />
          <RefAndContextExample />
          <MetadataExample />
          <UseEffectEventExample />
          <AsyncReact19Example />
        </section>
      </main>
    </div>
  );
}

export default App;
