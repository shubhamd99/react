## React Query

![img_url](https://i.imgur.com/f5hNxiF.png)

React Query is a powerful library developed by TanStack that simplifies data fetching and state management in React applications. It provides a straightforward way to manage remote data and keep it in sync with the UI.
React Query is a JavaScript library designed to simplify the complex task of data fetching and caching in React applications. It offers a set of hooks and utilities that enable you to manage data from various sources, including REST APIs, GraphQL, or even local state, effortlessly.

Key Features:

- Declarative Data Fetching: React Query promotes a declarative approach to data fetching. You define queries and mutations using hooks like useQuery and useMutation. This leads to cleaner and more organized code.
- Automatic Caching: React Query includes a built-in cache that stores query results. It automatically updates data when mutations occur, ensuring your UI remains consistent.
- Background Data Sync: It can automatically refetch data in the background, keeping your data fresh without manual intervention.
- Pagination and Infinite Scrolling: React Query provides utilities for handling pagination and infinite scrolling effortlessly.
- Optimistic Updates: You can implement optimistic updates with ease, making your app feel more responsive.

Website - https://tanstack.com/query/latest

### QueryClient

The QueryClient can be used to interact with a cache

### QueryClientProvider

Use the QueryClientProvider component to connect and provide a QueryClient to your application

### Paginated Queries

Rendering paginated data is a very common UI pattern and in TanStack Query, it "just works" by including the page information in the query key:

```tsx
const result = useQuery({
  queryKey: ["projects", page],
  queryFn: fetchProjects,
});
```

The UI jumps in and out of the success and pending states because each new page is treated like a brand new query.

### useQuery

The useQuery hook is used to send an API request and handle the result of that request. The function takes an array of arguments as its first parameter. This array is used to determine if the query function should be called again with updated parameters.

### prefetchQuery

If you're lucky enough, you may know enough about what your users will do to be able to prefetch the data they need before it's needed! If this is the case, you can use the prefetchQuery method to prefetch the results of a query to be placed into the cache:
If data for this query is already in the cache and not invalidated, the data will not be fetched
If a staleTime is passed eg. prefetchQuery({queryKey: ['todos'], queryFn: fn, staleTime: 5000 }) and the data is older than the specified staleTime, the query will be fetched
If no instances of useQuery appear for a prefetched query, it will be deleted and garbage collected after the time specified in cacheTime.

### dehydrate

dehydrate creates a frozen representation of a cache that can later be hydrated with HydrationBoundary or hydrate. This is useful for passing prefetched queries from server to client or persisting queries to localStorage or other persistent locations.

### HydrationBoundary

HydrationBoundary adds a previously dehydrated state into the queryClient that would be returned by useQueryClient(). If the client already contains data, the new queries will be intelligently merged based on update timestamp.

### ReactQueryDevtools

When you begin your React Query journey, you'll want these devtools by your side. They help visualize all the inner workings of React Query and will likely save you hours of debugging if you find yourself in a pinch!

https://tanstack.com/query/v5/docs/framework/react/devtools

### getStaticProps

Exporting a function called getStaticProps will pre-render a page at build time using the props returned from the function. It's used to fetch data asynchronously during static page generation, when dynamic data is needed at build time. This includes: Accessing external APIs, Fetching data from a database, and Performing calculations before rendering the page.

### Styling Next.js with Styled JSX

Styled JSX is a CSS-in-JS library that allows you to write encapsulated and scoped CSS to style your components. The styles you introduce for one component won't affect other components, allowing you to add, change and delete styles without worrying about unintended side effects.

```tsx
function Home() {
  return (
    <div className="container">
      <h1>Hello Next.js</h1>
      <p>Let's explore different ways to style Next.js apps</p>
      <style jsx>{`
        .container {
          margin: 50px;
        }
        p {
          color: blue;
        }
      `}</style>
    </div>
  );
}

export default Home;
```

### KY

Ky is a tiny and elegant HTTP client based on the browser Fetch API

https://www.npmjs.com/package/ky

```tsx
import ky from "ky";

const json = await ky
  .post("https://example.com", { json: { foo: true } })
  .json();

console.log(json);
//=> `{data: '🦄'}`
```

With plain fetch, it would be:

```tsx
class HTTPError extends Error {}

const response = await fetch("https://example.com", {
  method: "POST",
  body: JSON.stringify({ foo: true }),
  headers: {
    "content-type": "application/json",
  },
});

if (!response.ok) {
  throw new HTTPError(`Fetch error: ${response.statusText}`);
}

const json = await response.json();

console.log(json);
//=> `{data: '🦄'}`
```

### \_app

Next.js uses the App component to initialize pages. You can override it and control the page initialization and:

- Persist layouts between page changes
- Keeping state when navigating pages
- Inject additional data into pages
- Add global CSS

```jsx
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
