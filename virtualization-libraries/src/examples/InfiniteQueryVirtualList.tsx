import { useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { fetchMockPage } from '../data';

export function InfiniteQueryVirtualList() {
  const parentRef = useRef<HTMLDivElement>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['mock-api-tasks'],
    queryFn: ({ pageParam }) => fetchMockPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const items = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data],
  );

  // Add one extra row for the loading/end message.
  const rowCount = hasNextPage ? items.length + 1 : items.length;

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 66,
    overscan: 6,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastVirtualItem = virtualItems[virtualItems.length - 1];

  useEffect(() => {
    const reachedLastLoadedRow =
      lastVirtualItem && lastVirtualItem.index >= items.length - 1;

    if (reachedLastLoadedRow && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    items.length,
    lastVirtualItem,
  ]);

  return (
    <section className="demo-panel" id="infinite-query">
      <div className="demo-header">
        <div>
          <p className="eyebrow">@tanstack/react-query + useInfiniteQuery</p>
          <h2>API pages rendered as a virtual list</h2>
        </div>
        <span>{items.length} loaded</span>
      </div>

      {error ? <p className="error-text">Could not load mock data.</p> : null}

      <div className="scroll-box" ref={parentRef}>
        <div
          className="virtual-canvas"
          style={{ height: rowVirtualizer.getTotalSize() }}
        >
          {isPending ? (
            <p className="loading-text">Loading first API page...</p>
          ) : (
            virtualItems.map((virtualRow) => {
              const item = items[virtualRow.index];

              return (
                <div
                  className="list-row api-row"
                  key={item?.id ?? 'loader'}
                  style={{
                    height: virtualRow.size,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {item ? (
                    <>
                      <strong>{item.title}</strong>
                      <span>
                        {item.owner} | {item.priority} priority
                      </span>
                    </>
                  ) : (
                    <strong>
                      {isFetchingNextPage ? 'Loading more...' : 'All pages loaded'}
                    </strong>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
