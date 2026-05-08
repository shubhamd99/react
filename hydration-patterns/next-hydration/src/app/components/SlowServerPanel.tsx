async function getServerData() {
  // This delay makes Suspense streaming visible in development.
  await new Promise((resolve) => setTimeout(resolve, 1800));

  return ['HTML shell streamed first', 'Slow server data arrived later'];
}

export async function SlowServerPanel() {
  const notes = await getServerData();

  return (
    <article className="demo-card success-card">
      <p className="eyebrow">Streaming SSR</p>
      <h2>Slow server component</h2>
      <ul>
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </article>
  );
}
