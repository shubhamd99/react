import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    completedLessons: 0,
  },
  reducers: {
    markLessonDone: (state) => {
      state.completedLessons += 1;
    },
    resetLessons: (state) => {
      state.completedLessons = 0;
    },
  },
});

export const { markLessonDone, resetLessons } = counterSlice.actions;
export const selectCompletedLessons = (state) => state.counter.completedLessons;
export default counterSlice.reducer;
