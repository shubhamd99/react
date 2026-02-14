import { Suspense } from "react";
import SlowComponent from "./components/SlowComponent";
import Link from "next/link";

export default function ProgressiveHydrationPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-4">
          Progressive Hydration (Streaming)
        </h1>

        <p className="mb-6 text-gray-700">
          This page demonstrates <strong>Streaming SSR</strong>. The static
          parts of the page load immediately, while the &quot;Slow
          Component&quot; is wrapped in a <code>Suspense</code> boundary.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-green-100 border border-green-300 rounded-lg">
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Fast Component 🐇
            </h3>
            <p className="text-green-700">
              I loaded instantly! The shell of the page is sent immediately by
              the server.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="p-6 bg-gray-200 border border-gray-300 rounded-lg animate-pulse">
                <h3 className="text-xl font-bold text-gray-500 mb-2">
                  Loading...
                </h3>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            }
          >
            <SlowComponent />
          </Suspense>
        </div>

        <div className="mt-8 p-4 bg-white border rounded shadow-sm">
          <h4 className="font-bold mb-2">
            Why is this &quot;Progressive&quot;?
          </h4>
          <p className="text-sm">
            React sends the HTML for the &quot;Fast Component&quot; first. The
            connection stays open. Once the &quot;Slow Component&quot; finishes
            rendering on the server (after 3s), its HTML is streamed and
            inserted into the DOM, replacing the fallback. This improves
            <strong> First Contentful Paint (FCP)</strong>.
          </p>
        </div>
      </div>
    </main>
  );
}
