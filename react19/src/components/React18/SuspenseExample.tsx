import React, { Suspense, useId } from "react";

// ==========================================
// REACT 18 FEATURE: SUSPENSE & USEID
// ==========================================
// What is Suspense?
// Suspense lets you declaratively "wait" for something before rendering.
// This "something" could be code splitting (React.lazy component loading)
// or async data fetching. While it waits, Suspense displays the 'fallback' UI.
// In the example below, Suspense attempts to render <LazyComponent />.
// Because it is loaded with React.lazy, it throws a Promise under the hood.
// Suspense catches that Promise and displays the fallback instead.
// Once the Promise resolves, the child component appears!
//
// What is useId?
// useId is a hook that generates completely unique, stable IDs (like ":r1:").
// When building apps that render on the server (SSR), using `Math.random()`
// for IDs causes bugs because the server and client will generate different
// numbers. useId guarantees both sides generate the exact same ID!
// We use useId below to securely link the <label> to the <input>.
// ==========================================

const LazyComponent = React.lazy(
  () =>
    new Promise<{ default: React.ComponentType<any> }>((resolve) => {
      setTimeout(() => {
        resolve({
          default: () => <div>✅ Lazy Component Loaded Successfully!</div>,
        });
      }, 2000);
    }),
);

export default function SuspenseExample() {
  const ariaId = useId();

  return (
    <div className="example-box">
      <h3>React 18: Suspense & useId</h3>

      <div style={{ marginBottom: "15px" }}>
        <p>
          <strong>useId:</strong>
        </p>
        <label htmlFor={ariaId}>Accessible Label: </label>
        <input
          id={ariaId}
          type="text"
          placeholder="I have a unique generated ID"
        />
      </div>

      <div>
        <p>
          <strong>Suspense:</strong>
        </p>

        <Suspense
          fallback={
            <div style={{ color: "red" }}>
              ⏳ Loading lazy content (takes 2s)...
            </div>
          }
        >
          <LazyComponent />
        </Suspense>
      </div>
    </div>
  );
}
