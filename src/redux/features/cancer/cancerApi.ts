import { api } from '@/redux/services/api';
import type { CancerType, CancerStage } from '@/types';
import { CancerTypeRequest } from '@/schemas/cancerType';

// ----------------------------------------------------------------------

const ENDPOINT = '/cancer';

const cancerApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addCancerType: builder.mutation<CancerType, CancerTypeRequest>({
      query: (cancerType) => {
        return {
          url: `${ENDPOINT}/types`,
          method: 'POST',
          body: cancerType,
        };
      },
      invalidatesTags: ['CancerType'],
    }),
    getCancerTypes: builder.query<CancerType[], void>({
      query: () => ({
        url: `${ENDPOINT}/types`,
        method: 'GET',
      }),
      providesTags: ['CancerType'],
    }),
    getCancerType: builder.query<CancerType, string>({
      query: (cancerTypeId) => ({
        url: `${ENDPOINT}/types/${cancerTypeId}`,
        method: 'GET',
      }),
      providesTags: ['CancerType'],
    }),
    updateCancerType: builder.mutation<CancerType, CancerTypeRequest>({
      query: (cancerType) => ({
        url: `${ENDPOINT}/types/${cancerType.id}`,
        method: 'PUT',
        body: cancerType,
      }),
      invalidatesTags: ['CancerType'],
    }),
    getCancerStages: builder.query<CancerStage[], void>({
      query: () => ({
        url: `${ENDPOINT}/stages`,
        method: 'GET',
      }),
    }),
    getCancerStage: builder.query<CancerStage, string>({
      query: (cancerStageId) => ({
        url: `${ENDPOINT}/stages/${cancerStageId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAddCancerTypeMutation,
  useGetCancerTypeQuery,
  useGetCancerTypesQuery,
  useUpdateCancerTypeMutation,
} = cancerApiSlice;
