import baseApi from '../../services';
import EmployeeType from '../../types/EmployeeType';
import { ResponseDataListType, ResponseDataType } from '../../types/ResponseType';

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartmentList: builder.query<ResponseDataListType, void>({
      query: () => '/departments'
    }),
    getRoleList: builder.query<ResponseDataListType, void>({
      query: () => '/roles'
    }),
    createEmployee: builder.query<ResponseDataType, EmployeeType>({
      query: (body) => ({
        url: '/employees',
        method: 'POST',
        body
      })
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
  useLazyGetEmployeeQuery
} = employeesApi;
