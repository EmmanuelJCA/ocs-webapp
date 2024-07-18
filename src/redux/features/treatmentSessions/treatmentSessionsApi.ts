import { api } from '@/redux/services/api';
import { TreatmentSessions } from '@/types';
import { SessionsRequest, PartialSessionsRequest } from '@/schemas/sessions';

// ----------------------------------------------------------------------

const ENDPOINT = '/treatment-sessions';

const TreatmentSessionsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addSession: builder.mutation<TreatmentSessions, SessionsRequest>({
      query: (session) => {
        return {
          url: ENDPOINT,
          method: 'POST',
          body: session,
        };
      },
      invalidatesTags: ['Appointments'],
    }),
    getSessions: builder.query<TreatmentSessions[], string | undefined>({
      query: (treatmentId?: string) => ({
        url: ENDPOINT,
        method: 'GET',
        params: treatmentId ? { diagnosticId: treatmentId } : {},
      }),
      providesTags: ['Appointments'],
    }),
    getSession: builder.query<TreatmentSessions, string>({
      query: (sessionId) => ({
        url: `${ENDPOINT}/${sessionId}`,
        method: 'GET',
      }),
      providesTags: ['Appointments'],
    }),
    updateSession: builder.mutation<TreatmentSessions, PartialSessionsRequest>({
      query: (session) => ({
        url: `${ENDPOINT}/${session.id}`,
        method: 'PUT',
        body: session,
      }),
      invalidatesTags: ['Appointments'],
    }),
  }),
});

export const {
  useAddSessionMutation,
  useGetSessionsQuery,
  useGetSessionQuery,
  useUpdateSessionMutation,
} = TreatmentSessionsApiSlice;
