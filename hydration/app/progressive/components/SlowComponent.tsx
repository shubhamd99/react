export default async function SlowComponent() {
  // Simulate a slow network request
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="p-6 bg-yellow-100 border border-yellow-300 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-yellow-800 mb-2">
        Slow Component Loaded! 🐢
      </h3>
      <p className="text-yellow-700">
        This component took 3 seconds to load on the server. Use
        &quot;Network&quot; tab in dev tools to see how the HTML stream arrives.
      </p>
    </div>
  );
}
