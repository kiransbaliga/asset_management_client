import baseApi from '../../../services';
import RequestType from '../../../types/RequestType';
import { ResponseDataListType, ResponseDataType } from '../../../types/ResponseType';

export const RequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRequestList: builder.query<ResponseDataListType, void>({
      query: () => '/requests/'
    }),
    getCategoryList: builder.query<ResponseDataListType, void>({
      query: () => '/category/'
    }),
    getSubcategoryList: builder.query<ResponseDataListType, void>({
      query: () => '/subcategory/'
    }),
    getOwnedAssetList: builder.query<ResponseDataListType, number>({
      query: (employeeId) => `/assets/employee/${employeeId}/`
    }),
    createRequest: builder.mutation<ResponseDataType, RequestType>({
      query: (body) => ({
        url: '/requests/',
        method: 'POST',
        body
      })
    })
  })
});

export const {
  useCreateRequestMutation,
  useGetRequestListQuery,
  useGetCategoryListQuery,
  useLazyGetSubcategoryListQuery,
  useLazyGetOwnedAssetListQuery
} = RequestApi;
