import React, { useState } from "react";

// ==========================================
// REACT 18 FEATURE: AUTOMATIC BATCHING
// ==========================================
// What is Batching?
// Batching is when React groups multiple state updates into a single re-render
// for better performance.
//
// What changed in React 18?
// In React 17 and earlier, React only batched updates during browser events (like clicks).
// If you updated state inside a Promise, setTimeout, or native event handler,
// React would NOT batch them. It would re-render the component for EVERY single state update.
//
// In React 18, Automatic Batching is turned on everywhere by default!
// Now, updates inside asynchronous operations (like the setTimeout below)
// are intelligently grouped into 1 single render pass.
//
// In the example below, clicking the button triggers a setTimeout. Inside it,
// three states are updated sequentially. In React 17 this caused 3 renders.
// In React 18, React waits until all code in the callback finishes executing
// before updating the DOM, resulting in only 1 batched render.
// ==========================================

export default function BatchingExample() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const [renders, setRenders] = useState(0);

  const handleClick = () => {
    setTimeout(() => {
      setCount((c) => c + 1);
      setFlag((f) => !f);
      setRenders((r) => r + 1);
    }, 100);
  };

  return (
    <div className="example-box">
      <h3>React 18: Automatic Batching</h3>
      <p>
        Notice how clicking the button updates multiple states but results in a
        single batched render pass.
      </p>
      <button onClick={handleClick}>
        Increment count ({count}) & Toggle flag ({flag.toString()})
      </button>
      <p style={{ marginTop: "10px" }}>Total grouped updates: {renders}</p>
    </div>
  );
}
