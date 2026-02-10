import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 relative overflow-hidden ring-1 ring-slate-900/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none" />

        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Mastering{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
              TanStack Query
            </span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
            Welcome to the ultimate interactive guide. Explore production-ready
            action interactions, instant caching, and state management in React
            applications.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/basic"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Start Learning <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://tanstack.com/query/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-700 border border-slate-200 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
            >
              Official Docs
            </a>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 ring-1 ring-slate-900/5 hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-violet-500 rounded-full" />
            Curriculum
          </h2>
          <ul className="space-y-4">
            {[
              "Basic Data Fetching & Caching Strategy",
              "Pagination & Infinite Scrolling Patterns",
              "Optimistic Updates & Instant UI",
              "Robust Mutations (Create/Update/Delete)",
              "Automatic Query Invalidation & Refetching",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <div className="w-6 h-6 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-violet-100 transition-colors">
                  <span className="text-xs font-bold">{i + 1}</span>
                </div>
                <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-lg text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-violet-500 rounded-full blur-[80px] opacity-20" />
          <div className="relative z-10">
            <p className="text-violet-200 font-semibold tracking-wider uppercase text-xs mb-3">
              Pro Tip
            </p>
            <h3 className="text-2xl font-bold mb-4">Why TanStack Query?</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              It replaces boilerplate code for server state. No more useEffects
              caching.
            </p>
            <div className="flex gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-mono font-medium">
                staleTime
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-mono font-medium">
                cacheTime
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-mono font-medium">
                prefetching
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
