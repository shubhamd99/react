import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { academyApi } from '../services/academyApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [academyApi.reducerPath]: academyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(academyApi.middleware),
});
