"use client";

import { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // This effect runs only after hydration
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
    console.log("Counter component hydrated");
  }, []);

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white text-black max-w-sm">
      <h2 className="text-xl font-bold mb-4">Interactive Counter</h2>

      <div className="mb-4">
        <p className="text-gray-600">
          Hydration Status:{" "}
          <span
            className={
              isHydrated ? "text-green-600 font-bold" : "text-red-600 font-bold"
            }
          >
            {isHydrated ? "Hydrated ✅" : "Server Rendered ⏳"}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount((prev) => prev - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          disabled={!isHydrated}
        >
          -
        </button>
        <span className="text-2xl font-mono min-w-[3ch] text-center">
          {count}
        </span>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          disabled={!isHydrated}
        >
          +
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        This component is rendered on the server with initial state (0). Once JS
        loads, React &quot;hydrates&quot; it, making the buttons interactive.
      </p>
    </div>
  );
}
