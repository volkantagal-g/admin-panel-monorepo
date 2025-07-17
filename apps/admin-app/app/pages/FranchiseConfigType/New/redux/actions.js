import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createFranchiseConfigTypeRequest: {
    name: undefined,
    description: undefined,
    fields: undefined,
  },
  createFranchiseConfigTypeSuccess: null,
  createFranchiseConfigTypeFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.FRANCHISE_CONFIG_TYPE.NEW}_` });
