import baseApi from '../../services';
import AssetFilterType from '../../types/AssetFilterType';
// import AssetFilterType from '../../types/AssetFilterType';
import AssetType from '../../types/AssetType';
import RequestType from '../../types/RequestType';
import {
  ResponseDataListType,
  ResponseDataType,
  requestResponseType
} from '../../types/ResponseType';
import { createQueryUrl } from '../../utils/funcs';
// import { createQueryUrl } from '../../utils/funcs';
import { ASSET_API_TAGS } from '../asset_management/consts';
import { REQUEST_API_TAGS } from './consts';

export const assetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRequestsList: builder.query<ResponseDataListType, AssetFilterType>({
      query: (filter) => createQueryUrl('/requests', filter),
      providesTags: [REQUEST_API_TAGS.GET_LIST]
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
    getOwnedAssetList: builder.query<ResponseDataListType, number>({
      query: (employeeId) => `/assets/employee/${employeeId}/`
    }),
    createRequest: builder.mutation<requestResponseType, RequestType>({
      query: (body) => ({
        url: '/requests/',
        method: 'POST',
        body
      })
    }),
    getRequestById: builder.query<requestResponseType, string>({
      query: (id) => `/requests/${id}`
    }),
    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `/requests/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [REQUEST_API_TAGS.GET_LIST]
    }),
    updateRequest: builder.mutation<requestResponseType, RequestType>({
      query: (body) => ({
        url: `/requests/${body.id}`,
        method: 'PUT',
        body
      })
    }),
    resolveRequest: builder.mutation<requestResponseType, number>({
      query: (id) => ({
        url: `/requests/${id}`,
        method: 'POST'
      })
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
  useLazyGetAssetByIdQuery,
  useCreateRequestMutation,
  useLazyGetOwnedAssetListQuery,
  useResolveRequestMutation,
  useLazyGetRequestByIdQuery,
  useDeleteRequestMutation,
  useUpdateRequestMutation,
  useLazyGetRequestsListQuery
} = assetApi;
