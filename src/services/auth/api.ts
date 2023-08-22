import baseApi from '..';
import { LoginType } from '../../pages/login/types';
import { ResponseDataType } from '../../types/ResponseType';
import { clearUser, setUser } from './reducer';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: LoginType) => ({
        url: '/employees/login',
        method: 'POST',
        body
      })
    }),
    getCurrentUser: builder.query<ResponseDataType, void>({
      query: () => '/employees/me',
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUser(data.data));
        } catch (error) {
          clearUser();
        }
      }
    })
  })
});

export const { useLoginMutation, useGetCurrentUserQuery } = authApi;
