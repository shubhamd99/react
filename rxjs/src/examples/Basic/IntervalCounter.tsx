import React, { useEffect, useState } from "react";
import { interval } from "rxjs";
import { Play, Pause, RefreshCw } from "lucide-react";

const IntervalCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const subscription = interval(1000).subscribe(() => {
      setCount((prev) => prev + 1);
    });

    return () => subscription.unsubscribe();
  }, [isActive]);

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-bold mb-2">Observable Interval</h3>
        <p className="text-slate-400 mb-6">
          This example uses the <code>interval(1000)</code> observable to emit a
          value every second. It demonstrates basic subscription and
          unsubscription in a React <code>useEffect</code> hook.
        </p>

        <div className="flex flex-col items-center justify-center p-8 bg-slate-900/50 rounded-xl border border-slate-800">
          <div className="text-6xl font-black text-fuchsia-500 mb-8 tabular-nums">
            {count}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`btn ${isActive ? "bg-slate-700 text-white" : "btn-primary"}`}
            >
              {isActive ? <Pause /> : <Play />}
              {isActive ? "Pause" : "Start"}
            </button>
            <button
              onClick={() => {
                setIsActive(false);
                setCount(0);
              }}
              className="btn bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              <RefreshCw />
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Code Snippet
        </h4>
        <pre className="text-sm">
          {`const subscription = interval(1000).subscribe(() => {
  setCount(prev => prev + 1);
});

// Always unsubscribe!
return () => subscription.unsubscribe();`}
        </pre>
      </div>
    </div>
  );
};

export default IntervalCounter;
