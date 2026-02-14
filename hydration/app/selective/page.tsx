import { Suspense } from "react";
import HeavyComponent from "./components/HeavyComponent";
import Link from "next/link";

// A wrapper that delays the server rendering
async function DelayedWrapper({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return <>{children}</>;
}

export default function SelectiveHydrationPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-4">Selective Hydration</h1>

        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded text-blue-800">
          <p>
            <strong>Open your browser console!</strong> Then refresh the page.
            Try clicking one of the components immediately as they appear. React
            will prioritize hydrating the one you interact with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Suspense fallback={<SkeletonLoader name="Left" />}>
            <DelayedWrapper delay={2000}>
              <HeavyComponent name="Left Component" />
            </DelayedWrapper>
          </Suspense>

          <Suspense fallback={<SkeletonLoader name="Right" />}>
            <DelayedWrapper delay={2000}>
              <HeavyComponent name="Right Component" />
            </DelayedWrapper>
          </Suspense>

          <Suspense fallback={<SkeletonLoader name="Bottom" />}>
            <DelayedWrapper delay={2500}>
              <HeavyComponent name="Bottom Component" />
            </DelayedWrapper>
          </Suspense>
        </div>
      </div>
    </main>
  );
}

function SkeletonLoader({ name }: { name: string }) {
  return (
    <div className="p-6 bg-gray-200 border border-gray-300 rounded-lg animate-pulse h-40">
      <h3 className="text-xl font-bold text-gray-500 mb-2">
        Loading {name}...
      </h3>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  );
}
