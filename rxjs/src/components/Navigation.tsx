import React from "react";
import type { ExampleCategory, RxJSExample } from "../types";
import { Beaker, BookOpen, Zap, MousePointer2 } from "lucide-react";

interface NavigationProps {
  examples: RxJSExample[];
  activeExample: string;
  onSelect: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  examples,
  activeExample,
  onSelect,
}) => {
  const categories: ExampleCategory[] = ["Basic", "Intermediate", "Advanced"];

  return (
    <nav className="w-80 h-screen sticky top-0 bg-slate-900 border-r border-slate-800 p-6 overflow-y-auto">
      <div className="flex items-center gap-3 mb-8">
        <Zap className="text-fuchsia-500 w-8 h-8" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
          RxJS Lab
        </h1>
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              {category === "Basic" && <MousePointer2 className="w-3 h-3" />}
              {category === "Intermediate" && <Beaker className="w-3 h-3" />}
              {category === "Advanced" && <BookOpen className="w-3 h-3" />}
              {category}
            </h2>
            <div className="space-y-1">
              {examples
                .filter((ex) => ex.category === category)
                .map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => onSelect(ex.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeExample === ex.id
                        ? "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    {ex.title}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
