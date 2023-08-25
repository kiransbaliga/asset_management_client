import baseApi from '../../services';
import AssetFilterType from '../../types/AssetFilterType';
import AssetType from '../../types/AssetType';
import CategoryType from '../../types/CategoryType';
import { ResponseDataListType, ResponseDataType } from '../../types/ResponseType';
import SubcategoryType from '../../types/SubcategoryType';
import { createQueryUrl } from '../../utils/funcs';
import { ASSET_API_TAGS } from './consts';

export const assetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssetList: builder.query<ResponseDataListType, AssetFilterType>({
      query: (filter) => createQueryUrl('/assets', filter),
      providesTags: [ASSET_API_TAGS.ON_ASSET_DELETE]
    }),
    getAssetsOfEmployee: builder.query<ResponseDataListType, number>({
      query: (id) => `/assets/employee/${id}`,
      providesTags: [ASSET_API_TAGS.ON_ASSET_DELETE]
    }),
    getPerishableAssetsOfEmployee: builder.query<ResponseDataListType, number>({
      query: (id) => `/subcategory/employee/${id}`,
      providesTags: [ASSET_API_TAGS.ON_ASSET_DELETE]
    }),
    getCategoryList: builder.query<ResponseDataListType, void>({
      query: () => '/category?length=1000'
    }),
    getSubcategoryList: builder.query<ResponseDataListType, void>({
      query: () => '/subcategory?length=1000'
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
    gettemplate: builder.query({
      query: () => ({ url: '/assets/template' })
    }),
    updateAsset: builder.mutation<ResponseDataType, AssetType>({
      query: (body) => ({
        url: `/assets/${body.id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: [ASSET_API_TAGS.ON_ASSET_DELETE]
    }),
    getAssetById: builder.query({
      query: (id) => `/assets/${id}`
    }),
    getSubcategoryById: builder.query({
      query: (id) => `/subcategory/${id}`
    }),
    uploadFile: builder.mutation<ResponseDataType, FormData>({
      query: (formData) => ({
        url: '/assets/upload/', // Replace with your upload URL
        method: 'POST',
        body: formData,
        headers: {}
      })
    }),
    createCategory: builder.mutation<ResponseDataType, CategoryType>({
      query: (body) => ({
        url: '/category/',
        method: 'POST',
        body
      })
    }),
    updateSubcategory: builder.mutation<ResponseDataType, SubcategoryType>({
      query: (body) => ({
        url: '/subcategory/',
        method: 'PUT',
        body
      })
    }),
    createSubcategory: builder.mutation<ResponseDataType, SubcategoryType>({
      query: (body) => ({
        url: '/subcategory/',
        method: 'POST',
        body
      })
    }),
    getHistoryByAssetId: builder.query({
      query: (id) => `/history/assets/${id}`
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
  useUploadFileMutation,
  useCreateCategoryMutation,
  useCreateSubcategoryMutation,
  useLazyGetHistoryByAssetIdQuery,
  useLazyGetAssetsOfEmployeeQuery,
  useLazyGetPerishableAssetsOfEmployeeQuery,
  useLazyGetSubcategoryByIdQuery,
  useUpdateSubcategoryMutation,
  useGettemplateQuery,
  useLazyGettemplateQuery
} = assetApi;
