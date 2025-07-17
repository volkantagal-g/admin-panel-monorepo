import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ASSET_MANAGEMENT_MODULES.ASSIGNED_GETIRIANS}_`;

export const { Types, Creators } = createActions({
  getAssigneesRequest: { asset: null },
  getAssigneesSuccess: { data: null },
  getAssigneesFailure: { error: null },

  updateAssetHistoryRequest: {
    assetId: null,
    historyId: null,
    updateData: null,
    onSuccess: null,
  },
  updateAssetHistorySuccess: { data: null },
  updateAssetHistoryFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
