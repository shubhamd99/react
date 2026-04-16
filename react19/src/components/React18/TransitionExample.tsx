import React, { useState, useTransition, useDeferredValue } from "react";

// ==========================================
// REACT 18 FEATURE: CONCURRENT FEATURES
// ==========================================
// What is Concurrent Rendering?
// React 18 can pause, resume, or even abandon rendering operations in the background.
// This ensures that "heavy" renders don't freeze the entire webpage,
// allowing the user to keep interacting (like typing in an input).
//
// The two main hooks for this are:
// 1. useTransition: Used to wrap state-updating code, marking it as "low priority".
//    startTransition tells React: "Don't freeze the typing animation for this!
//    Do this in the background when you have free time."
//    isPending is a boolean telling us if the low-priority transition is currently running.
// 2. useDeferredValue: Used to receive a "lagging" version of a fast-changing state.
//    deferredInput will safely lag behind until React finishes the more urgent updates.
// ==========================================

export default function TransitionExample() {
  const [input, setInput] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const deferredInput = useDeferredValue(input);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setInput(val);

    startTransition(() => {
      const newList = [];
      for (let i = 0; i < 5000; i++) {
        newList.push(val);
      }
      setList(newList);
    });
  };

  return (
    <div className="example-box">
      <h3>React 18: useTransition & useDeferredValue</h3>
      <p>
        Typing below remains responsive despite generating a 5,000-item list on
        every stroke.
      </p>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type to filter..."
      />
      {isPending && (
        <span style={{ marginLeft: "10px" }}>⏳ Processing heavy list...</span>
      )}

      <p>
        Deferred Query: <strong>{deferredInput}</strong>
      </p>

      <div
        style={{
          maxHeight: "100px",
          overflowY: "auto",
          background: "#f5f5f5",
          padding: "5px",
        }}
      >
        {list.slice(0, 10).map((item, index) => (
          <div key={index}>Heavy Item: {item}</div>
        ))}
        {list.length > 10 && <div>...and {list.length - 10} more.</div>}
      </div>
    </div>
  );
}
