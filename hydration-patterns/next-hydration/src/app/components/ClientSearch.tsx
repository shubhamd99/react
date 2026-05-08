'use client';

import { useState } from 'react';

const topics = ['SSR', 'Streaming', 'Suspense', 'Selective hydration'];

export function ClientSearch() {
  const [query, setQuery] = useState('');

  const filteredTopics = topics.filter((topic) =>
    topic.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="search-box">
      <input
        aria-label="Filter hydration topics"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Filter topics"
        value={query}
      />
      <ul>
        {filteredTopics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </div>
  );
}
