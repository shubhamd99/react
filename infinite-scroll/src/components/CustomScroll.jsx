import { useState, useEffect, useCallback } from "react";

const CustomScroll = () => {
  const [items, setItems] = useState(
    Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`),
  );
  const [loading, setLoading] = useState(false);

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

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 <
        document.documentElement.scrollHeight ||
      loading
    ) {
      return;
    }
    loadMoreItems();
  }, [loading, loadMoreItems]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <h2>Custom Scroll Listener</h2>
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
      {loading && <p>Loading more items...</p>}
    </div>
  );
};

export default CustomScroll;
