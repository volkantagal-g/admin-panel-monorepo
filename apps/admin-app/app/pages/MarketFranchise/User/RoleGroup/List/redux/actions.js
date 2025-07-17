import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.MARKET_FRANCHISE.USER.ROLE_GROUP.LIST}_`;

export const { Types, Creators } = createActions(
  {
    getMarketFranchiseUserRoleGroupListRequest: {
      filters: undefined,
      limit: undefined,
      offset: undefined,
    },
    getMarketFranchiseUserRoleGroupListSuccess: { data: null, total: 0 },
    getMarketFranchiseUserRoleGroupListFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
