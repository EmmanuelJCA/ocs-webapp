import type { Patient } from '@/types';
import { api } from '@/redux/services/api';
import { PatientRequest } from '@/schemas/patient';

// ----------------------------------------------------------------------

const ENDPOINT = '/patients';

const patientsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addPatient: builder.mutation<Patient, PatientRequest>({
      query: (patient) => {
        return {
          url: ENDPOINT,
          method: 'POST',
          body: patient,
        };
      },
      invalidatesTags: ['User'],
    }),
    getPatients: builder.query<Patient[], void>({
      query: () => ({
        url: ENDPOINT,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getPatient: builder.query<Patient, string>({
      query: (patientId) => ({
        url: `${ENDPOINT}/${patientId}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updatePatient: builder.mutation<Patient, PatientRequest>({
      query: (patient) => ({
        url: `${ENDPOINT}/${patient.id}`,
        method: 'PUT',
        body: patient,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useAddPatientMutation,
  useGetPatientsQuery,
  useGetPatientQuery,
  useUpdatePatientMutation,
} = patientsApiSlice;
