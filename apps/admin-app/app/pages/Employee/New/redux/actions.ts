import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.EMPLOYEE.NEW}_`;

export const { Types, Creators } = createActions({
  createEmployeeRequest: { employee: null, onSuccess: null },
  createEmployeeSuccess: { data: null },
  createEmployeeFailure: { error: null },
  checkEmailUsedStatusRequest: {
    email: undefined,
    onSuccess: undefined,
    onError: undefined,
  } as any,
  checkUniqueIdentifierUsedStatusRequest: {
    uniqueIdentifier: undefined,
    onSuccess: undefined,
    onError: undefined,
  } as any,
  initPage: null,
  destroyPage: null,
}, { prefix });
