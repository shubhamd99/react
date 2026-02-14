import Counter from "./components/Counter";
import Link from "next/link";

export default function BasicHydrationPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-2">Basic Hydration</h1>
          <p className="text-gray-700">
            This page demonstrates the standard hydration process. The server
            sends HTML with the initial state, and the browser attaches event
            listeners to make it interactive.
          </p>
        </div>

        <section className="bg-gray-100 p-8 rounded-xl border border-gray-200">
          <Counter />
        </section>

        <section className="mt-8 prose">
          <h3>How to verify:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Refresh this page.</li>
            <li>
              Notice the &quot;Hydration Status&quot; text. It might flicker
              from &quot;Server Rendered&quot; to &quot;Hydrated&quot; very
              quickly.
            </li>
            <li>
              Disable JavaScript in your browser dev tools and refresh. You will
              see the component, but the status will stay &quot;Server
              Rendered&quot; and buttons won&apos;t work.
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
