import React, { useState } from "react";
import Navigation from "./components/Navigation";
import { EXAMPLES } from "./examples";
import { ChevronRight } from "lucide-react";

const App: React.FC = () => {
  const [activeId, setActiveId] = useState(EXAMPLES[0].id);
  const activeExample =
    EXAMPLES.find((ex) => ex.id === activeId) || EXAMPLES[0];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Navigation
        examples={EXAMPLES}
        activeExample={activeId}
        onSelect={setActiveId}
      />

      <main className="flex-1 p-10 max-w-5xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <span>Examples</span>
            <ChevronRight size={14} />
            <span className="text-fuchsia-400 font-medium">
              {activeExample.category}
            </span>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-2">
            {activeExample.title}
          </h2>
          <p className="text-slate-400 text-lg">{activeExample.description}</p>
        </header>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <activeExample.component />
        </section>
      </main>
    </div>
  );
};

export default App;
