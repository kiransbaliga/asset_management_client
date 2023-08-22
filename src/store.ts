import { configureStore } from '@reduxjs/toolkit';
import authReducer from './services/auth/reducer';
import baseApi from './services';

const config = {
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), baseApi.middleware]
};

const store = configureStore(config);

export default store;
