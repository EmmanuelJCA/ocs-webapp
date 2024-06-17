import { Role, Person } from '@/types';
import { api } from '@/redux/services';

// ----------------------------------------------------------------------

interface PersonData extends Person {
  email?: string;
  avatar?: string;
  roles: Role[];
  oncologyCentersIds: string[];
}

const ENDPOINT = '/persons';

const personsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPerson: builder.query<PersonData, string>({
      query: (identification) => ({
        url: ENDPOINT,
        method: 'GET',
        params: { identification },
      }),
    }),
  }),
});

export const { useLazyGetPersonQuery } = personsApiSlice;
