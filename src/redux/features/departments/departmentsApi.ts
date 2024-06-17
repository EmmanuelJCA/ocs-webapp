import { Department } from '@/types';
import { api } from '@/redux/services';

// ----------------------------------------------------------------------

const ENDPOINT = '/departments';

const departmentsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<Department[], void>({
      query: () => ({
        url: ENDPOINT,
        method: 'GET',
      }),
    }),
    getDepartment: builder.query<Department, string>({
      query: (departmentId) => ({
        url: `${ENDPOINT}/${departmentId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetDepartmentsQuery, useGetDepartmentQuery } = departmentsApiSlice;
