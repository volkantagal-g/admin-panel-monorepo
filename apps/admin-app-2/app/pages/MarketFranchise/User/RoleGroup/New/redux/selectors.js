/* eslint-disable object-curly-newline */
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_FRANCHISE.USER.ROLE_GROUP.NEW;

export const createMarketFranchiseUserRoleGroupSelector = {
  getIsPending: state => state[reducerKey]?.marketFranchiseUserRoleGroup.isPending,
};
