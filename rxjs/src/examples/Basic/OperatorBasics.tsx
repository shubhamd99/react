import React, { useState } from "react";
import { from } from "rxjs";
import { map, filter, take, toArray } from "rxjs/operators";
import { Filter, ChevronRight } from "lucide-react";

const OperatorBasics: React.FC = () => {
  const [output, setOutput] = useState<number[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const runExample = () => {
    setOutput([]);
    setLogs(["Starting stream..."]);

    const numbers$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    numbers$
      .pipe(
        filter((x) => x % 2 === 0),
        map((x) => x * 10),
        take(3),
        toArray(),
      )
      .subscribe({
        next: (val) => {
          setOutput(val);
          setLogs((prev) => [...prev, `Emitted: ${JSON.stringify(val)}`]);
        },
        complete: () => setLogs((prev) => [...prev, "Stream Completed!"]),
      });
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-bold mb-2">Pipeable Operators</h3>
        <p className="text-slate-400 mb-6">
          Operators are the bread and butter of RxJS. This example shows{" "}
          <code>filter</code>, <code>map</code>, and <code>take</code> in a
          single pipe.
        </p>

        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <button onClick={runExample} className="btn btn-primary">
              <Filter className="w-4 h-4" />
              Run Pipeline (Even =&gt; *10 =&gt; Take 3)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">
                Input Data
              </h4>
              <div className="flex gap-2 text-slate-400">
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              </div>
            </div>

            <div className="bg-fuchsia-500/10 p-4 rounded-lg border border-fuchsia-500/20">
              <h4 className="text-xs font-bold text-fuchsia-500 uppercase mb-3">
                Resulting Array
              </h4>
              <div className="text-xl font-mono text-fuchsia-400">
                {output.length > 0 ? JSON.stringify(output) : "Ready..."}
              </div>
            </div>
          </div>

          <div className="bg-black/50 p-4 rounded-lg font-mono text-sm border border-slate-800">
            <h4 className="text-xs font-bold text-slate-600 uppercase mb-2">
              Streaming Logs
            </h4>
            <div className="space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-500">
                  <ChevronRight className="w-3 h-3 text-fuchsia-600" />
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Code Pipeline
        </h4>
        <pre className="text-sm">
          {`from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .pipe(
    filter(x => x % 2 === 0), // Skip odd
    map(x => x * 10),         // Multiply by 10
    take(3),                 // Only first 3
    toArray()                // Collect into array
  ).subscribe(result => setOutput(result));`}
        </pre>
      </div>
    </div>
  );
};

export default OperatorBasics;
