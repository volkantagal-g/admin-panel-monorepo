import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ASSET_MANAGEMENT.LIST}_`;

export const { Types, Creators } = createActions({
  getAssetFilterComponentsRequest: { assetId: null },
  getAssetFilterComponentsSuccess: { assetFilterComponents: null },
  getAssetFilterComponentsFailure: { error: null },

  getFilteredAssetsRequest: null,
  getFilteredAssetsSuccess: { data: null, totalCount: 0 },
  getFilteredAssetsFailure: { error: null },

  filterAndExportAsExcelRequest: null,

  updateFilters: { filters: {}, resetSelectedFilters: null },

  getControlNeededVehiclesRequest: null,
  getControlNeededVehiclesSuccess: { data: null, totalCount: 0 },
  getControlNeededVehiclesFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
