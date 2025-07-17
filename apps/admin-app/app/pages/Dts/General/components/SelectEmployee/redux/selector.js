import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS.GENERAL.SELECT_EMPLOYEE;

export const employeeSelector = {
  getData: state => state?.[reducerKey]?.employees?.data,
  getIsPending: state => state?.[reducerKey]?.employees?.isPending,
};
