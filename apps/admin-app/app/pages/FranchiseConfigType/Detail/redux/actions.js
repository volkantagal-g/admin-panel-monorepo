import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getFranchiseConfigTypeDetailRequest: { id: null },
  getFranchiseConfigTypeDetailSuccess: { data: {}, initialData: {} },
  getFranchiseConfigTypeDetailFailure: { error: null },

  updateFranchiseConfigTypeDetailRequest: {
    id: undefined,
    name: undefined,
    description: undefined,
    fields: undefined,
    keys: undefined,
  },
  updateFranchiseConfigTypeDetailSuccess: { data: {} },
  updateFranchiseConfigTypeDetailFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.FRANCHISE_CONFIG_TYPE.DETAIL}_` });
