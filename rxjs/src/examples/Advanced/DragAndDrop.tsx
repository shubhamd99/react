import React, { useEffect, useRef, useState } from "react";
import { fromEvent } from "rxjs";
import { switchMap, takeUntil, map, tap } from "rxjs/operators";
import { Move, Layers } from "lucide-react";

const DragAndDrop: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    const mousedown$ = fromEvent<MouseEvent>(box, "mousedown");
    const mousemove$ = fromEvent<MouseEvent>(document, "mousemove");
    const mouseup$ = fromEvent<MouseEvent>(document, "mouseup");

    const drag$ = mousedown$.pipe(
      tap(() => setIsDragging(true)),
      switchMap((startEvent) => {
        const startX = startEvent.clientX - box.offsetLeft;
        const startY = startEvent.clientY - box.offsetTop;

        return mousemove$.pipe(
          map((moveEvent) => ({
            x: moveEvent.clientX - startX,
            y: moveEvent.clientY - startY,
          })),
          takeUntil(mouseup$.pipe(tap(() => setIsDragging(false)))),
        );
      }),
    );

    const subscription = drag$.subscribe((pos) => {
      // Bound to container
      const maxX = container.clientWidth - box.offsetWidth;
      const maxY = container.clientHeight - box.offsetHeight;

      setPosition({
        x: Math.max(0, Math.min(pos.x, maxX)),
        y: Math.max(0, Math.min(pos.y, maxY)),
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-bold mb-2">Complex Event Streams</h3>
        <p className="text-slate-400 mb-6">
          This advanced example combines <code>mousedown</code>,{" "}
          <code>mousemove</code>, and <code>mouseup</code> into a single
          coordinated stream using <code>switchMap</code> and{" "}
          <code>takeUntil</code>.
        </p>

        <div
          ref={containerRef}
          className="relative h-80 bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-800 overflow-hidden"
        >
          <div
            ref={boxRef}
            style={{
              left: position.x,
              top: position.y,
              cursor: isDragging ? "grabbing" : "grab",
            }}
            className={`absolute w-32 h-32 flex flex-col items-center justify-center rounded-2xl shadow-2xl transition-shadow select-none ${
              isDragging
                ? "bg-fuchsia-600 shadow-fuchsia-500/20 scale-105 z-10"
                : "bg-fuchsia-500 hover:bg-fuchsia-400"
            }`}
          >
            <Move className="text-white mb-2" size={32} />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">
              {isDragging ? "Dragging..." : "Drag Me"}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-[10px] font-mono text-slate-500 uppercase">
              <Layers size={12} />
              X: {Math.round(position.x)}px | Y: {Math.round(position.y)}px
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Declarative Drag Logic
        </h4>
        <pre className="text-sm">
          {`const drag$ = mousedown$.pipe(
  switchMap(start => mousemove$.pipe(
    map(move => calculatePosition(start, move)),
    takeUntil(mouseup$)
  ))
);`}
        </pre>
      </div>
    </div>
  );
};

export default DragAndDrop;
