import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, Database, List, Plus, Layers, RefreshCw } from "lucide-react";
import { cn } from "../utils/cn";

const navItems = [
  { icon: Home, label: "Home", to: "/" },
  { icon: List, label: "Basic Query", to: "/basic" },
  { icon: Database, label: "Pagination", to: "/pagination" },
  { icon: Layers, label: "Infinite Scroll", to: "/infinite-scroll" },
  { icon: Plus, label: "Mutations", to: "/mutations" },
  { icon: RefreshCw, label: "Optimistic Updates", to: "/optimistic" },
];

export function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50/50 font-sans text-slate-900">
      <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-sm z-20 flex flex-col transition-all duration-300">
        <div className="p-6 border-b border-slate-100/60">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <span className="text-white text-lg font-bold">TS</span>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              Query
            </span>
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3">
          <nav className="space-y-1">
            <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Examples
            </div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group relative overflow-hidden",
                    isActive
                      ? "bg-violet-50 text-violet-700 shadow-sm ring-1 ring-violet-200/50"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-violet-500 rounded-r-full" />
                  )}
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                      isActive
                        ? "text-violet-600"
                        : "text-slate-400 group-hover:text-slate-600",
                    )}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="px-4 py-3 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-200">
            <p className="text-xs font-medium text-slate-300 mb-1">
              Current Version
            </p>
            <p className="text-sm font-bold">v5.0.0</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-gray-50/50 scroll-smooth">
        <div className="h-full w-full max-w-7xl mx-auto px-8 py-10">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
