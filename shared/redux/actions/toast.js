import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    pending: { message: null, toastOptions: null },
    success: { message: null, toastOptions: null },
    error: { error: null, message: null, toastOptions: null },
    dismiss: { toastId: null },
  },
  { prefix: REDUX_KEY.TOAST },
);
