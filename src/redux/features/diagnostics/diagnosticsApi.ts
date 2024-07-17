import { Diagnostic } from '@/types';
import { api } from '@/redux/services/api';
import { DiagnosticRequest } from '@/schemas/diagnostic';

// ----------------------------------------------------------------------

const ENDPOINT = '/diagnostic';

const DiagnosticsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addDiagnostic: builder.mutation<Diagnostic, DiagnosticRequest>({
      query: (diagnostic) => {
        return {
          url: ENDPOINT,
          method: 'POST',
          body: diagnostic,
        };
      },
      invalidatesTags: ['Appointments'],
    }),
    getDiagnostics: builder.query<Diagnostic[], string | undefined>({
      query: (patientId: string | undefined) => ({
        url: ENDPOINT,
        method: 'GET',
        params: patientId ? { patientId } : {},
      }),
      providesTags: ['Appointments'],
    }),
    getDiagnostic: builder.query<Diagnostic, string>({
      query: (DiagnosticId) => ({
        url: `${ENDPOINT}/${DiagnosticId}`,
        method: 'GET',
      }),
      providesTags: ['Appointments'],
    }),
    updateDiagnostic: builder.mutation<Diagnostic, Partial<DiagnosticRequest>>({
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
  useAddDiagnosticMutation,
  useGetDiagnosticsQuery,
  useGetDiagnosticQuery,
  useUpdateDiagnosticMutation,
} = DiagnosticsApiSlice;
