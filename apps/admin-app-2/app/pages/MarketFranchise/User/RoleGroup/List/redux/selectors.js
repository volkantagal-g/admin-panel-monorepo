import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_FRANCHISE.USER.ROLE_GROUP.LIST;

export const marketFranchiseUserRoleGroupListSelector = {
  getData: state => state[reducerKey]?.marketFranchiseUserRoleGroupList.data,
  getTotal: state => state[reducerKey]?.marketFranchiseUserRoleGroupList.total,
  getIsPending: state => state[reducerKey]?.marketFranchiseUserRoleGroupList.isPending,
};
