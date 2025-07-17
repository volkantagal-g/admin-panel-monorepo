import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ASSET_MANAGEMENT.NEW}_`;

export const { Types, Creators } = createActions({
  getAssetTypeByIdRequest: { assetId: null },
  getAssetTypeByIdSuccess: { assetType: null },
  getAssetTypeByIdFailure: { error: null },

  createAssetRequest: { asset: null, onSuccess: null },
  createAssetSuccess: { },
  createAssetFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
