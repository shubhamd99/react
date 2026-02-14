# React Hydration Concepts

This project demonstrates three key hydration concepts in React and Next.js.

## 1. Hydration (Basic)

**Concept:**
Hydration is the process where React attaches event listeners to the HTML that was rendered on the server.

- **SSR (Server-Side Rendering):** The server generates the initial HTML snapshot of the page. This content is non-interactive but visible immediately.
- **Hydration:** React loads the JavaScript bundle, reconstructs the component tree in memory, and "hydrates" the DOM nodes with event handlers (click, submit, etc.).

**In this project:**

- `/basic`: A simple page with a counter. The initial number is rendered by the server. The buttons become interactive only after React hydrates the component.

## 2. Progressive Hydration (Streaming)

**Concept:**
Progressive Hydration allows parts of the application to be hydrated as they become available, rather than waiting for the entire bundle to load.
With React 18 and Next.js App Router, this is often achieved via **Streaming SSR**.

- The server stream sends the initial HTML shell immediately.
- Heavier or slower components are wrapped in `<Suspense>`.
- The server sends a fallback (loading state) for suspended parts and keeps the connection open.
- As data resolves or code loads, the server streams the remaining HTML/script to replace the fallback.

**In this project:**

- `/progressive`: A page where the main content loads instantly, but a "Slow Component" (simulated delay) streams in later without blocking the rest of the UI.

## 3. Selective Hydration

**Concept:**
Before React 18, hydration was an "all-or-nothing" process. React had to hydrate the entire tree before the user could interact with anything.
**Selective Hydration** allows React to prioritize hydrating components that the user is interacting with.

- If a user clicks on a component that hasn't hydrated yet, React captures the event, prioritizes hydrating that specific part of the tree, and then replays the event.
- It breaks the hydration work into smaller chunks to keep the main thread responsive.

**In this project:**

- `/selective`: Multiple "heavy" components are wrapped in Suspense. If you try to interact with one while others are still loading/hydrating, React will prioritize the one you interacted with.
