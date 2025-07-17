import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  setTableFilters: { filters: {} },

  getResultsRequest: {},
  getResultsSuccess: { data: {} },
  getResultsFailure: { error: null },

  getConfigRequest: { clientLanguage: null },
  getConfigSuccess: { data: {} },
  getConfigFailure: { error: null },

  getExportSmsListRequest: { filters: null },
  getExportSmsListSuccess: { data: {} },
  getExportSmsListFailure: { error: null },

  duplicateRequest: { id: null, clientLanguage: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.TRANSACTIONAL_SMS.LIST}_` });
