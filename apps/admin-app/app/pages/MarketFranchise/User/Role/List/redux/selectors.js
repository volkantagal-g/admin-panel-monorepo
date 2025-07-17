import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.MARKET_FRANCHISE.USER.ROLE.LIST;

export const marketFranchiseUserRoleListSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'marketFranchiseUserRoleList');
    return data;
  },
  getTotal: state => {
    const { total } = getStateObject(state, reducerKey, 'marketFranchiseUserRoleList');
    return total;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'marketFranchiseUserRoleList');
    return isPending;
  },
};
