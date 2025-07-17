import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.EMPLOYEE.MANAGER_OF_EMPLOYEE;

export const getManagerOfEmployeeSelector = {
  getData: state => state?.[reducerKey]?.managerOfEmployee?.data,
  getIsPending: state => state?.[reducerKey]?.managerOfEmployee?.isPending,
};
