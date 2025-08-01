import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getFranchiseUserRoleDetailRequest: { id: null },
  getFranchiseUserRoleDetailSuccess: { data: {} },
  getFranchiseUserRoleDetailFailure: { error: null },
  updateFranchiseUserRoleRequest: { data: {}, id: null },
  updateFranchiseUserRoleFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_FRANCHISE.USER.ROLE.DETAIL}_` });
