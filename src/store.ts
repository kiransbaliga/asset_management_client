import { configureStore } from '@reduxjs/toolkit';
import baseApi from './services';

const config = {
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), baseApi.middleware]
};

const store = configureStore(config);

export default store;
