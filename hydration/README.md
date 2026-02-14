# React Hydration Concepts Explorer

A Next.js 14+ (App Router) project designed to demonstrate and visualize core React hydration concepts: **Basic Hydration**, **Progressive Hydration (Streaming)**, and **Selective Hydration (Suspense)**.

## 🚀 Features & Concepts

### 1. Basic Hydration (`/basic`)

demonstrates the standard hydration process where the server renders HTML, and the client attaches event listeners.

- **Key Concept:** The "Uncanny Valley" where UI looks ready but isn't interactive until JS loads.
- **Implementation:** A counter component that displays its hydration status.

### 2. Progressive Hydration / Streaming (`/progressive`)

Showcases **Streaming SSR** where parts of the page are sent to the client as they become ready.

- **Key Concept:** Improving First Contentful Paint (FCP) by not waiting for slow data fetches to block the entire page.
- **Implementation:** A "Fast Component" that loads instantly and a "Slow Component" (wrapped in `Suspense`) that streams in after a simulated delay.

### 3. Selective Hydration (`/selective`)

Demonstrates React 18's ability to prioritize hydration based on user interaction.

- **Key Concept:** Breaking the "Waterfall" of hydration. If a user clicks a component that is still hydrating, React prioritizes it over others.
- **Implementation:** Multiple heavy components wrapped in `Suspense`. Clicking one while others load forces it to hydrate first.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17+

### Installation

1.  Clone the repository (or navigate to the folder):

    ```bash
    cd d:\workspace\react\hydration
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Run the development server:

    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000)

---

## 🧪 How to Verify Concepts

### Verifying Basic Hydration

1.  Go to `/basic`.
2.  Refresh the page.
3.  Observe the status text flipping from **"Server Rendered ⏳"** to **"Hydrated ✅"**.
4.  _Experiment:_ Disable JavaScript in DevTools and refresh. The buttons will not work, demonstrating that HTML is present but not hydrated.

### Verifying Progressive Hydration

1.  Go to `/progressive`.
2.  Refresh the page.
3.  Notice the page shell and "Fast Component" load **instantly**.
4.  A skeleton loader appears for the "Slow Component".
5.  After 3 seconds, the "Slow Component" pops in.
6.  _Network Tab:_ You can see the document request remains "Pending" or open while data is being streamed.

### Verifying Selective Hydration

1.  Go to `/selective`.
2.  Open your browser console (F12).
3.  Refresh the page.
4.  **Action:** Quickly click on one of the components (e.g., "Right Component") while they are still loading or just appearing.
5.  **Observation:** React will log that it is hydrating the component you clicked _before_ the others, prioritizing your interaction.

---

## 📂 Project Structure

```
app/
├── basic/          # Basic Hydration demo
├── progressive/    # Streaming SSR demo
├── selective/      # Selective Hydration demo
├── components/     # Shared components (if any)
├── page.tsx        # Home page with links
└── layout.tsx      # Root layout
```

## 📚 Learn More

For a deeper theoretical explanation of these concepts, please read the included **[concepts.md](concepts.md)** file.
