import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.EMPLOYEE.SELECT.COMPANY}_`;

export const {
  Types,
  Creators,
} = createActions({
  getCompaniesRequest: {
    filters: {} as any,
    onSuccess: () => {},
    onError: () => {},
  } as any,
  initContainer: null,
  destroyContainer: null,
}, { prefix });
