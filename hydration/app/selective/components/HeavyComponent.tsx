"use client";

import { useState, useEffect } from "react";

export default function HeavyComponent({ name }: { name: string }) {
  const [count, setCount] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // This logs when the component actually hydrates
    console.log(`💧 ${name} Hydrated!`);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, [name]);

  const handleClick = () => {
    console.log(`👆 Clicked ${name}`);
    setCount((c) => c + 1);
  };

  return (
    <div
      className={`p-6 border rounded-lg shadow-sm transition-colors cursor-pointer ${
        hydrated
          ? "bg-white border-blue-500 hover:bg-blue-50"
          : "bg-gray-50 border-gray-200"
      }`}
      onClick={handleClick}
    >
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="mb-4 text-sm text-gray-600">
        Status:{" "}
        <span
          className={
            hydrated ? "text-green-600 font-bold" : "text-orange-500 font-bold"
          }
        >
          {hydrated ? "Hydrated" : "Pending Hydration"}
        </span>
      </p>

      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:scale-95 transition">
        Clicks: {count}
      </button>

      <div className="mt-4 text-xs text-gray-400">
        {/* Render a bunch of hidden elements to make the tree slightly heavier */}
        {Array.from({ length: 500 }).map((_, i) => (
          <span key={i} className="hidden">
            .
          </span>
        ))}
      </div>
    </div>
  );
}
