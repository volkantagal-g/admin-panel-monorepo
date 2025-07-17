import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.EMPLOYEE.SELECT.CITY}_`;

export const {
  Types,
  Creators,
} = createActions({
  getCitiesRequest: {
    filters: {} as any,
    onSuccess: () => {},
    onError: () => {},
  } as any,
  initContainer: null,
  destroyContainer: null,
}, { prefix });
