import { api } from '@/redux/services/api';
import type { Specialization } from '@/types';

// ----------------------------------------------------------------------

const ENDPOINT = '/physician-specializations';

const physicianSpecializationsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getSpecializations: builder.query<Specialization[], void>({
      query: () => ({
        url: ENDPOINT,
        method: 'GET',
      }),
    }),
    getSpecialization: builder.query<Specialization, string>({
      query: (specializationId) => ({
        url: `${ENDPOINT}/${specializationId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetSpecializationQuery, useGetSpecializationsQuery } =
  physicianSpecializationsApiSlice;
