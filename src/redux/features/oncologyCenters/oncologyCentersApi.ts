import { api } from '@/redux/services/api';
import type { OncologyCenter } from '@/types';
import { OncologyCenterRequest } from '@/schemas/oncologyCenter';

// ----------------------------------------------------------------------

const ENDPOINT = '/oncology-centers';

const oncologyCentersApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addOncologyCenter: builder.mutation<OncologyCenter, OncologyCenterRequest>({
      query: (oncologyCenter) => {
        return {
          url: ENDPOINT,
          method: 'POST',
          body: oncologyCenter,
        };
      },
      invalidatesTags: ['OncologyCenters'],
    }),
    getOncologyCenters: builder.query<OncologyCenter[], void>({
      query: () => ({
        url: ENDPOINT,
        method: 'GET',
      }),
      providesTags: ['OncologyCenters'],
    }),
    getOncologyCenter: builder.query<OncologyCenter, string>({
      query: (oncologyCenterId) => ({
        url: `${ENDPOINT}/${oncologyCenterId}`,
        method: 'GET',
      }),
      providesTags: ['OncologyCenters'],
    }),
    updateOncologyCenter: builder.mutation<OncologyCenter, OncologyCenterRequest>({
      query: (oncologyCenter) => ({
        url: `${ENDPOINT}/${oncologyCenter.id}`,
        method: 'PUT',
        body: oncologyCenter,
      }),
      invalidatesTags: ['OncologyCenters'],
    }),
    deleteOncologyCenter: builder.mutation<OncologyCenter, string>({
      query: (OncologyCenterId) => ({
        url: `${ENDPOINT}/${OncologyCenterId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddOncologyCenterMutation,
  useGetOncologyCentersQuery,
  useGetOncologyCenterQuery,
  useUpdateOncologyCenterMutation,
  useDeleteOncologyCenterMutation,
} = oncologyCentersApiSlice;
