import type { User } from '@/types';
import { api } from '@/redux/services/api';
import { UserRequest } from '@/schemas/user';

// ----------------------------------------------------------------------

const ENDPOINT = '/users';

const usersApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation<User, UserRequest>({
      query: (user) => {
        const formData = new FormData();
        formData.append('firstName', user.firstName);
        formData.append('lastName', user.lastName);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('identification', user.identification);
        formData.append('genre', user.genre);
        formData.append('roles', user.roles.toString());
        formData.append('dateOfBirth', user.dateOfBirth.toString());
        formData.append('phone', user.phone);
        formData.append('oncologyCentersIds', user.oncologyCentersIds.toString());
        if (user.avatar instanceof File) formData.append('avatar', user.avatar);

        return {
          url: ENDPOINT,
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: ENDPOINT,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getUser: builder.query<User, string>({
      query: (userId) => ({
        url: `${ENDPOINT}/${userId}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<User, UserRequest>({
      query: (user) => {
        const formData = new FormData();
        formData.append('firstName', user.firstName);
        formData.append('lastName', user.lastName);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('identification', user.identification);
        formData.append('genre', user.genre);
        formData.append('roles', user.roles.toString());
        formData.append('dateOfBirth ', user.dateOfBirth.toString());
        formData.append('phone', user.phone);
        formData.append('oncologyCentersIds', user.oncologyCentersIds.toString());
        if (user.inactivatedAt) formData.append('inactivatedAt', user.inactivatedAt?.toString());
        if (user.avatar instanceof File) formData.append('avatar', user.avatar);

        return {
          url: `${ENDPOINT}/${user.id}`,
          method: 'PUT',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<User, string>({
      query: (userId) => ({
        url: `${ENDPOINT}/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
