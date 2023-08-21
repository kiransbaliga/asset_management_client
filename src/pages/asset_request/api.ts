import baseApi from '../../services';
import AssetRequestType from '../../types/AssetRequestType';
import { ResponseDataListType, ResponseDataType } from '../../types/ResponseType';

export const requestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRequestList: builder.query<ResponseDataListType, void>({
      query: () => '/requests/'
    }),

    createRequest: builder.mutation<ResponseDataType, AssetRequestType>({
      query: (body) => ({
        url: '/requests/',
        method: 'POST',
        body
      })
    }),
    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `/requests/${id}`,
        method: 'DELETE'
      })
    }),
    updateRequest: builder.mutation<ResponseDataType, AssetRequestType>({
      query: (body) => ({
        url: `/requests/${body.assetId}`,
        method: 'PUT',
        body
      })
    })
  })
});

export const {
  useCreateRequestMutation,
  useGetRequestListQuery,
  useDeleteRequestMutation,
  useUpdateRequestMutation
} = requestApi;
