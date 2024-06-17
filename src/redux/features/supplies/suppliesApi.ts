import type { Supplies } from '@/types';
import { api } from '@/redux/services/api';
import { SuppliesRequest } from '@/schemas/supplies';

// ----------------------------------------------------------------------

const ENDPOINT = '/supplies';

const SuppliesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addSupplies: builder.mutation<Supplies, SuppliesRequest>({
      query: (supplies) => {
        return {
          url: ENDPOINT,
          method: 'POST',
          body: supplies,
        };
      },
      invalidatesTags: ['Supplies'],
    }),
    getSupplies: builder.query<Supplies[], void>({
      query: () => ({
        url: ENDPOINT,
        method: 'GET',
      }),
      providesTags: ['Supplies'],
    }),
    getOneSupplies: builder.query<Supplies, string>({
      query: (suppliesId) => ({
        url: `${ENDPOINT}/${suppliesId}`,
        method: 'GET',
      }),
      providesTags: ['Supplies'],
    }),
    updateSupplies: builder.mutation<Supplies, SuppliesRequest>({
      query: (supplies) => ({
        url: `${ENDPOINT}/${supplies.id}`,
        method: 'PUT',
        body: supplies,
      }),
      invalidatesTags: ['Supplies'],
    }),
  }),
});

export const {
  useAddSuppliesMutation,
  useGetSuppliesQuery,
  useGetOneSuppliesQuery,
  useUpdateSuppliesMutation,
} = SuppliesApiSlice;
