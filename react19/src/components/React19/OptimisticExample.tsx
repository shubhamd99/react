import React, { useState, useOptimistic } from "react";

// ==========================================
// REACT 19 FEATURE: USEOPTIMISTIC
// ==========================================
// What are Optimistic Updates?
// Imagine "liking" a tweet. If the UI waits for the server response before
// turning the heart red, the app feels slow and laggy.
// "Optimistic updating" means turning the heart red instantly assuming the
// server response will succeed, making the app feel blazing fast!
//
// What makes useOptimistic special?
// Previously, you had to manually write tricky logic to revert the UI if the
// server request failed. useOptimistic handles all the heavy lifting automatically.
// It gives you a temporary "optimistic state" while the server works, and safely
// snaps back to the real state when it completes. If it errors out,
// the optimistic state just perfectly rolls back on its own!
//
// In this example:
// 1. Instantly populate the UI using addOptimisticItem with temporary text.
// 2. Perform the heavy task in the background.
// 3. Once complete, calling setItems updates the true state and useOptimistic
//    instantly throws away the fake data syncing with the true data.
// 4. If it errors, doing nothing causes useOptimistic to drop the temporary state!
// ==========================================

const addItemToServer = async (item: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return item;
};

export default function OptimisticExample() {
  const [items, setItems] = useState<string[]>(["Apple", "Banana"]);

  const [optimisticItems, addOptimisticItem] = useOptimistic(
    items,
    (state, newItem: string) => [...state, `${newItem} (Saving...)`],
  );

  const formAction = async (formData: FormData) => {
    const newItem = formData.get("item") as string;
    if (!newItem) return;

    addOptimisticItem(newItem);

    try {
      const addedItem = await addItemToServer(newItem);
      setItems((prev) => [...prev, addedItem]);
    } catch (e) {
      console.error("Save failed. Optimistic update will revert.");
    }
  };

  return (
    <div className="example-box">
      <h3>React 19: useOptimistic</h3>
      <p>
        Items appear instantly with "(Saving...)" while the network request is
        pending in the background.
      </p>

      <form action={formAction} style={{ marginBottom: "10px" }}>
        <input type="text" name="item" placeholder="Add fruit..." />
        <button type="submit" style={{ marginLeft: "5px" }}>
          Add Optimistically
        </button>
      </form>

      <ul
        style={{
          background: "#f9f9f9",
          padding: "10px 20px",
          borderRadius: "4px",
        }}
      >
        {optimisticItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
