# Vitest & React Testing Learning Sandbox

Welcome to the **Vitest Learning Sandbox**! This workspace is a curated, hands-on environment designed to teach you how to write modern tests in React + TypeScript using **Vitest** and **React Testing Library (RTL)**.

---

## Table of Contents
1. [What is Vitest?](#what-is-vitest)
2. [Why is Vitest Better than Jest?](#why-is-vitest-better-than-jest)
3. [Key Concepts & APIs](#key-concepts--apis)
   - [Test Structuring](#1-test-structuring)
   - [Common Matchers](#2-common-matchers)
   - [Setup & Teardown Lifecycle](#3-setup--teardown-lifecycle)
   - [Mocking & Spies (The `vi` Utility)](#4-mocking--spies-the-vi-utility)
4. [React Component & Hook Testing](#react-component--hook-testing)
5. [How to Run Tests in this Sandbox](#how-to-run-tests-in-this-sandbox)

---

## What is Vitest?

**Vitest** is a next-generation, Vite-native unit testing framework. It was designed from the ground up to match the speed, tooling, and Hot Module Replacement (HMR) capabilities of modern frontend build tools. It offers complete API compatibility with Jest, allowing developers to migrate legacy suites with minimal code changes, while providing a much faster and more modern developer experience.

---

## Why is Vitest Better than Jest?

| Feature | Vitest | Jest |
| :--- | :--- | :--- |
| **Configuration** | **Unified.** Uses your existing `vite.config.ts`. No duplicate build/plugins configuration. | **Fragmented.** Requires separate config (`jest.config.js`), transpiler plugins (`babel-jest`, `ts-jest`), and path mapping. |
| **Speed** | **Extremely Fast.** Leverages Vite's Dev Server, ESM support, and worker-based parallel threads. | **Slower.** Heavy overhead parsing modules, resolving dependencies, and compiling TS/ESM. |
| **Watch Mode** | **Instant HMR.** Only re-runs the exact tests impacted by file changes in milliseconds. | **Full Re-runs.** Re-scans dependency charts and runs slower file queries. |
| **ESM & TS Out of the Box** | **Native.** Seamless support for ES Modules, TypeScript, JSX/TSX, and CSS modules without configurations. | **Complex.** Often requires complex Babel/Babel-transform options to run TypeScript or standard ESM. |
| **Visual Dashboard** | **First-Class UI.** Has a gorgeous built-in interactive browser runner (`vitest --ui`). | **Console Only.** Third-party plugins required for HTML reports. |

---

## Key Concepts & APIs

### 1. Test Structuring

*   `describe(name, fn)`: Groups related test cases into a logical suite.
*   `test(name, fn)` or `it(name, fn)`: Declares a single test case. `it` is a semantic alias for `test`.

```typescript
describe('Math Module', () => {
  it('should add positive numbers', () => {
    expect(1 + 1).toBe(2);
  });
});
```

### 2. Common Matchers

Assertions compare the output of your code against expectations:

*   `.toBe(value)`: Strict equality check (`===`). Best for primitive types (numbers, strings, booleans).
*   `.toEqual(value)`: Deep value equality check. Recursively compares properties of objects or items in arrays.
*   `.toContain(item)`: Checks if an array contains an item, or a string contains a substring.
*   `.toThrow(message?)`: Asserts that a function throws an exception. (Note: the function must be wrapped in a callback).
*   `.toBeCloseTo(number, precision?)`: Checks floating-point arithmetic (e.g. `expect(0.1 + 0.2).toBeCloseTo(0.3, 5)`).
*   `.resolves` / `.rejects`: Unwraps a Promise to assert its resolved value or rejection error.

### 3. Setup & Teardown Lifecycle

Hooks allow running setup or cleanup routines at key points in test execution:

*   `beforeAll(fn)`: Runs once before any tests in the current file/suite begin.
*   `beforeEach(fn)`: Runs before every single test case (useful to reset mocks, variables, or databases).
*   `afterEach(fn)`: Runs after every single test case (useful for DOM cleans or mock restorations).
*   `afterAll(fn)`: Runs once after all tests in the file/suite have completed.

### 4. Mocking & Spies (The `vi` Utility)

Vitest replaces Jest's `jest` object with the `vi` utility helper:

*   `vi.fn()`: Creates a spy/mock function. Tracks parameters, call counts, and custom return values:
    ```typescript
    const myMock = vi.fn().mockReturnValue('hello');
    myMock('arg');
    expect(myMock).toHaveBeenCalledWith('arg');
    ```
*   `vi.spyOn(object, method)`: Creates a wrapper spy on an object method. Monitors call metadata while retaining the original method's implementation.
*   `vi.mock(path, factory?)`: Mocks a whole module (either a third-party dependency or local file import) across the test file.
*   `vi.stubGlobal(name, value)`: Stubs a global object (like `window.fetch`, `localStorage`, or `location`) for browser simulations.
*   `vi.useFakeTimers()`: Tells Vitest to intercept global timer functions (`setTimeout`, `setInterval`, `Date`).
*   `vi.advanceTimersByTime(ms)`: Fast-forwards the clock by a specified duration, triggering scheduled callbacks immediately without waiting.
*   `vi.useRealTimers()`: Restores native system timers.

---

## React Component & Hook Testing

This sandbox integrates **React Testing Library (RTL)** to mount and interact with React components:

*   `render(element)`: Mounts a JSX component into a jsdom window container.
*   `screen`: Provides queries to find elements (e.g., `screen.getByRole('button')`, `screen.getByLabelText(/email/i)`).
*   `fireEvent`: Simulates DOM events like `click` or `change`.
*   `act(fn)`: Wraps state-modifying procedures to ensure all rendering cycles complete before executing expectations.
*   `renderHook(fn)`: Isolates custom React hooks for state monitoring without manual components.

---

## How to Run Tests in this Sandbox

Run these commands in the `vitest-learning/` directory:

```bash
# 1. Run all tests once
npm run test:run

# 2. Start Vitest in Watch Mode (automatically re-runs tests on save)
npm run test

# 3. Open the Vitest browser UI dashboard
npm run test:ui

# 4. Check code coverage reports
npm run coverage

# 5. Build the production React app
npm run build

# 6. Run the local dev server to view the dashboard
npm run dev
```

Check out the interactive dashboard by launching the dev server and navigating to the local address. Happy testing!
