import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { largeList } from '../data';

export function TanStackVirtualList() {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: largeList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 8,
  });

  return (
    <section className="demo-panel" id="tanstack-virtual">
      <div className="demo-header">
        <div>
          <p className="eyebrow">@tanstack/react-virtual</p>
          <h2>Large list with fixed row height</h2>
        </div>
        <span>{largeList.length.toLocaleString()} rows</span>
      </div>

      <div className="scroll-box" ref={parentRef}>
        <div
          className="virtual-canvas"
          style={{ height: rowVirtualizer.getTotalSize() }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const item = largeList[virtualRow.index];

            return (
              <div
                className="list-row"
                key={item.id}
                style={{
                  height: virtualRow.size,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <strong>{item.title}</strong>
                <span>{item.details}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
