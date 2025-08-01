import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_FRANCHISE.USER.DETAIL;

export const franchiseUserDetailSelector = {
  getData: state => state[reducerKey]?.franchiseUserDetail.data,
  getIsPending: state => state[reducerKey]?.franchiseUserDetail.isPending,
};

export const updateFranchiseUserSelector = {
  getIsPending: state => state[reducerKey]?.updateFranchiseUser.isPending,
  getIsSuccess: state => state[reducerKey]?.updateFranchiseUser.isSuccess,
};

export const roleGroupsSelector = {
  getData: state => state[reducerKey]?.roleGroups.data,
  getIsPending: state => state[reducerKey]?.roleGroups.isPending,
};

export const updateFranchiseUserRoleGroupsSelector = {
  getIsPending: state => state[reducerKey]?.updateFranchiseUserRoleGroups.isPending,
  getIsSuccess: state => state[reducerKey]?.updateFranchiseUserRoleGroups.isSuccess,
};

export const franchisesSelector = {
  getData: state => state[reducerKey]?.franchises.data,
  getIsPending: state => state[reducerKey]?.franchises.isPending,
};

export const updateFranchiseUserFranchiseSelector = {
  getIsPending: state => state[reducerKey]?.updateFranchiseUserFranchise.isPending,
  getIsSuccess: state => state[reducerKey]?.updateFranchiseUserFranchise.isSuccess,
};

export const rolesSelector = {
  getData: state => state[reducerKey]?.roles.data,
  getIsPending: state => state[reducerKey]?.roles.isPending,
};

export const updateFranchiseUserRoleSelector = {
  getIsPending: state => state[reducerKey]?.updateFranchiseUserRole.isPending,
  getIsSuccess: state => state[reducerKey]?.updateFranchiseUserRole.isSuccess,
};

export const reportsSelector = {
  getData: state => state[reducerKey]?.reports.data,
  getIsPending: state => state[reducerKey]?.reports.isPending,
};

export const updateFranchiseUserReportsSelector = {
  getIsPending: state => state[reducerKey]?.updateFranchiseUserReports.isPending,
  getIsSuccess: state => state[reducerKey]?.updateFranchiseUserReports.isSuccess,
};
