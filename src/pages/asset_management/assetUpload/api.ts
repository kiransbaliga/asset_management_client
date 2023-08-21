import baseApi from '../../../services';
import { ResponseDataType } from '../../../types/ResponseType';

export const assetUploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useUploadFileMutation } = assetUploadApi;
