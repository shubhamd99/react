import { useState, useEffect, useRef, useCallback } from "react";

const IntersectionObserverScroll = () => {
  const [items, setItems] = useState(
    Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`),
  );
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const loadMoreItems = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...Array.from(
          { length: 20 },
          (_, i) => `Item ${prevItems.length + i + 1}`,
        ),
      ]);
      setLoading(false);
    }, 1000);
  }, [loading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreItems();
      }
    });

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMoreItems]);

  return (
    <div>
      <h2>Intersection Observer Scroll</h2>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            style={{ padding: "20px", borderBottom: "1px solid #ccc" }}
          >
            {item}
          </li>
        ))}
      </ul>
      <div ref={loader} style={{ padding: "20px", textAlign: "center" }}>
        {loading ? (
          <p>Loading more items...</p>
        ) : (
          <p>Scroll down to load more</p>
        )}
      </div>
    </div>
  );
};

export default IntersectionObserverScroll;
