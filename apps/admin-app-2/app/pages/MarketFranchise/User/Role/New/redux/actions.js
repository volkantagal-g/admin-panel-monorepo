import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createMarketFranchiseUserRoleRequest: {
    name: undefined,
    descriptions: undefined,
    permissions: [],
  },
  createMarketFranchiseUserRoleSuccess: null,
  createMarketFranchiseUserRoleFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_FRANCHISE.USER.ROLE.NEW}_` });
