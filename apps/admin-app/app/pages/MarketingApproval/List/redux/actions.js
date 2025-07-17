import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  setTableFilters: { filters: {} },

  getResultsRequest: {},
  getResultsSuccess: { data: {} },
  getResultsFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKETING_APPROVAL.LIST}_` });
