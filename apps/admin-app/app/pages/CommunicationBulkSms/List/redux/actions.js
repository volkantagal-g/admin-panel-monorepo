import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  setTableFilters: { filters: {} },
  resetTableFilters: null,

  getResultsRequest: {},
  getResultsSuccess: { data: {} },
  getResultsFailure: { error: null },

  getConfigRequest: { clientLanguage: null },
  getConfigSuccess: { data: {} },
  getConfigFailure: { error: null },

  duplicateRequest: { id: null, clientId: null },

  getCancelRequest: { id: null, clientId: null },
  getCancelSuccess: { id: null },
  getCancelFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.COMMUNICATION_BULK_SMS.LIST}_` });
