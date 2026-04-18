import React, { Suspense, useState, useTransition, use } from "react";

// Optional ViewTransition import for experimental builds
const ViewTransition =
  (React as any).ViewTransition || (({ children }: any) => <>{children}</>);

type ImageData = {
  id: number;
  url: string;
  title: string;
};

// Simulated API fetch
async function fetchImage(id: number): Promise<ImageData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  // Use a stable dummy image generator
  return {
    id,
    url: `https://picsum.photos/seed/react19async${id}/400/300`,
    title: `Amazing View ${id}`,
  };
}

// Sub-component that unwraps the promise using `use()`
function ImageDisplay({
  imageDataPromise,
  imageId,
}: {
  imageDataPromise: Promise<ImageData>;
  imageId: number;
}) {
  // [NEW IN REACT 19] - The `use()` Hook:
  // Unlike `useEffect` which fetches data AFTER render, `use()` lets you unwrap Promises natively DURING render!
  // If the promise is unresolved, `use()` forces the component to "suspend" (pause rendering).
  // Once the promise resolves, React automatically resumes rendering with the unboxed data.
  const image = use(imageDataPromise);

  return (
    <div style={{ marginTop: "20px" }}>
      <ViewTransition enter="fade-in" exit="fade-out">
        <h4 style={{ margin: "0 0 10px 0" }}>{image.title}</h4>
      </ViewTransition>
      <ViewTransition key={imageId} enter="slide-up" exit="fade-out">
        <img
          src={image.url}
          alt={image.title}
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "300px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </ViewTransition>
    </div>
  );
}

// Skeleton shown during initial Suspense
function ImageSkeleton({ imageId }: { imageId: number }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <ViewTransition key={imageId} enter="fade-in" exit="fade-out">
        <h4 style={{ margin: "0 0 10px 0" }}>Loading Image {imageId}...</h4>
      </ViewTransition>
      <ViewTransition key={imageId} enter="slide-up" exit="fade-out">
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "300px",
            backgroundColor: "#eee",
            borderRadius: "8px",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
      </ViewTransition>
    </div>
  );
}

export default function AsyncReact19Example() {
  const [imageId, setImageId] = useState(1);
  const [imageDataPromise, setImageDataPromise] = useState<Promise<ImageData>>(
    () => fetchImage(imageId),
  );
  const [isPending, startTransition] = useTransition();

  const handleNextImage = () => {
    // [NEW PARADIGM IN REACT 18/19] - `startTransition`:
    // By wrapping state updates (like triggering a new fetch promise) in `startTransition`, we tell React:
    // "This is a non-urgent UI update. Do NOT immediately drop back to the <Suspense> skeleton loader!"
    // Instead, React keeps showing the current image and sets `isPending` to true, allowing us to build
    // a much smoother user experience (like dimming the button or showing a spinner) until `use()` has the new data.
    startTransition(async () => {
      const nextId = imageId + 1;
      setImageId(nextId);
      setImageDataPromise(fetchImage(nextId));
    });
  };

  return (
    <div className="example-box">
      <h3>
        Native Async with <code>use()</code> & <code>useTransition</code>
      </h3>
      <p>
        Demonstrates React 19 unwrapping promises during render. When changing
        images, <code>useTransition</code> keeps the old image visible until the
        new one resolves, preventing UI thrashing!
      </p>

      <div
        style={{
          padding: "10px",
          background: "#f8f9fa",
          borderRadius: "8px",
          display: "inline-block",
          minWidth: "300px",
        }}
      >
        <ViewTransition update="button-pulse">
          <button
            onClick={handleNextImage}
            disabled={isPending}
            style={{
              opacity: isPending ? 0.7 : 1,
              cursor: isPending ? "not-allowed" : "pointer",
            }}
          >
            {isPending ? "Loading Next..." : "Next Image"}
          </button>
        </ViewTransition>

        {/* [NEW PARADIGM IN REACT 18/19] - <Suspense>:
            Acts as a catcher for any component that suspends (like `ImageDisplay` calling `use()`).
            If `useTransition` isn't actively holding the current view, Suspense will display `fallback` 
            (our Skeleton loader) until `use()` fully resolves the promise. */}
        <Suspense fallback={<ImageSkeleton imageId={imageId} />}>
          <ImageDisplay imageDataPromise={imageDataPromise} imageId={imageId} />
        </Suspense>
      </div>
    </div>
  );
}
