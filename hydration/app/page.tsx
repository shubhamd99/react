import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <h1 className="text-5xl font-extrabold mb-8 tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        React Hydration Explorer
      </h1>

      <p className="text-xl text-gray-400 mb-12 max-w-2xl text-center">
        Explore the concepts of Hydration, Progressive Rendering, and Selective
        Hydration using Next.js App Router and React Suspense.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card
          href="/basic"
          title="Basic Hydration"
          description="Understand how React attaches event listeners to server-rendered HTML."
          icon="💧"
        />
        <Card
          href="/progressive"
          title="Progressive Hydration"
          description="See how Streaming SSR allows parts of the page to load progressively."
          icon="🌊"
        />
        <Card
          href="/selective"
          title="Selective Hydration"
          description="Interact with components while others are still loading to prioritize hydration."
          icon="⚡"
        />
      </div>

      <footer className="mt-16 text-gray-600 text-sm">
        Check the <code>concepts.md</code> file for detailed explanations.
      </footer>
    </main>
  );
}

function Card({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group block p-6 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-750 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h2 className="text-2xl font-semibold mb-3 text-white group-hover:text-blue-400">
        {title} &rarr;
      </h2>
      <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed">
        {description}
      </p>
    </Link>
  );
}
