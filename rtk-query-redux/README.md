# RTK Query + Redux Toolkit Learning App

This is a small React project for learning **RTK Query with Redux Toolkit** from basic to advanced patterns.

The app uses a local in-memory fake server so you can learn the RTK Query API without depending on any external backend. The same RTK Query concepts apply when you later switch to a real REST API with `fetchBaseQuery`.

## Run it

```bash
npm install
npm run dev
```

Useful scripts:

```bash
npm run lint
npm run build
```

## Project structure

```text
src/
  app/
    store.js
  components/
    CourseCard.jsx
  features/
    counter/
      counterSlice.js
  services/
    academyApi.js
    fakeServer.js
  App.jsx
  main.jsx
  styles.css
```

## Files to study first

- `src/app/store.js`: Redux store setup with RTK Query middleware.
- `src/services/academyApi.js`: RTK Query endpoints, tags, mutations, lazy queries, optimistic updates, and polling.
- `src/services/fakeServer.js`: a small fake backend used by the API service.
- `src/features/counter/counterSlice.js`: ordinary Redux Toolkit slice state living beside RTK Query.
- `src/App.jsx`: examples that use the generated query and mutation hooks.

## Learning path

Follow the code in this order:

1. Open `src/app/store.js`.
2. See how `academyApi.reducer` is added to the Redux store.
3. See how `academyApi.middleware` is added with `getDefaultMiddleware().concat(...)`.
4. Open `src/services/academyApi.js`.
5. Study how `createApi` creates endpoints.
6. Open `src/App.jsx`.
7. Search for each generated hook, such as `useGetCoursesQuery` and `useAddCourseMutation`.
8. Compare RTK Query server state with normal Redux state in `counterSlice.js`.

## Concepts covered

1. Basic query with `useGetCoursesQuery()`.
2. Query arguments with `useGetCoursesQuery({ level })`.
3. Mutation with `useAddCourseMutation()`.
4. Cache tags using `providesTags` and `invalidatesTags`.
5. Optimistic updates with `onQueryStarted`.
6. Lazy query with `useLazySearchCoursesQuery()`.
7. Polling and manual `refetch`.
8. Normal Redux slice state used together with RTK Query server state.

## RTK Query mental model

RTK Query is designed for **server state**:

- data fetched from an API
- loading and error states
- request deduplication
- caching
- automatic refetching
- cache invalidation after mutations

Redux slices are still useful for **client state**:

- UI state
- selected tabs
- filters
- form drafts
- local counters
- user preferences

This project shows both:

- Course data lives in RTK Query.
- Completed local lesson count lives in a normal Redux slice.

## Store setup

The store includes two reducers:

```js
reducer: {
  counter: counterReducer,
  [academyApi.reducerPath]: academyApi.reducer,
}
```

The RTK Query middleware is required:

```js
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(academyApi.middleware);
```

Without the middleware, RTK Query caching, invalidation, polling, and lifecycle behavior will not work correctly.

## API service setup

The API service is created with:

```js
createApi({
  reducerPath: "academyApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Course", "Stats"],
  endpoints: (builder) => ({}),
});
```

This project uses `fakeBaseQuery()` because the data comes from `fakeServer.js`.

With a real backend, you would usually use:

```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://example.com/api",
  }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/courses",
    }),
  }),
});
```

## Query example

In `academyApi.js`:

```js
getCourses: builder.query({
  queryFn: async ({ level = "all" } = {}) => {
    return { data: await fakeServer.getCourses(level) };
  },
});
```

RTK Query automatically generates a hook:

```js
const { data, isLoading, isFetching, isError, refetch } = useGetCoursesQuery({
  level: "basic",
});
```

Important fields:

- `data`: cached response data.
- `isLoading`: true for the first load.
- `isFetching`: true for any active request, including refetches.
- `isError`: true if the request failed.
- `refetch`: manually triggers another request.

## Mutation example

In `academyApi.js`:

```js
addCourse: builder.mutation({
  queryFn: async (course) => {
    return { data: await fakeServer.addCourse(course) };
  },
  invalidatesTags: [
    { type: "Course", id: "LIST" },
    { type: "Stats", id: "SUMMARY" },
  ],
});
```

In `App.jsx`:

