import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getFranchiseDynamicConfigDetailRequest: { id: null },
  getFranchiseDynamicConfigDetailSuccess: { data: undefined },
  getFranchiseDynamicConfigDetailFailure: { error: null },

  getFranchiseConfigTypeDetailRequest: { id: null },
  getFranchiseConfigTypeDetailSuccess: { data: undefined },
  getFranchiseConfigTypeDetailFailure: { error: null },

  updateFranchiseDynamicConfigRequest: { values: null },
  updateFranchiseDynamicConfigSuccess: { data: undefined },
  updateFranchiseDynamicConfigFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.FRANCHISE_CONFIG.DETAIL}_` });
