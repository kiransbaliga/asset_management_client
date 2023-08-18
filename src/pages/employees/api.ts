import baseApi from '../../services';
import { ResponseDataListType } from '../../types/ResponseType';

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeList: builder.query<ResponseDataListType, void>({
      query: () => '/employees'
    })
    // removeEmployee: builder.mutation<ResponseType, string>({
    //   query: (id) => {
    //     url: `/employees/${id}`,
    //     method: 'DELETE'
    //   }
    // })
  })
});

export const { useGetEmployeeListQuery } = employeesApi;