```js
const [addCourse, addCourseState] = useAddCourseMutation();

await addCourse(newCourse).unwrap();
```

Mutation hooks return an array:

- first item: trigger function
- second item: mutation state, such as `isLoading`, `isError`, and `data`

`unwrap()` is useful because it returns the successful payload or throws the error, which makes it easy to use with `try/catch`.

## Cache tags

Tags connect queries and mutations.

`getCourses` provides tags:

```js
providesTags: (result) =>
  result
    ? [
        ...result.map(({ id }) => ({ type: "Course", id })),
        { type: "Course", id: "LIST" },
      ]
    : [{ type: "Course", id: "LIST" }];
```

`addCourse` invalidates tags:

```js
invalidatesTags: [
  { type: "Course", id: "LIST" },
  { type: "Stats", id: "SUMMARY" },
];
```

That means after adding a course, RTK Query knows that cached course lists and stats are stale and should refetch.

## Optimistic update

The `toggleCourse` mutation updates the UI before the fake server responds:

```js
async onQueryStarted(id, { dispatch, queryFulfilled }) {
  const patchResult = dispatch(
    academyApi.util.updateQueryData('getCourses', { level: 'all' }, (draft) => {
      const course = draft.find((item) => item.id === id);

      if (course) {
        course.completed = !course.completed;
      }
    }),
  );

  try {
    await queryFulfilled;
  } catch {
    patchResult.undo();
  }
}
```

This is called an optimistic update because the UI assumes the request will succeed. If the request fails, `patchResult.undo()` rolls the cache back.

## Lazy query

Normal query hooks run automatically when the component renders.

Lazy queries run only when you call the trigger:

```js
const [searchCourses, searchResult] = useLazySearchCoursesQuery();

searchCourses(query);
```

Use lazy queries for:

- search buttons
- modal details
- optional data
- user-triggered requests

## Polling

The stats query refreshes every 5 seconds:

```js
const statsQuery = useGetStatsQuery(undefined, {
  pollingInterval: 5000,
});
```

Polling is useful for dashboards, notifications, live status, and long-running jobs.

## Query hook naming

RTK Query generates React hooks from endpoint names:

```text
getCourses    -> useGetCoursesQuery
getCourse     -> useGetCourseQuery
addCourse     -> useAddCourseMutation
toggleCourse  -> useToggleCourseMutation
searchCourses -> useLazySearchCoursesQuery
```

The rule is:

- `builder.query` creates `useNameQuery`
- `builder.query` also creates `useLazyNameQuery`
- `builder.mutation` creates `useNameMutation`

## Basic to advanced checklist

Use this checklist while studying:

- Understand why the RTK Query reducer is added to the store.
- Understand why the RTK Query middleware is added to the store.
- Read data with `useGetCoursesQuery`.
- Pass arguments to a query.
- Show loading and error states.
- Trigger a mutation.
- Use `unwrap()` after a mutation.
- Invalidate cached data after a mutation.
- Use a lazy query for search.
- Use polling for repeated refetching.
- Use `updateQueryData` for optimistic cache updates.
- Keep server state in RTK Query and UI/client state in slices.

## Practice exercises

Try these changes after you understand the current code:

1. Add a delete course mutation.
2. Add a course difficulty filter beside the level filter.
3. Add an error case to `fakeServer.toggleCourse` and watch the optimistic update roll back.
4. Add a `skip` option so selected course details only load when an id exists.
5. Add `refetchOnFocus: true` to a query.
6. Replace `fakeBaseQuery` with `fetchBaseQuery` and connect it to a real API.

## Common mistakes

- Forgetting to add `academyApi.reducer` to the store.
- Forgetting to add `academyApi.middleware`.
- Treating RTK Query data like normal mutable Redux state in components.
- Invalidating tags that were never provided by any query.
- Using normal Redux slices for server data that RTK Query can cache automatically.
- Using RTK Query for every tiny piece of UI state.

## When to use RTK Query

Use RTK Query when the data comes from a server or server-like source:

- REST APIs
- internal services
- search endpoints
- dashboards
- resource lists and details
- create, update, delete workflows

Use normal Redux Toolkit slices when the data is local to the app:

- theme
- sidebar open or closed
- selected filters
- form state
- temporary UI state

The best Redux apps usually use both.
