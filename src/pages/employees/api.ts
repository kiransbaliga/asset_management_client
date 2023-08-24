import baseApi from '../../services';
import EmployeeType from '../../types/EmployeeType';
import { ResponseDataListType, ResponseDataType } from '../../types/ResponseType';
import { EMPLOYEE_API_TAGS } from './consts';

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeList: builder.query<ResponseDataListType, { offset: number; take: number }>({
      query: ({ offset: offset, take: take }) => `/employees?offset=${offset}&length=${take}`,
      providesTags: [EMPLOYEE_API_TAGS.ON_EMPLOYEE_DELETE]
    }),
    getDepartmentList: builder.query<ResponseDataListType, void>({
      query: () => '/department'
    }),
    getRoleList: builder.query<ResponseDataType, void>({
      query: () => '/roles'
    }),
    createEmployee: builder.query<ResponseDataType, EmployeeType>({
      query: (body) => ({
        url: '/employees',
        method: 'POST',
        body
      })
    }),
    updateEmployee: builder.mutation<ResponseDataType, EmployeeType>({
      query: (body) => ({
        url: `/employees/${body.id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [EMPLOYEE_API_TAGS.ON_EMPLOYEE_DELETE]
    }),
    deleteEmployee: builder.mutation<ResponseDataType, number>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [EMPLOYEE_API_TAGS.ON_EMPLOYEE_DELETE]
    }),
    getEmployee: builder.query<ResponseDataType, string>({
      query: (id) => `/employees/${id}`
    })
  })
});

export const {
  useGetDepartmentListQuery,
  useGetRoleListQuery,
  useLazyCreateEmployeeQuery,
  useUpdateEmployeeMutation,
  useLazyGetEmployeeQuery,
  useGetEmployeeListQuery,
  useDeleteEmployeeMutation
} = employeesApi;
