async function getServerProfile() {
  // Runs on the server. No browser JavaScript is needed for this data read.
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    name: 'Server-rendered profile',
    role: 'React Server Component',
    permissions: ['Can read server data', 'Ships no component JS'],
  };
}

export async function ServerProfile() {
  const profile = await getServerProfile();

  return (
    <article className="demo-card rsc-card">
      <p className="eyebrow">RSC code example</p>
      <h2>{profile.name}</h2>
      <p>
        This async component runs on the server, fetches data there, and sends
        rendered output to the client.
      </p>
      <code>{'async function ServerProfile()'}</code>
      <ul>
        {profile.permissions.map((permission) => (
          <li key={permission}>{permission}</li>
        ))}
      </ul>
    </article>
  );
}
