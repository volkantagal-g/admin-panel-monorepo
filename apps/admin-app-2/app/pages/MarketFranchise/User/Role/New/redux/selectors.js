import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_FRANCHISE.USER.ROLE.NEW;

export const createMarketFranchiseUserRoleSelector = {
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'marketFranchiseUserRole');
    return isPending;
  },
};
