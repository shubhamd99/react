import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteScrollComponent = () => {
  const [items, setItems] = useState(
    Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`),
  );
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    if (items.length >= 100) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...Array.from(
          { length: 20 },
          (_, i) => `Item ${prevItems.length + i + 1}`,
        ),
      ]);
    }, 1500);
  };

  return (
    <div>
      <h2>react-infinite-scroll-component</h2>
      <div
        id="scrollableDiv"
        style={{
          height: 500,
          overflow: "auto",
          border: "1px solid #ccc",
        }}
      >
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget="scrollableDiv"
        >
          {items.map((i, index) => (
            <div
              style={{ padding: 20, borderBottom: "1px solid #ccc" }}
              key={index}
            >
              {i}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default InfiniteScrollComponent;
