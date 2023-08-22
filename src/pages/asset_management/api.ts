import baseApi from '../../services';
import AssetFilterType from '../../types/AssetFilterType';
import AssetType from '../../types/AssetType';
import { ResponseDataListType, ResponseDataType } from '../../types/ResponseType';
import { createQueryUrl } from '../../utils/funcs';
import { ASSET_API_TAGS } from './consts';

export const assetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssetList: builder.query<ResponseDataListType, AssetFilterType>({
      query: (filter) => createQueryUrl('/assets', filter),
      providesTags: [ASSET_API_TAGS.ON_ASSET_DELETE]
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
    }),
    uploadFile: builder.mutation<ResponseDataType, FormData>({
      query: (formData) => ({
        url: '/assets/upload/', // Replace with your upload URL
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    })
  })
});

export const {
  useCreateAssetMutation,
  useLazyGetAssetListQuery,
  useDeleteAssetMutation,
  useUpdateAssetMutation,
  useGetCategoryListQuery,
  useLazyGetSubcategoryListQuery,
  useLazyGetAssetByIdQuery,
  useUploadFileMutation
} = assetApi;
