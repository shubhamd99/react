# Hydration Patterns

This workspace demonstrates hydration and streaming patterns with three small apps:

- `react-hydration`: Rsbuild React client-side rendering baseline
- `next-hydration`: Next.js App Router server components, client islands, and streaming
- `node-streaming-ssr`: raw Node + React streaming SSR with `hydrateRoot`

## Run

Install dependencies were created during setup. To run all apps together:

```bash
npm run dev
```

App URLs:

- Rsbuild React app: `http://localhost:3001`
- Next.js app: `http://localhost:3002`
- Node streaming SSR app: `http://localhost:3003`

To run each app separately:

```bash
cd react-hydration
npm run dev
```

```bash
cd next-hydration
npm run dev
```

```bash
cd node-streaming-ssr
npm run dev
```

## Key Definitions

### Rendering

Rendering creates UI from React components.

- Client-side rendering: the browser runs React and creates the UI.
- Server-side rendering: the server creates HTML first.

### Hydration

Hydration is when React attaches event handlers and state to HTML that already
came from the server. The page can be visible before it is fully interactive.

React API:

```ts
hydrateRoot(document.getElementById('root'), <App />);
```

Use `hydrateRoot` only when the container already has server-rendered React HTML.
Use `createRoot` for pure client-side rendering.

### Streaming SSR

Streaming SSR sends HTML in chunks. The server can send the page shell first,
then stream slower Suspense sections later.

React API:

```ts
renderToPipeableStream(<App />, {
  onShellReady() {
    // Start sending HTML to the browser.
  },
});
```

### Selective Hydration

Selective hydration means React does not have to hydrate the whole page in one
blocking pass. Suspense boundaries and user interaction can influence which
parts hydrate first.

Interview answer: React can prioritize hydrating the part the user interacts
with, instead of waiting for every component on the page to hydrate first.

### Progressive Hydration

Progressive hydration means the page becomes interactive in pieces over time.
Server HTML may be visible immediately, while client components hydrate when
their JavaScript is available.

Next.js App Router naturally encourages this with server components plus small
`use client` islands.

### Partial Hydration / Islands

Partial hydration means only interactive islands need client JavaScript. Static
server-rendered UI can remain plain HTML.

In the Next app:

- Server cards render as HTML and do not hydrate.
- `ClientCounter` hydrates because it uses state and click handlers.
- `ClientSearch` hydrates separately as another client island.

### React Server Components

React Server Components render on the server and do not ship their component
code to the browser. They are different from classic SSR components that render
HTML on the server and then hydrate on the client.

In this workspace, React Server Components are demonstrated in the Next.js app,
because Next.js App Router supports them by default. The plain Rsbuild React app
does not include React Server Components because RSC needs framework/build
integration, not only React.

## Pattern Map

| Pattern | Plain React app | Node React SSR app | Next.js app |
| --- | --- | --- | --- |
| Client-side rendering | `react-hydration/src/index.tsx` uses `createRoot` | Not the main pattern | Client components still render/hydrate in the browser |
| Basic hydration | Not used; this is the contrast example | `node-streaming-ssr/src/main.tsx` uses `hydrateRoot` | Managed by Next for `use client` components |
| Streaming SSR | Not available in this CSR-only app | `node-streaming-ssr/server.ts` uses `renderToPipeableStream` | `Suspense` around `SlowServerPanel` streams fallback first |
| Selective hydration | Not applicable without SSR hydration | Suspense boundaries let React hydrate/prioritize pieces | Next uses React hydration under the hood for client boundaries |
| Progressive hydration | Not applicable without server HTML | Streamed HTML appears first, then hydrated UI becomes interactive | `ClientCounter` and `ClientSearch` are separate client islands |
| Partial hydration / islands | Not applicable in this CSR app | Conceptually possible, but not the focus | Server Components plus `use client` islands |
| React Server Components | Not supported in this setup | Not shown in the raw Node demo | Default in App Router; `page.tsx` and `SlowServerPanel` are server components |

## App 1: `react-hydration`

This is the baseline Rsbuild React app.

Important file:

- `react-hydration/src/index.tsx`

