import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { fakeServer } from './fakeServer';

export const academyApi = createApi({
  reducerPath: 'academyApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Course', 'Stats'],
  endpoints: (builder) => ({
    getCourses: builder.query({
      queryFn: async ({ level = 'all' } = {}) => {
        try {
          return { data: await fakeServer.getCourses(level) };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Course', id })),
              { type: 'Course', id: 'LIST' },
            ]
          : [{ type: 'Course', id: 'LIST' }],
    }),

    getCourse: builder.query({
      queryFn: async (id) => {
        try {
          return { data: await fakeServer.getCourse(id) };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: (_result, _error, id) => [{ type: 'Course', id }],
    }),

    searchCourses: builder.query({
      queryFn: async (query) => {
        try {
          return { data: await fakeServer.searchCourses(query) };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),

    addCourse: builder.mutation({
      queryFn: async (course) => {
        try {
          return { data: await fakeServer.addCourse(course) };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      invalidatesTags: [
        { type: 'Course', id: 'LIST' },
        { type: 'Stats', id: 'SUMMARY' },
      ],
    }),

    toggleCourse: builder.mutation({
      queryFn: async (id) => {
        try {
          return { data: await fakeServer.toggleCourse(id) };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
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
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'Course', id },
        { type: 'Stats', id: 'SUMMARY' },
      ],
    }),

    getStats: builder.query({
      queryFn: async () => {
        try {
          return { data: await fakeServer.getStats() };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
      providesTags: [{ type: 'Stats', id: 'SUMMARY' }],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useLazySearchCoursesQuery,
  useAddCourseMutation,
  useToggleCourseMutation,
  useGetStatsQuery,
} = academyApi;
