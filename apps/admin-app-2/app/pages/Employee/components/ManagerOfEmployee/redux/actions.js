import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.EMPLOYEE.MANAGE_OF_EMPLOYEE}_`;

export const {
  Types,
  Creators,
} = createActions({
  getManagerOfEmployeeRequest: { employeeId: null, fields: [] },
  getManagerOfEmployeeSuccess: { data: [] },
  getManagerOfEmployeeFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
