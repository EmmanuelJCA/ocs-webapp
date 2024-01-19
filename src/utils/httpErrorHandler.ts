import { enqueueSnackbar } from 'notistack';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { HttpStatusCode } from '@/types';

// ----------------------------------------------------------------------

type Messages = {
  [key in keyof typeof HttpStatusCode]?: string;
};

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error != null && 'status' in error;
};

export const httpErrorHandler = (error: unknown, messages: Messages) => {
  console.log(error);

  if (isFetchBaseQueryError(error) && typeof error.status == 'number') {
    const status = HttpStatusCode[error.status] as keyof typeof HttpStatusCode;

    enqueueSnackbar(messages[status], {
      variant: 'error',
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    });
  }
};
