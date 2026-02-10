# TanStack Query Learning Project

A comprehensive guide and example project for learning TanStack Query (React Query) v5 with React, TypeScript, and Vite. This project demonstrates patterns ranging from basic data fetching to advanced production-ready features like optimistic updates and infinite scrolling.

## 🚀 Initialization Steps

This project was initialized using the following steps:

1.  **Create React + TypeScript Project (Vite):**

    ```bash
    npm create vite@latest tanstack -- --template react-ts
    cd tanstack
    ```

2.  **Install Tailwind CSS & PostCSS:**

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

3.  **Install Core Dependencies:**
    ```bash
    npm install @tanstack/react-query @tanstack/react-query-devtools axios react-router-dom lucide-react clsx tailwind-merge react-intersection-observer
    ```

## 🛠️ TanStack Query Methods & Hooks Used

This project implements the following core concepts and methods from TanStack Query v5:

### 1. `useQuery`

Used in **Basic Query**, **Pagination**, and **Optimistic Updates**.

- **Purpose**: Fetches and caches asynchronous data.
- **Key Options Used**:
  - `queryKey`: Unique array identifier for the data (e.g., `['posts', 'basic']`).
  - `queryFn`: The function that returns a promise with the data.
  - `placeholderData: keepPreviousData`: Keeps the previous page's data on screen while the new page fetches (great for pagination).
  - `staleTime`: Controls how long data is considered "fresh" before a refetch is needed.

### 2. `useMutation`

Used in **Mutations** and **CreatePostForm**.

- **Purpose**: Handles data modifications (Create, Update, Delete).
- **Key Callbacks Used**:
  - `onMutate`: Fires _before_ the mutation happens. Used for **Optimistic Updates** to update the UI instantly.
  - `onSuccess`: Fires after a successful mutation. Used to trigger refetches or show success messages.
  - `onError`: Fires if the mutation fails. Used to roll back optimistic updates or show error toasts.
  - `onSettled`: Fires after success or error. Used to ensuring queries are invalidated to sync with the server.

### 3. `useInfiniteQuery`

Used in **Infinite Scroll**.

- **Purpose**: Manages paginated data where pages are appended (like a social media feed).
- **Key Options Used**:
  - `initialPageParam`: The starting page cursor (e.g., `1`).
  - `getNextPageParam`: A function to extract the next page's cursor from the last API response.
  - `fetchNextPage`: Function called when the user scrolls to the bottom (triggered by `IntersectionObserver`).

### 4. `useQueryClient`

Used globally.

- **Purpose**: The core client instance that manages the cache.
- **Methods Used**:
  - `invalidateQueries({ queryKey })`: Marks data as "stale" and triggers a refetch. Essential for updating lists after a mutation.
  - `cancelQueries({ queryKey })`: Cancels outgoing refetches to prevent them from overwriting optimistic updates.
  - `setQueryData(queryKey, updater)`: Manually updates the cache without network requests (used for instant/optimistic UI updates).
  - `getQueryData(queryKey)`: Retrieves the current state of the cache (used to snapshot data before optimistic updates).

### 5. `ReactQueryDevtools`

- **Purpose**: A dedicated devtool to visualize the cache state, inspect query keys, and debug data fetching flows.

---

## 📦 Packages Used

- **`@tanstack/react-query`**: The core library for state management.
- **`axios`**: Promise-based HTTP client.
- **`react-router-dom`**: Client-side routing.
- **`lucide-react`**: Icon set.
- **`react-intersection-observer`**: Detects when elements enter the viewport (for Infinite Scroll).

## 🧠 Concepts Covered

### Pagination

- **Optimized UX**: Usage of `keepPreviousData` prevents layout thrashing by holding onto old data until new data arrives.

### Optimistic Updates

- **Instant Feedback**: The "Like" button in this project updates the heart icon _immediately_ upon click.
- **Rollback Strategy**: If the API call fails, the UI automatically reverts to the previous state using context passed from `onMutate`.

### Custom UI Components

- **`ToastProvider`**: A custom context-based system for displaying non-blocking success/error messages.
- **`PostSkeleton`**: A shimmer loading effect that mimics the content layout, providing a better perceived performance than spinners.

## 🛠️ How to Run Locally

1.  **Clone the repository**.
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
4.  **Open your browser** to `http://localhost:5173`.
