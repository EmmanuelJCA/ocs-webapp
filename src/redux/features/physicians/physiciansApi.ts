import type { Physician } from '@/types';
import { api } from '@/redux/services/api';
import { PhysicianRequest } from '@/schemas/physician';

// ----------------------------------------------------------------------

const ENDPOINT = '/physicians';

const physiciansApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addPhysician: builder.mutation<Physician, PhysicianRequest>({
      query: (physician) => {
        const formData = new FormData();
        formData.append('firstName', physician.firstName);
        formData.append('lastName', physician.lastName);
        formData.append('email', physician.email);
        formData.append('password', physician.password);
        formData.append('identification', physician.identification);
        formData.append('genre', physician.genre);
        formData.append('roles', physician.roles.toString());
        formData.append('dateOfBirth', physician.dateOfBirth.toString());
        formData.append('phone', physician.phone);
        formData.append('oncologyCentersIds', physician.oncologyCentersIds.toString());
        formData.append('specializationsIds', physician.specializationsIds.toString());
        if (physician.avatar instanceof File) formData.append('avatar', physician.avatar);

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
    getPhysicians: builder.query<Physician[], void>({
      query: () => ({
        url: ENDPOINT,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getPhysician: builder.query<Physician, string>({
      query: (physicianId) => ({
        url: `${ENDPOINT}/${physicianId}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updatePhysician: builder.mutation<Physician, PhysicianRequest>({
      query: (physician) => {
        const formData = new FormData();
        formData.append('firstName', physician.firstName);
        formData.append('lastName', physician.lastName);
        formData.append('email', physician.email);
        if (physician.password.length > 3) formData.append('password', physician.password);
        formData.append('identification', physician.identification);
        formData.append('genre', physician.genre);
        formData.append('roles', physician.roles.toString());
        formData.append('dateOfBirth ', physician.dateOfBirth.toString());
        formData.append('phone', physician.phone);
        formData.append('oncologyCentersIds', physician.oncologyCentersIds.toString());
        formData.append('specializationsIds', physician.specializationsIds.toString());
        if (physician.isActive != undefined)
          formData.append('isActive', physician.isActive.toString());
        if (physician.avatar instanceof File) formData.append('avatar', physician.avatar);

        return {
          url: `${ENDPOINT}/${physician.id}`,
          method: 'PUT',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),
    deletePhysician: builder.mutation<PhysicianRequest, string>({
      query: (physicianId) => ({
        url: `${ENDPOINT}/${physicianId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddPhysicianMutation,
  useGetPhysiciansQuery,
  useGetPhysicianQuery,
  useUpdatePhysicianMutation,
  useDeletePhysicianMutation,
} = physiciansApiSlice;
