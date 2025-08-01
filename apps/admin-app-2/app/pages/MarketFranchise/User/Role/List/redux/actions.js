import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.MARKET_FRANCHISE.USER.ROLE.LIST}_`;

export const { Types, Creators } = createActions(
  {
    getMarketFranchiseUserRoleListRequest: {
      filters: undefined,
      limit: undefined,
      offset: undefined,
    },
    getMarketFranchiseUserRoleListSuccess: { data: null, total: 0 },
    getMarketFranchiseUserRoleListFailure: { error: null },
    initPage: null,
    destroyPage: null,
  }, { prefix });
