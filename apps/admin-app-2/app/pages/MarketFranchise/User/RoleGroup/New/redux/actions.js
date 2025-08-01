import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createMarketFranchiseUserRoleGroupRequest: {
    name: undefined,
    description: undefined,
    countries: undefined,
    hasGlobalAccess: undefined,
  },
  createMarketFranchiseUserRoleGroupSuccess: null,
  createMarketFranchiseUserRoleGroupFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_FRANCHISE.USER.ROLE_GROUP.NEW}_` });
