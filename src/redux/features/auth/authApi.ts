import { api } from '@/redux/services/api';
import type { User, SignIn, AuthenticatedUser } from '@/types';

import { setUser } from './';

// ----------------------------------------------------------------------

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthenticatedUser, SignIn>({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    me: builder.query<User, null | void>({
      query: () => '/auth/me',
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useSignInMutation, useMeQuery } = authApiSlice;
