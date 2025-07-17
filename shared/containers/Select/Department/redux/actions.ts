import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.DEPARTMENT}_`;

export const { Types, Creators } = createActions(
  {
    getDepartmentsRequest: {
      filters: {} as any,
      onSuccess: () => {},
      onError: () => {},
    } as any,
    initContainer: null,
    destroyContainer: null,
  },
  { prefix },
);
