import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.CONFIG.LIST}_`;
const DEFAULT_PAGINATION_LIMIT = 10;
const EMPTY = '';

export const { Types, Creators } = createActions({
  getConfigsRequest: { searchText: EMPTY, cursor: EMPTY, limit: DEFAULT_PAGINATION_LIMIT },
  getConfigsSuccess: { data: [], nextPageToken: '', prevPageToken: '' },
  getConfigsFailure: { error: null },
  updateConfigRequest: {
    t: null,
    successCallback: null,
    mismatchCallback: null,
    key: null,
    configType: null,
    isCustomEnabled: null,
    value: null,
    description: null,
    responsibleSquad: null,
    __v: null,
  },
  updateConfigSuccess: { key: null, updatedConfig: null },
  updateConfigFailure: { error: null },
  updateCustomConfigRequest: {
    key: null,
    configType: null,
    countryCode: null,
    value: null,
    __v: null,
  },
  updateCustomConfigSuccess: {},
  updateCustomConfigFailure: { error: null },

  deleteConfigRequest: { key: null, configType: null },
  deleteConfigSuccess: { key: null },
  deleteConfigFailure: { error: null },

  setFilters: { filterObject: { searchTerm: null } },
  initPage: null,
  destroyPage: null,
}, { prefix });
