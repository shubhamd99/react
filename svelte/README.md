# 🚀 Learning Svelte (Svelte 5)

Welcome to your Svelte learning journey! This project was created to help you understand the core concepts of the Svelte framework.

## 🌟 What is Svelte?

Unlike other frameworks like React or Vue, Svelte is a **compiler**. It does most of its work at build time, converting your declarative components into highly efficient imperative code that surgically updates the DOM.

### Key Differences from React:

- **No Virtual DOM**: Svelte updates the DOM directly, leading to better performance and smaller bundle sizes.
- **Truly Reactive**: State changes are handled at the language level, not through complex hooks.
- **Less Boilerplate**: Components are concise and look more like standard HTML/CSS/JS.

## 🔧 Project Structure

- `src/routes/`: Contains the pages of your application. SvelteKit uses file-based routing.
  - `+page.svelte`: The main entry point for a route.
  - `+layout.svelte`: Wraps all pages in a route (useful for headers/footers).
- `src/lib/`: Reusable components and logic.
- `static/`: Static assets like images and fonts.

## 📖 Core Concepts (Svelte 5 Runes)

This project uses **Svelte 5**, which introduces **Runes** for reactivity.

### 1. `$state`

Declares a piece of reactive state.

```svelte
<script>
  let count = $state(0);
</script>
<button onclick={() => count++}>{count}</button>
```

### 2. `$derived`

Declares state that is derived from other state.

```svelte
<script>
  let count = $state(0);
  let double = $derived(count * 2);
</script>
```

### 3. `$effect`

Runs side effects whenever the state it depends on changes.

```svelte
<script>
  $effect(() => {
    console.log("Count changed to", count);
  });
</script>
```

## 🚀 Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start Dev Server**:

   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   Visit the URL shown in your terminal (usually `http://localhost:5173`).

## 🧪 Experiments to Try

- Open `src/routes/Counter.svelte` and see how `$state` is used.
- Try creating a new route by adding a folder in `src/routes/` with a `+page.svelte` file.
- Add a new `$derived` variable to the `Counter` component.

Happy Coding! 🚀
