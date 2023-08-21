import baseApi from '../../services';
// import AssetFilterType from '../../types/AssetFilterType';
import AssetType from '../../types/AssetType';
import { ResponseDataListType, ResponseDataType } from '../../types/ResponseType';
// import { createQueryUrl } from '../../utils/funcs';
import { ASSET_API_TAGS } from '../asset_management/consts';

export const assetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRequestsList: builder.query<ResponseDataListType, void>({
      query: () => '/requests'
    }),
    getCategoryList: builder.query<ResponseDataListType, void>({
      query: () => '/category/'
    }),
    getSubcategoryList: builder.query<ResponseDataListType, void>({
      query: () => '/subcategory/'
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
      }),
      invalidatesTags: [ASSET_API_TAGS.ON_ASSET_DELETE]
    }),
    updateAsset: builder.mutation<ResponseDataType, AssetType>({
      query: (body) => ({
        url: `/assets/${body.id}`,
        method: 'PATCH',
        body
      })
    }),
    getAssetById: builder.query({
      query: (id) => `/assets/${id}`
    })
  })
});

export const {
  useCreateAssetMutation,
  useGetRequestsListQuery,
  useDeleteAssetMutation,
  useUpdateAssetMutation,
  useGetCategoryListQuery,
  useLazyGetSubcategoryListQuery,
  useLazyGetAssetByIdQuery
} = assetApi;
