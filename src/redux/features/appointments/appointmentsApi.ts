import type { Appointment } from '@/types';
import { api } from '@/redux/services/api';
import { AppointmentRequest, PartialAppointmentRequest } from '@/schemas/appointment';

// ----------------------------------------------------------------------

const ENDPOINT = '/appointments';

const appointmentsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addAppointment: builder.mutation<Appointment, AppointmentRequest>({
      query: (appointment) => {
        return {
          url: ENDPOINT,
          method: 'POST',
          body: appointment,
        };
      },
      invalidatesTags: ['Appointments'],
    }),
    getAppointments: builder.query<Appointment[], void>({
      query: () => ({
        url: ENDPOINT,
        method: 'GET',
      }),
      providesTags: ['Appointments'],
    }),
    getAppointment: builder.query<Appointment, string>({
      query: (appointmentId) => ({
        url: `${ENDPOINT}/${appointmentId}`,
        method: 'GET',
      }),
      providesTags: ['Appointments'],
    }),
    updateAppointment: builder.mutation<Appointment, PartialAppointmentRequest>({
      query: (appointment) => ({
        url: `${ENDPOINT}/${appointment.id}`,
        method: 'PUT',
        body: appointment,
      }),
      invalidatesTags: ['Appointments'],
    }),
  }),
});

export const {
  useAddAppointmentMutation,
  useGetAppointmentsQuery,
  useGetAppointmentQuery,
  useUpdateAppointmentMutation,
} = appointmentsApiSlice;
