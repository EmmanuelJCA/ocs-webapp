import { api } from '@/redux/services';
import { TreatmentType } from '@/types';

// ----------------------------------------------------------------------

const ENDPOINT = '/treatment-types';

const treatmentTypesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTreatmentTypes: builder.query<TreatmentType[], void>({
      query: () => ({
        url: ENDPOINT,
        method: 'GET',
      }),
    }),
    getTreatmentType: builder.query<TreatmentType, string>({
      query: (treatmentTypeId) => ({
        url: `${ENDPOINT}/${treatmentTypeId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetTreatmentTypeQuery, useGetTreatmentTypesQuery } = treatmentTypesApiSlice;
