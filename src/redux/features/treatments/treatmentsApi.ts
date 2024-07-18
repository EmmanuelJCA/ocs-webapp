import { api } from '@/redux/services/api';
import { Treatment, Diagnostic } from '@/types';
import { TreatmentRequest } from '@/schemas/treatment';

// ----------------------------------------------------------------------

const ENDPOINT = '/treatments';

const TreatmentsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addTreatment: builder.mutation<Diagnostic, TreatmentRequest>({
      query: (treatment) => {
        return {
          url: ENDPOINT,
          method: 'POST',
          body: treatment,
        };
      },
      invalidatesTags: ['Appointments'],
    }),
    getTreatments: builder.query<Treatment[], string | undefined>({
      query: (diagnosticId?: string) => ({
        url: ENDPOINT,
        method: 'GET',
        params: diagnosticId ? { diagnosticId } : {},
      }),
      providesTags: ['Appointments'],
    }),
    getTreatment: builder.query<Treatment, string>({
      query: (treatmentId) => ({
        url: `${ENDPOINT}/${treatmentId}`,
        method: 'GET',
      }),
      providesTags: ['Appointments'],
    }),
    updateTreatment: builder.mutation<Treatment, Partial<TreatmentRequest>>({
      query: (diagnostic) => ({
        url: `${ENDPOINT}/${diagnostic.id}`,
        method: 'PUT',
        body: diagnostic,
      }),
      invalidatesTags: ['Appointments'],
    }),
  }),
});

export const {
  useAddTreatmentMutation,
  useGetTreatmentsQuery,
  useGetTreatmentQuery,
  useUpdateTreatmentMutation,
} = TreatmentsApiSlice;
