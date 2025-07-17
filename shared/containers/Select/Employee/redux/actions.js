import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.EMPLOYEE}_`;

export const {
  Types,
  Creators,
} = createActions({
  getEmployeesRequest: { filters: {} },
  getEmployeesSuccess: { data: [] },
  getEmployeesFailure: { error: null },
  clearEmployees: null,
  initContainer: null,
  destroyContainer: null,
}, { prefix });
