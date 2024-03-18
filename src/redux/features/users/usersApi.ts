import type { User } from '@/types';
import { api } from '@/redux/services/api';

// ----------------------------------------------------------------------

const usersApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
