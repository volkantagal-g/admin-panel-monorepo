import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DTS.GENERAL.SELECT_EMPLOYEE}_`;

export const { Types, Creators } = createActions(
  {
    getEmployeeRequest: { id: null, name: null },
    getEmployeeSuccess: { data: [] },
    getEmployeeFailure: { error: null },
    initContainer: null,
    destroyContainer: null,
  },
  { prefix },
);
