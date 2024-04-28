import type { User } from '@/types';
import { api } from '@/redux/services/api';

// ----------------------------------------------------------------------

const ENDPOINT = '/users';

const usersApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: ENDPOINT,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
