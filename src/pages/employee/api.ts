import baseApi from '../../services';
import { ResponseDataType } from '../../types/ResponseType';

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployee: builder.query<ResponseDataType, string>({
      query: (id) => `/employees/${id}`
    })
  })
});

export const { useLazyGetEmployeeQuery } = employeeApi;
