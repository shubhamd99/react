# 🧪 RxJS Lab: Interactive Learning Journey

Welcome to the **RxJS Lab**, a comprehensive playground designed to bridge the gap between reactive programming theory and practical React implementation. This project moves beyond "Hello World" to demonstrate how RxJS solves complex UI challenges elegantly.

---

## 🚀 Quick Start

```bash
cd rxjs
npm install
npm run dev
```

---

## 🏛️ The Three Pillars of RxJS in React

Before diving into the code, keep these three key patterns in mind:

1.  **Declarativity**: We describe _what_ should happen, not _how_. Streams are pipelines that transform data over time.
2.  **Resource Management**: Every subscription must be cleaned up. In React, we use the `useEffect` cleanup return.
3.  **State Synthesis**: Instead of manual `setState` calls littered everywhere, we derive state from streams and update it at the very end of the pipe.

---

## 🧪 Lab Modules

Each module in this lab is designed to teach a specific "Mental Model" shift.

### 1. The Foundations (Basic)

| Module                    | Goal                                        | Key Code Pattern                  |
| ------------------------- | ------------------------------------------- | --------------------------------- |
| **Interval Counter**      | Managing time-based streams in React hooks. | `return () => sub.unsubscribe();` |
| **Pipeable Operators**    | Mastering functional transformations.       | `.pipe(filter(), map(), take())`  |
| **BehaviorSubject State** | Understanding multicasted streams.          | `subject$.next(newValue)`         |

> [!TIP]
> **Pro Tip**: Use `BehaviorSubject` when you need your stream to have an "initial value" and "current value" concept (perfect for state). Use `Subject` for "fire-and-forget" events.

### 2. The Bridge (Intermediate)

#### 🔍 Search-As-You-Type

This module demonstrates how to handle asynchronous data fetching without race conditions.

- **Concepts**: Debouncing, Discarding duplicate queries, Cancellation.
- **Key Pipeline**:
  ```typescript
  search$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((query) => fetchApi(query)), // switchMap automatically cancels pending requests
  );
  ```

### 3. The Masterclass (Advanced)

#### 🖱️ Declarative Drag & Drop

One of the hardest UI problems made simple. By combining three streams (`down`, `move`, `up`), we create a single interaction flow.

- **Concept**: Coordination of unrelated event streams.
- **Key Pipeline**:
  ```typescript
  mousedown$.pipe(switchMap(() => mousemove$.pipe(takeUntil(mouseup$))));
  ```

#### 🏛️ Enterprise State Pattern

Building a "Mini-Redux" using nothing but RxJS.

- **Feature**: Selective re-renders via selectors with `distinctUntilChanged`.
- **Benefit**: High performance for complex state trees.

---

## 🛠️ Architecture Overview

The project is structured to be easily browsable:

```text
src/
├── components/          # Reusable UI (Navigation, Layout)
├── examples/            # The Core Learning Material
│   ├── Basic/           # Foundation level
│   ├── Intermediate/    # Real-world patterns
│   └── Advanced/        # Complex state/logic
├── types.ts             # Domain definitions
└── App.tsx              # Example Orchestrator
```

---

## ⚠️ Common Pitfalls to Avoid

1.  **Subscription Leaks**: Forgetting to unsubscribe in `useEffect`. Always check your `return` statement.
2.  **The "Subject" Trap**: Using Subjects for everything. Try to use factory observables (like `fromEvent` or `interval`) first!
3.  **Nestging Subscribes**: Never call `.subscribe()` inside another `.subscribe()`. Use flattening operators like `switchMap` or `mergeMap` instead.

---

## 🛠️ Tech Stack

- **React 19**: Modern UI patterns.
- **RxJS 7**: The latest reactive engine.
- **TypeScript**: Type-safe stream definitions.
- **Tailwind-style CSS**: Custom dark-mode aesthetics.

---

_Created for learners, by learners. Go forth and react!_ 🚀
