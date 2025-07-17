import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  setTableFilters: { filters: {} },
  getResultsRequest: {},
  getResultsSuccess: { data: {} },
  getResultsFailure: { error: null },

  // Global Settings
  getGlobalSettingsRequest: {},
  getGlobalSettingsSuccess: { data: {} },
  getGlobalSettingsFailure: { error: null },

  updateGlobalSettingsRequest: { body: null },
  updateGlobalSettingsSuccess: { data: {} },
  updateGlobalSettingsFailure: { error: null },
  // ** //

  duplicateRequest: { id: null },
  cancelRequest: { id: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.EMAIL.LIST}_` });
