import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({

  assetDetailRequest: { assetId: undefined },
  assetDetailSuccess: { data: {} },
  assetDetailFailure: { error: null },

  updateAssetRequest: { body: null, assetId: undefined },
  updateAssetSuccess: { data: {} },
  updateAssetFailure: { error: null },

  assetHistoryRequest: { filters: {} },
  assetHistorySuccess: { data: {}, nextPageCursor: undefined, previousPageCursor: undefined },
  assetHistoryFailure: { error: null },

  getAssetRepairHistoryRequest: { assetId: undefined },
  getAssetRepairHistorySuccess: { data: {} },
  getAssetRepairHistoryFailure: { error: null },

  createAssetRepairHistoryRequest: { body: null },
  createAssetRepairHistorySuccess: { data: {} },
  createAssetRepairHistoryFailure: { error: null },

  updateAssetRepairHistoryRequest: { body: null },
  updateAssetRepairHistorySuccess: { data: {} },
  updateAssetRepairHistoryFailure: { error: null },

  getAssetChangeEventInfoRequest: { assetId: null, langKey: null },
  getAssetChangeEventInfoSuccess: { data: {} },
  getAssetChangeEventInfoFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.ASSET.DETAIL}_` });
