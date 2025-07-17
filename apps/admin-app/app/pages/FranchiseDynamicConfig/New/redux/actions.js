import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createFranchiseDynamicConfigRequest: { configType: null, values: null },
  createFranchiseDynamicConfigSuccess: null,
  createFranchiseDynamicConfigFailure: { error: null },
  getFranchiseDynamicConfigTypeListRequest: {},
  getFranchiseDynamicConfigTypeListSuccess: { data: null },
  getFranchiseDynamicConfigTypeListFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.FRANCHISE_CONFIG.NEW}_` });
