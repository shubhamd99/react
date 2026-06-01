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

Tags are labels for cached data.

Use this simple mental model:

```text
providesTags    = a query says, "I have this data in the cache"
invalidatesTags = a mutation says, "this cached data is now old"
```

RTK Query uses those labels to decide which active queries should refetch after a mutation.

### Why tags are needed

Imagine the app loads the course list:

```js
useGetCoursesQuery({ level: "all" });
```

RTK Query stores that result in its cache. Later, the user adds a new course:

```js
await addCourse(newCourse).unwrap();
```

Now the old course list is no longer correct, because it does not include the new course yet.

You could manually call `refetch()`, but that gets messy in bigger apps. Instead, tags let RTK Query do it automatically.

### `providesTags`

`providesTags` belongs to a query.

It tells RTK Query what data this query result represents.

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

If `getCourses` returns this data:

```js
[
  { id: 1, title: "Redux Toolkit Store Setup" },
  { id: 2, title: "RTK Query Queries and Hooks" },
];
```

Then RTK Query treats the cached result as if it has these labels:

```js
[
  { type: "Course", id: 1 },
  { type: "Course", id: 2 },
  { type: "Course", id: "LIST" },
];
```

Those labels mean:

- `{ type: 'Course', id: 1 }`: this query result contains course 1.
- `{ type: 'Course', id: 2 }`: this query result contains course 2.
- `{ type: 'Course', id: 'LIST' }`: this query result contains the course list.

`LIST` is not special syntax from RTK Query. It is just a common name developers use for "the whole list".

### `invalidatesTags`

`invalidatesTags` belongs to a mutation.

It tells RTK Query which cached labels are now stale.

`addCourse` invalidates these tags:

```js
invalidatesTags: [
  { type: "Course", id: "LIST" },
  { type: "Stats", id: "SUMMARY" },
];
```

That means:

```text
After adding a course, the course list is stale.
After adding a course, the stats summary is stale.
```

Any currently active query that provided those same tags will refetch automatically.

### Full flow

```text
1. getCourses runs
2. getCourses caches the course list
3. getCourses provides { type: 'Course', id: 'LIST' }
4. addCourse runs
5. addCourse invalidates { type: 'Course', id: 'LIST' }
6. RTK Query sees the matching tag
7. RTK Query refetches getCourses automatically
```

### List tag vs item tag

Use a `LIST` tag when a mutation changes the collection:

```js
addCourse: builder.mutation({
  invalidatesTags: [{ type: "Course", id: "LIST" }],
});
```

Good for:

- add item
- delete item
- reorder list
- change filters that affect the list

Use a specific id tag when a mutation changes one item:

```js
updateCourse: builder.mutation({
  invalidatesTags: (_result, _error, course) => [
    { type: "Course", id: course.id },
  ],
});
```

Good for:

- update course 5
- mark course 5 complete
- refresh only detail pages or lists that contain course 5

### Quick examples

```text
getCourses provides: Course LIST
addCourse invalidates: Course LIST
Result: course list refetches
```

```text
getCourse(5) provides: Course 5
updateCourse(5) invalidates: Course 5
Result: course 5 refetches
```

```text
getStats provides: Stats SUMMARY
addCourse invalidates: Stats SUMMARY
Result: stats refetch
```

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
