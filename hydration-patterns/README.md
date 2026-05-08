# Hydration Patterns

This workspace demonstrates hydration and streaming patterns with two UI apps
and one tiny Node server:

- `react-hydration`: React component tree plus browser `hydrateRoot` entry
- `node-streaming-ssr`: Express server that imports `react-hydration` and streams it
- `next-hydration`: Next.js App Router server components, client islands, and streaming

The React and Node apps are linked on purpose:

- `react-hydration` owns `App`, Suspense boundaries, and the client hydration bundle.
- `node-streaming-ssr` imports that same `App` and renders it with
  `renderToPipeableStream`.
- The browser receives streamed HTML from Node and hydrates it with the
  `react-hydration` client bundle.

## Run

Install dependencies were created during setup. To run all apps together:

```bash
npm run dev
```

App URLs:

- Next.js app: `http://localhost:3002`
- React + Node streaming SSR app: `http://localhost:3003`

To run the linked React + Node example:

```bash
cd node-streaming-ssr
npm run dev
```

That command builds `react-hydration` first, then starts the Node streaming
server.

To run the Next.js example separately:

```bash
cd next-hydration
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

| Pattern | React app | Node streaming server | Next.js app |
| --- | --- | --- | --- |
| Basic hydration | `react-hydration/src/index.tsx` uses `hydrateRoot` | Sends the server HTML that React hydrates | Managed by Next for `use client` components |
| Streaming SSR | React tree contains Suspense boundaries | `node-streaming-ssr/server.ts` uses `renderToPipeableStream` | `Suspense` around `SlowServerPanel` streams fallback first |
| Selective hydration | Suspense boundary in `App.tsx` gives React a hydration unit | Streams that Suspense boundary | Next uses React hydration under the hood for client boundaries |
| Progressive hydration | Counter and slow Suspense section become interactive in pieces | HTML shell streams before slow content | `ClientCounter` and `ClientSearch` are separate client islands |
| Partial hydration / islands | Not a full islands framework | Not the focus of raw React SSR | Server Components plus `use client` islands |
| React Server Components | Not supported by plain Rsbuild React alone | Not shown in the raw Node demo | Default in App Router; `page.tsx` and `SlowServerPanel` are server components |

## Code Map

### React + Express: Basic Hydration

File: `react-hydration/src/index.tsx`

```tsx
hydrateRoot(rootEl, <App />);
```

Meaning: Express sends HTML first. The browser reuses that HTML and attaches
React event handlers.

### React + Express: Progressive Streaming SSR

File: `react-hydration/src/App.tsx`

```tsx
<Suspense fallback={<LoadingCard />}>
  <SlowSection />
</Suspense>
```

Meaning: the shell and fallback can appear first. `SlowSection` resolves later
and streams into the existing page.

### React + Express: Selective Hydration Boundary

File: `react-hydration/src/App.tsx`

```tsx
<Suspense>
  <SlowSection />
</Suspense>
```

Meaning: React can treat this Suspense boundary as a separate hydration unit.
There is no `selectiveHydrate()` function; it is a React behavior enabled by
SSR, hydration, and Suspense.

### Express: Streaming Server

File: `node-streaming-ssr/server.ts`

```tsx
renderToPipeableStream(React.createElement(App), {
  onShellReady() {
    // send the shell HTML and pipe the React stream
  },
});
```

Meaning: Express starts sending HTML before every Suspense boundary has
finished.

### Next.js: React Server Component

File: `next-hydration/src/app/page.tsx`

```tsx
export default function Home() {
  return <main>...</main>;
}
```

Meaning: in the App Router, files are Server Components by default unless they
start with `'use client'`.

### Next.js: Client Hydration Island

File: `next-hydration/src/app/components/ClientCounter.tsx`

```tsx
'use client';

export function ClientCounter() {
  const [count, setCount] = useState(0);
}
```

Meaning: this component ships JavaScript to the browser and hydrates because it
has state and events.

### Next.js: Progressive Streaming SSR

File: `next-hydration/src/app/page.tsx`

```tsx
<Suspense fallback={<LoadingCard />}>
  <SlowServerPanel />
</Suspense>
```

Meaning: Next can stream the fallback first and stream the slow Server Component
later.

### Next.js: Selective Hydration

Files:

- `next-hydration/src/app/page.tsx`
- `next-hydration/src/app/components/ClientCounter.tsx`
- `next-hydration/src/app/components/ClientSearch.tsx`

```tsx
<ClientCounter />
<ClientSearch />

<Suspense fallback={<LoadingCard />}>
  <SlowServerPanel />
</Suspense>
```

Meaning: React can prioritize hydration around interactive `use client` islands
and Suspense boundaries. There is no manual `selectiveHydrate()` call; the
boundaries tell React where hydration work can be split and prioritized.

## App 1: `react-hydration`

This is the React part of the custom SSR example. It owns the component tree,
the Suspense boundary, and the browser hydration entry.

Important files:

- `react-hydration/src/index.tsx`
- `react-hydration/src/App.tsx`

The client entry uses:

```ts
hydrateRoot(rootEl, <App />);
```

This is real hydration. It expects Node to send server-rendered HTML first, then
the browser bundle attaches event handlers to that HTML.

Patterns in this app:

- Basic hydration: `src/index.tsx` calls `hydrateRoot`.
- Selective hydration: `src/App.tsx` has a `Suspense` boundary around
  `SlowSection`.
- Progressive hydration: the counter can hydrate separately from the streamed
  slow section.
- Streaming support: the same `App` is imported by the Node server and streamed.
- React Server Components: not used here because plain Rsbuild React does not
  provide RSC integration.

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

This is intentionally just a tiny Express server package. It has no separate
React `src` folder because the UI belongs to `react-hydration`.
It also imports React and React DOM Server from `react-hydration/node_modules`
so the server renderer and the component hooks use the same React copy.

Important file:

- `node-streaming-ssr/server.ts`

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

That client code lives in `react-hydration/src/index.tsx`.

The same React tree is rendered on the server by Node and hydrated in the browser
by React.

Pattern mapping in this app:

- Basic hydration: Node sends the HTML consumed by `react-hydration`'s
  `hydrateRoot`.
- Streaming SSR: `server.ts` calls `renderToPipeableStream`.
- Suspense streaming: `react-hydration/src/App.tsx` has `SlowSection` inside
  `Suspense`.
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
