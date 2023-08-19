import baseApi from '../../services';
import AssetType from '../../types/AssetType';
import { ResponseDataListType, ResponseDataType } from '../../types/ResponseType';

export const assetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssetList: builder.query<ResponseDataListType, void>({
      query: () => '/assets/'
    }),

    createAsset: builder.mutation<ResponseDataType, AssetType>({
      query: (body) => ({
        url: '/assets/',
        method: 'POST',
        body
      })
    }),
    deleteAsset: builder.mutation({
      query: (id) => ({
        url: `/assets/${id}`,
        method: 'DELETE'
      })
    }),
    updateAsset: builder.mutation<ResponseDataType, AssetType>({
      query: (body) => ({
        url: `/assets/${body.id}`,
        method: 'PUT',
        body
      })
    })
  })
});

export const {
  useCreateAssetMutation,
  useGetAssetListQuery,
  useDeleteAssetMutation,
  useUpdateAssetMutation
} = assetApi;
