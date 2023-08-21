import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../consts/config';
import { getToken } from '../utils/token';
import { getObjectValues } from '../utils/funcs';
import { ASSET_API_TAGS } from '../pages/asset_management/consts';

const PUBLIC_ENDPOINTS = ['login'];

const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { endpoint }) => {
      const token = getToken();

      if (token && !PUBLIC_ENDPOINTS.includes(endpoint))
        headers.set('Authorization', `Bearer ${token}`);

      return headers;
    }
  }),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
  tagTypes: [...getObjectValues(ASSET_API_TAGS)]
});

export default baseApi;
