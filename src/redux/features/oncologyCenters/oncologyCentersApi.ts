import { api } from '@/redux/services/api';
import { OncologyCenterRequest } from '@/schemas/oncologyCenter';
import type { OncologyCenter, OncologyCenterWithUsers } from '@/types';

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
      query: (oncologyCenterId) => ({
        url: `${ENDPOINT}/${oncologyCenterId}`,
        method: 'DELETE',
      }),
    }),
    getOncologyCentersUsers: builder.query<OncologyCenterWithUsers[], void>({
      query: () => ({
        url: `${ENDPOINT}/users`,
        method: 'GET',
      }),
      providesTags: ['OncologyCenters'],
    }),
    getOncologyCenterUsers: builder.query<OncologyCenterWithUsers, string>({
      query: (oncologyCenterId) => ({
        url: `${ENDPOINT}/${oncologyCenterId}/users`,
        method: 'GET',
      }),
      providesTags: ['OncologyCenters'],
    }),
  }),
});

export const {
  useAddOncologyCenterMutation,
  useGetOncologyCentersQuery,
  useGetOncologyCenterQuery,
  useUpdateOncologyCenterMutation,
  useDeleteOncologyCenterMutation,
  useGetOncologyCentersUsersQuery,
  useGetOncologyCenterUsersQuery,
} = oncologyCentersApiSlice;
