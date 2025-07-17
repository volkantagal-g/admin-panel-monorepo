import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.USER.LIST;

export const getUsersSelector = {
  getData: state => state[reducerKey]?.getUsers?.data,
  getIsPending: state => state[reducerKey]?.getUsers?.isPending,
};

export const getUserRolesSelector = {
  getData: state => state[reducerKey]?.getUserRoles?.data,
  getIsPending: state => state[reducerKey]?.getUserRoles?.isPending,
};

export const getDepartmentsSelector = {
  getData: state => state[reducerKey]?.getDepartments?.data,
  getIsPending: state => state[reducerKey]?.getDepartments?.isPending,
};

export const getSortOptionsSelector = state => state[reducerKey]?.sortOptions;

export const getUsersForExcelTableSelector = { getIsPending: state => state[reducerKey]?.getUsersForExcelTable?.isPending };
