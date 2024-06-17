import type { Physician } from '@/types';
import { api } from '@/redux/services/api';
import { PhysicianRequest } from '@/schemas/physician';

// ----------------------------------------------------------------------

const ENDPOINT = '/physician-supports';

const physicianSupportsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addPhysicianSupport: builder.mutation<Physician, PhysicianRequest>({
      query: (physicianSupport) => {
        const formData = new FormData();
        formData.append('firstName', physicianSupport.firstName);
        formData.append('lastName', physicianSupport.lastName);
        formData.append('email', physicianSupport.email);
        formData.append('password', physicianSupport.password);
        formData.append('identification', physicianSupport.identification);
        formData.append('genre', physicianSupport.genre);
        formData.append('roles', physicianSupport.roles.toString());
        formData.append('dateOfBirth', physicianSupport.dateOfBirth.toString());
        formData.append('phone', physicianSupport.phone);
        formData.append('oncologyCentersIds', physicianSupport.oncologyCentersIds.toString());
        formData.append('specializationsIds', physicianSupport.specializationsIds.toString());
        if (physicianSupport.avatar instanceof File)
          formData.append('avatar', physicianSupport.avatar);

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
    getPhysicianSupports: builder.query<Physician[], void>({
      query: () => ({
        url: ENDPOINT,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getPhysicianSupport: builder.query<Physician, string>({
      query: (physicianSupportId) => ({
        url: `${ENDPOINT}/${physicianSupportId}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updatePhysicianSupport: builder.mutation<Physician, PhysicianRequest>({
      query: (physicianSupport) => {
        const formData = new FormData();
        formData.append('firstName', physicianSupport.firstName);
        formData.append('lastName', physicianSupport.lastName);
        formData.append('email', physicianSupport.email);
        if (physicianSupport.password.length > 3)
          formData.append('password', physicianSupport.password);
        formData.append('identification', physicianSupport.identification);
        formData.append('genre', physicianSupport.genre);
        formData.append('roles', physicianSupport.roles.toString());
        formData.append('dateOfBirth ', physicianSupport.dateOfBirth.toString());
        formData.append('phone', physicianSupport.phone);
        formData.append('oncologyCentersIds', physicianSupport.oncologyCentersIds.toString());
        formData.append('specializationsIds', physicianSupport.specializationsIds.toString());
        if (physicianSupport.isActive != undefined)
          formData.append('isActive', physicianSupport.isActive.toString());
        if (physicianSupport.avatar instanceof File)
          formData.append('avatar', physicianSupport.avatar);

        return {
          url: `${ENDPOINT}/${physicianSupport.id}`,
          method: 'PUT',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),
    deletePhysicianSupport: builder.mutation<PhysicianRequest, string>({
      query: (physicianSupportId) => ({
        url: `${ENDPOINT}/${physicianSupportId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddPhysicianSupportMutation,
  useGetPhysicianSupportsQuery,
  useGetPhysicianSupportQuery,
  useUpdatePhysicianSupportMutation,
} = physicianSupportsApiSlice;
