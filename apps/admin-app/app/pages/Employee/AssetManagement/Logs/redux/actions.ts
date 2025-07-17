import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ASSET_MANAGEMENT.LOGS}_`;

export const { Types, Creators } = createActions({
  getAssetLogComponentsRequest: { assetId: null },
  getAssetLogComponentsSuccess: { assetLogComponents: null },
  getAssetLogComponentsFailure: { error: null },

  getFilteredLogsRequest: { resetSelectedFilters: null },
  getFilteredLogsSuccess: { data: null, totalCount: 0 },
  getFilteredLogsFailure: { error: null },

  updateFilters: { filters: {}, resetSelectedFilters: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
