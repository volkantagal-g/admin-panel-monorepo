import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.FRANCHISE_CONFIG_TYPE.LIST}_`;

export const { Types, Creators } = createActions({
  getFranchiseConfigTypeListRequest: { limit: undefined, offset: undefined },
  getFranchiseConfigTypeListSuccess: { data: null, total: 0 },
  getFranchiseConfigTypeListFailure: { error: null },
  deleteFranchiseConfigTypeRequest: { id: undefined },
  deleteFranchiseConfigTypeSuccess: { id: undefined },
  deleteFranchiseConfigTypeFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
