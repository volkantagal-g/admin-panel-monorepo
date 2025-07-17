import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.EMPLOYEE;

export const getEmployeesSelector = {
  getData: state => state[reducerKey]?.employees?.data,
  getIsPending: state => state[reducerKey]?.employees?.isPending,
};
