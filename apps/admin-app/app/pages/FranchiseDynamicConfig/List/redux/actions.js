import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.FRANCHISE_DYNAMIC_CONFIG.LIST}_`;

export const { Types, Creators } = createActions({
  getFranchiseDynamicConfigListRequest: { filters: undefined, configType: undefined },
  getFranchiseDynamicConfigListSuccess: { data: null, total: 0 },
  getFranchiseDynamicConfigListFailure: { error: null },
  getFranchiseDynamicConfigTypeListRequest: {},
  getFranchiseDynamicConfigTypeListSuccess: { data: null },
  getFranchiseDynamicConfigTypeListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
