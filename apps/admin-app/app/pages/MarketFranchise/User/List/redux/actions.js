import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  getFranchiseUserListRequest: { limit: 10, offset: 0, active: undefined, filter: undefined },
  getFranchiseUserListSuccess: { data: [], count: 0 },
  getFranchiseUserListFailure: { error: null },
  exportFranchiseUsersRequest: null,
  exportFranchiseUsersSuccess: null,
  exportFranchiseUsersFailure: { error: null },
}, { prefix: `${REDUX_KEY.MARKET_FRANCHISE.USER.LIST}_` });