It uses:

```ts
ReactDOM.createRoot(rootEl).render(<App />);
```

This is not hydration. The HTML starts mostly empty, and React creates the UI in
the browser.

Use this to explain the difference between rendering and hydration.

Patterns in this app:

- CSR: `src/index.tsx` uses `createRoot`.
- Hydration: not used.
- Selective hydration: not used, because there is no server-rendered HTML.
- Progressive hydration: not used, because the whole app is client-rendered.
- React Server Components: not used, because Rsbuild alone does not provide RSC.

## App 2: `next-hydration`

This app uses the Next.js App Router.

Important files:

- `next-hydration/src/app/page.tsx`
- `next-hydration/src/app/components/ClientCounter.tsx`
- `next-hydration/src/app/components/ClientSearch.tsx`
- `next-hydration/src/app/components/SlowServerPanel.tsx`

Patterns shown:

- Server components render HTML without client JavaScript.
- `use client` components hydrate and become interactive.
- `Suspense` streams fallback UI first.
- Slow server data arrives later.

Interview answer: Next.js manages server rendering, streaming, bundling, and
hydration automatically. You choose client hydration boundaries with `use client`
and streaming boundaries with `Suspense`.

Pattern mapping in this app:

- React Server Components: `page.tsx` and `SlowServerPanel.tsx` are server
  components because they do not have `'use client'`.
- Client hydration: `ClientCounter.tsx` and `ClientSearch.tsx` hydrate because
  they have `'use client'`, state, and event handlers.
- Streaming SSR: `page.tsx` wraps `SlowServerPanel` in `Suspense`, so the
  fallback can stream before the slow server component finishes.
- Selective hydration: React can prioritize hydration around Suspense/client
  boundaries when the user interacts.
- Progressive hydration: separate client islands can become interactive
  independently as their JavaScript loads.
- Partial hydration/islands idea: most of the page is server-rendered HTML, and
  only the interactive islands need client JavaScript.

## App 3: `node-streaming-ssr`

This app shows the low-level React APIs.

Important files:

- `node-streaming-ssr/server.ts`
- `node-streaming-ssr/src/App.tsx`
- `node-streaming-ssr/src/main.tsx`

Server:

```ts
renderToPipeableStream(React.createElement(App), {
  onShellReady() {
    // stream shell HTML
  },
});
```

Client:

```ts
hydrateRoot(root, <App />);
```

The same React tree is rendered on the server and hydrated in the browser.

Pattern mapping in this app:

- Basic hydration: `src/main.tsx` calls `hydrateRoot`.
- Streaming SSR: `server.ts` calls `renderToPipeableStream`.
- Suspense streaming: `src/App.tsx` has `SlowServerSection` inside `Suspense`.
- Selective hydration: the Suspense boundary gives React a unit of work it can
  hydrate/prioritize independently.
- Progressive hydration: HTML streams first; browser JavaScript hydrates the
  counter afterward.
- React Server Components: not shown here. This is classic SSR, not RSC.

## Latest React / Next Concepts

- React streaming SSR uses Suspense boundaries to stream HTML progressively.
- `hydrateRoot` is the modern client API for hydrating server-rendered React.
- Next.js App Router uses React Server Components by default.
- `use client` marks a boundary where client JavaScript and hydration are needed.
- Server Components reduce hydration work because they do not ship component code
  to the browser.

## Common Interview Questions

### Hydration vs rendering?

Rendering creates UI. Hydration attaches React behavior to existing server HTML.

### Why can hydration be expensive?

The browser must download JavaScript, parse it, run React, compare the component
tree to existing HTML, and attach event handlers.

### What causes hydration mismatch?

Server HTML and client render output are different. Common causes include dates,
random numbers, browser-only APIs, locale differences, and conditional rendering
that changes between server and client.

### Why streaming?

Streaming improves perceived performance because the user can see the shell
before all data is ready.

### Why Suspense?

Suspense defines loading boundaries. React and frameworks like Next.js use those
boundaries to stream and hydrate work in smaller pieces.

## Verify

```bash
npm run typecheck
npm run build
```
