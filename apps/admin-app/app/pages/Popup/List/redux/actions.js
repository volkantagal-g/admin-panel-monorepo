import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  // Table Actions
  setTableFilters: { filters: {} },
  getResultsRequest: {},
  getResultsSuccess: { data: {} },
  getResultsFailure: { error: null },

  // Duplicate Popup
  duplicatePopup: { id: null },

  // Global Rule Set
  getGlobalRulesetRequest: { data: {} },
  getGlobalRulesetSuccess: { data: {} },
  getGlobalRulesetFailure: { error: null },

  setGlobalRulesetRequest: { data: {} },
  setGlobalRulesetSuccess: { data: {} },
  setGlobalRulesetFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.POPUP.LIST}_` });
