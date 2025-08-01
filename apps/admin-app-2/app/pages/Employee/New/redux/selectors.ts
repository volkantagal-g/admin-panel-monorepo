import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reduxKey = REDUX_KEY.EMPLOYEE.NEW;

export const createEmployeeSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.createEmployee.isPending,
  getError: (state: {[reduxKey: string]: State}) => state[reduxKey]?.createEmployee.error,
};
