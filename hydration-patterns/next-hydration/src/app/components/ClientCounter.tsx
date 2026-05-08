'use client';

import { useState } from 'react';

export function ClientCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <span>Hydrated counter: {count}</span>
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Add
      </button>
    </div>
  );
}
