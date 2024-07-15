import { Reason } from '@/types';
import { api } from '@/redux/services';

// ----------------------------------------------------------------------

const ENDPOINT = '/appointment-reasons';

const appointmentReasonsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getReasons: builder.query<Reason[], void>({
      query: () => ({
        url: ENDPOINT,
        method: 'GET',
      }),
    }),
    getReason: builder.query<Reason, string>({
      query: (reasonId) => ({
        url: `${ENDPOINT}/${reasonId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetReasonsQuery, useGetReasonQuery } = appointmentReasonsApiSlice;
