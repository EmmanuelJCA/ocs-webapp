import { enqueueSnackbar } from 'notistack';
import {
  FetchArgs,
  createApi,
  BaseQueryFn,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { getLocalStorageItem, removeLocalStorageItem } from '@/utils';

// ----------------------------------------------------------------------

const token = getLocalStorageItem<string>('token');

const showSnackbar = (message: string, onClose?: () => void) => {
  enqueueSnackbar(message, {
    variant: 'error',
    autoHideDuration: 2000,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    onClose,
  });
};

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers) => {
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithErrorHandler: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    switch (result.error.status) {
      case 401:
        if (!token) break;
        showSnackbar('Por favor ingrese nuevamente para continuar', () => {
          removeLocalStorageItem('token');
          api.dispatch({ type: 'auth/logOut' });
        });
        break;
      case 500:
        showSnackbar('Ha ocurrido un error inesperado, por favor intente nuevamente');
        break;
      default:
        break;
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithErrorHandler,
  endpoints: () => ({}),
});
